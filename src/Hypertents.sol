// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {CrossChainOrder, ResolvedCrossChainOrder, ISettlementContract, Input, Output} from "@across-protocol/contracts/erc7683/ERC7683.sol";
import {BaseIsmpModule, IncomingPostRequest, IncomingGetResponse} from "@polytope-labs/ismp-solidity/IIsmpModule.sol";
import {IDispatcher, DispatchPost, DispatchGet} from "@polytope-labs/ismp-solidity/IDispatcher.sol";
import {IIsmpHost} from "@polytope-labs/ismp-solidity/IIsmpHost.sol";
import {StateMachine} from "@polytope-labs/ismp-solidity/StateMachine.sol";
import {SafeERC20} from "openzeppelin/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "openzeppelin/token/ERC20/IERC20.sol";
import {ECDSA} from "openzeppelin/utils/cryptography/ECDSA.sol";
import "openzeppelin/utils/Strings.sol";


interface ITokenFaucet {
    // drips the feeToken once per day
    function drip(address) external;
}

contract Hypertents is ISettlementContract, BaseIsmpModule {
    using SafeERC20 for IERC20;

    /// Hash of order fulfilled to filler address
    mapping(bytes32 => address) public _filled;

    /// Hash of the requested key to the order
    mapping(bytes32 => CrossChainOrder) public _refunds;

    /// Hash of pending order to filler address
    mapping(bytes32 => address) public _pending;

    /// The requested height is insufficient for confirming order expiry
    error HeightTooLow();

    error OrderNotFound();

    constructor(address faucet) {
        address host = hostAddr();
        address feeToken = IIsmpHost(host).feeToken();
        // drip some tokens
        ITokenFaucet(faucet).drip(feeToken);
        // approve the host to spend infinitely
        IERC20(feeToken).safeIncreaseAllowance(host, type(uint256).max);
    }

    /// @notice Initiates the settlement of a cross-chain order
    /// @dev To be called by the filler
    /// @param order The CrossChainOrder definition
    /// @param signature The swapper's signature over the order
    /// @param fillerData Any filler-defined data required by the settler
    function initiate(
        CrossChainOrder memory order,
        bytes memory signature,
        bytes memory fillerData
    ) external {
        ResolvedCrossChainOrder memory crossChainOrder = resolve(
            order,
            fillerData
        );

        // verify signature
        bytes32 orderHash = keccak256(abi.encode(order));
        (address recoveredAddress, ECDSA.RecoverError err) = ECDSA.tryRecover(orderHash, signature);
        assert(recoveredAddress == order.swapper);

        // collect funds to address(this)
        for (uint256 i = 0; i < crossChainOrder.swapperInputs.length; i++) {
            IERC20(crossChainOrder.swapperInputs[i].token).safeTransferFrom(
                order.swapper,
                address(this),
                crossChainOrder.swapperInputs[i].amount
            );
        }
    }

    /// @notice Resolves a specific CrossChainOrder into a generic ResolvedCrossChainOrder
    /// @dev Intended to improve standardized integration of various order types and settlement contracts
    /// @param order The CrossChainOrder definition
    /// @param fillerData Any filler-defined data required by the settler
    /// returns ResolvedCrossChainOrder hydrated order data including the inputs and outputs of the order
    function resolve(
        CrossChainOrder memory order,
        bytes memory fillerData
    ) public pure returns (ResolvedCrossChainOrder memory) {
        // Decode the orderData to retrieve the input, output, and filler output information.
        (
            Input[] memory swapperInputs,
            Output[] memory swapperOutputs,
            Output[] memory fillerOutputs
        ) = abi.decode(order.orderData, (Input[], Output[], Output[]));

        // Construct the ResolvedCrossChainOrder struct using the provided order and decoded data.
        ResolvedCrossChainOrder memory resolvedOrder = ResolvedCrossChainOrder({
            settlementContract: order.settlementContract,
            swapper: order.swapper,
            nonce: order.nonce,
            originChainId: order.originChainId,
            initiateDeadline: order.initiateDeadline,
            fillDeadline: order.fillDeadline,
            swapperInputs: swapperInputs,
            swapperOutputs: swapperOutputs,
            fillerOutputs: fillerOutputs
        });

        return resolvedOrder;
    }

    /// Fill the order on the destination chain
    function fill(
        CrossChainOrder memory order,
        bytes memory fillerData
    ) external {
        ResolvedCrossChainOrder memory resolvedOrder = resolve(
            order,
            fillerData
        );

        // commit order receipt to state
        bytes32 orderHash = keccak256(abi.encode(order));
        _filled[orderHash] = msg.sender;

        // dispatch cross-chain message
        IDispatcher(hostAddr()).dispatch(
            DispatchPost({
                dest: StateMachine.evm(order.originChainId),
                to: abi.encode(address(this)),
                body: abi.encode(resolvedOrder.swapperOutputs),
                timeout: 0,
                fee: 0,
                payer: msg.sender
            })
        );

        // fill order
        for (uint256 i = 0; i < resolvedOrder.swapperOutputs.length; i++) {
            Output memory output = resolvedOrder.swapperOutputs[i];
            if (block.chainid != output.chainId) continue;
            IERC20(output.token).safeTransferFrom(
                msg.sender,
                output.recipient,
                output.amount
            );
        }
    }

    /// Request for a refund for an expired order on the source chain
    function refund(
        CrossChainOrder memory order,
        uint64 expiredHeight
    ) external {
        // check order was committed
        if (uint64(order.fillDeadline) >= expiredHeight) revert HeightTooLow();

        ResolvedCrossChainOrder memory resolvedOrder = resolve(
            order,
            bytes("")
        );

        bytes[] memory keys = new bytes[](1);
        // todo: add storage slot hash for _filled[orderHash]
        keys[0] = bytes.concat(abi.encodePacked(address(this)), bytes(""));

        // commit request to order
        _refunds[keccak256(keys[0])] = order;

        // dispatch state read for order hash on destination
        IDispatcher(hostAddr()).dispatch(
            DispatchGet({
                dest: StateMachine.evm(resolvedOrder.swapperOutputs[0].chainId),
                height: expiredHeight,
                keys: keys,
                timeout: 0,
                fee: 0
            })
        );
    }

    /// Process an incoming request to redeem the filler's funds
    function onAccept(
        IncomingPostRequest calldata incoming
    ) external override onlyHost {
        // todo: authenticate this call
        Output[] memory outputs = abi.decode(incoming.request.body, (Output[]));

        // transfer custodied assets to filler
        for (uint256 i = 0; i < outputs.length; i++) {
            Output memory output = outputs[i];
            if (block.chainid != output.chainId) continue;

            IERC20(output.token).safeTransfer(output.recipient, output.amount);
        }
    }

    /// Process the response to a state query for refunds
    function onGetResponse(
        IncomingGetResponse memory incoming
    ) external override onlyHost {
        bytes32 request = keccak256(incoming.response.request.keys[0]);
        CrossChainOrder memory order = _refunds[request];

        // is order not empty? refund the order.
        if (order.swapper == address(0)) revert OrderNotFound();

        ResolvedCrossChainOrder memory resolvedOrder = resolve(
            order,
            bytes("")
        );

        // delete the order
        delete _refunds[request];

        // transfer custodied assets to swapper
        for (uint256 i = 0; i < resolvedOrder.swapperInputs.length; i++) {
            Input memory input = resolvedOrder.swapperInputs[i];
            IERC20(input.token).safeTransfer(order.swapper, input.amount);
        }
    }
}
