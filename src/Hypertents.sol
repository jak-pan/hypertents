// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {CrossChainOrder, ResolvedCrossChainOrder, ISettlementContract} from "@across-protocol/contracts/erc7683/ERC7683.sol";
import {BaseIsmpModule, IncomingPostRequest, IncomingGetResponse} from "@polytope-labs/ismp-solidity/IIsmpModule.sol";
import {IDispatcher, DispatchPost, DispatchGet} from "@polytope-labs/ismp-solidity/IDispatcher.sol";
import {IIsmpHost} from "@polytope-labs/ismp-solidity/IIsmpHost.sol";
import {StateMachine} from "@polytope-labs/ismp-solidity/StateMachine.sol";
import {SafeERC20} from "openzeppelin/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "openzeppelin/token/ERC20/IERC20.sol";

struct Redeem {
    address filler;
    address token;
    uint256 amount;
}

interface ITokenFaucet {
    // drips the feeToken once per day
    function drip(address) external;
}

contract Hypertents is ISettlementContract, BaseIsmpModule {
    using SafeERC20 for IERC20;

    /// Hash of the requested key to the order
    mapping(bytes32 => CrossChainOrder) public _refunds;

    /// Hash of order fulfilled to filler address
    mapping(bytes32 => address) public _filled;

    /// Hash of pending order to filler address
    mapping(bytes32 => address) public _pending;

    /// The requested height is insufficient for confirming order expiry
    error HeightTooLow();

    constructor(address faucet) {
        address host = hostAddr();
        address feeToken = IIsmpHost(host).feeToken();
        // drip us some tokens
        ITokenFaucet(faucet).drip(feeToken);
        // approve the host to spend infinitely
        IERC20(feeToken).safeIncreaseAllowance(
            host,
            type(uint256).max
        );
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
        // verify signature and collect funds to address(this)
    }

    /// @notice Resolves a specific CrossChainOrder into a generic ResolvedCrossChainOrder
    /// @dev Intended to improve standardized integration of various order types and settlement contracts
    /// @param order The CrossChainOrder definition
    /// @param fillerData Any filler-defined data required by the settler
    /// returns ResolvedCrossChainOrder hydrated order data including the inputs and outputs of the order
    function resolve(
        CrossChainOrder memory order,
        bytes memory fillerData
    ) external view returns (ResolvedCrossChainOrder memory) {
        // return the ResolvedCrossChainOrder
    }

    /// Fill the order on the destination chain
    function fill(CrossChainOrder memory order) external {
        // fill order

        // add order receipt
        bytes32 orderHash = bytes32(0);
        _filled[orderHash] = msg.sender;

        // dispatch cross-chain message
        Redeem memory redeem = Redeem({
            filler: msg.sender,
            token: address(0),
            amount: uint256(0)
        });
        IDispatcher(hostAddr()).dispatch(
            DispatchPost({
                dest: StateMachine.evm(0), // destination chain id
                to: abi.encode(address(this)),
                body: abi.encode(redeem),
                timeout: 0,
                fee: 0,
                payer: msg.sender
            })
        );
    }

    /// Request for a refund for an expired order on the source chain
    function refund(
        CrossChainOrder memory order,
        uint64 expiredHeight
    ) external {
        // check order was committed
        if (uint64(order.fillDeadline) >= expiredHeight) revert HeightTooLow();

        // dispatch state read for order hash on destination

        bytes[] memory keys = new bytes[](1);
        // todo: add storage slot hash for _filled[orderHash]
        keys[0] = bytes.concat(abi.encodePacked(address(this)), bytes(""));
        // commit requestKey to orderHash in _refunds
        _refunds[keccak256(keys[0])] = order;

        IDispatcher(hostAddr()).dispatch(
            DispatchGet({
                dest: StateMachine.evm(0), // order destination chain id
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
        Redeem memory redeem = abi.decode(incoming.request.body, (Redeem));
        // transfer token amount to relayer
        IERC20(redeem.token).safeTransfer(redeem.filler, redeem.amount);
    }

    /// Process the response to a state query for refunds
    function onGetResponse(
        IncomingGetResponse memory incoming
    ) external override onlyHost {
        bytes32 request = keccak256(incoming.response.request.keys[0]);
        CrossChainOrder memory order = _refunds[request];
        // is order not empty? refund the order.
        // delete the order
        delete _refunds[request];
    }
}
