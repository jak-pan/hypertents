// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "src/Hypertents.sol";
import {IERC20} from "openzeppelin/token/ERC20/IERC20.sol";
import {IIsmpHost} from "@polytope-labs/ismp-solidity/IIsmpHost.sol";
import {PostRequest} from "@polytope-labs/ismp-solidity/Message.sol";
import {BaseIsmpModule, IncomingPostRequest} from "@polytope-labs/ismp-solidity/IIsmpModule.sol";

address constant FAUCET = address(0x17d8cc0859fbA942A7af243c3EBB69AbBfe0a320);

uint32 constant CHAIN_ID_SEPOLIA = 11155111;
uint32 constant CHAIN_ID_BSC = 97;

address constant BOB = address(0x04);

uint256 constant FAUCET_DRIP = 1000000000000000000000;

contract BaseTest is Test, BaseIsmpModule {
    function testInstantiateSameChain() public {
        (address alice, uint256 aliceKey) = makeAddrAndKey("alice");

        // just any from https://github.com/polytope-labs/ismp-solidity/blob/e67af4a359b3a53fa8132f7223c89ba680a24439/interfaces/IIsmpModule.sol#L84-L112
        uint256 forkIdSepolia = vm.createFork("wss://ethereum-sepolia-rpc.publicnode.com");
        vm.selectFork(forkIdSepolia);

        // instantiate Hypertents with default faucet address
        Hypertents tentSepolia = new Hypertents(FAUCET);

        // just operate using feeToken for now
        address host = hostAddr();
        address token = IIsmpHost(host).feeToken();

        ITokenFaucet(FAUCET).drip(token);
        vm.startPrank(alice);
        ITokenFaucet(FAUCET).drip(token);
        IERC20(token).approve(address(tentSepolia), 10);
        vm.stopPrank();
        vm.startPrank(BOB);
        ITokenFaucet(FAUCET).drip(token);
        IERC20(token).approve(address(tentSepolia), 10000+10000);
        vm.stopPrank();

        // assert that alice has some tokens
        assertEq(IERC20(token).balanceOf(address(this)), FAUCET_DRIP);
        assertEq(IERC20(token).balanceOf(alice), FAUCET_DRIP);
        assertEq(IERC20(token).balanceOf(BOB), FAUCET_DRIP);


        Input[] memory swapperInputs = new Input[](1);
        swapperInputs[0] = Input({
            token: token,
            amount: 10
        });

        Output[] memory swapperOutputs = new Output[](1);
        swapperOutputs[0] = Output({
            token: token,
            amount: 10000,
            recipient: alice,
            chainId: CHAIN_ID_SEPOLIA
        });

        Output[] memory fillerOutputs = new Output[](1);
        fillerOutputs[0] = Output({
            token: token,
            amount: 10,
            recipient: BOB,
            chainId: CHAIN_ID_SEPOLIA
        });

        // Encode the data
        bytes memory orderData = abi.encode(swapperInputs, swapperOutputs, fillerOutputs);

        emit log_bytes(orderData);

        // create a CrossChainOrder
        CrossChainOrder memory order = CrossChainOrder({
            settlementContract: address(tentSepolia),
            swapper: alice,
            nonce: 0,
            originChainId: 0,
            initiateDeadline: 0,
            fillDeadline: 0,
            orderData: orderData
        });

        // sign the order's hash with Alice's key
        bytes32 orderHash = keccak256(abi.encode(order));
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(aliceKey, orderHash);

        tentSepolia.initiate(order, abi.encodePacked(r, s, v), new bytes(0));

        vm.startPrank(BOB);
        tentSepolia.fill(order, new bytes(0));
        vm.stopPrank();

        assertEq(IERC20(token).balanceOf(BOB), FAUCET_DRIP-10000);

        vm.startPrank(host);
        tentSepolia.onAccept(
                IncomingPostRequest({request: PostRequest({
                                        source: new bytes(0),
                                        dest: new bytes(0),
                                        nonce: 0,
                                        from: new bytes(0),
                                        to: new bytes(0),
                                        body: abi.encode(fillerOutputs),
                                        timeoutTimestamp: 0
                                }),
                                relayer: address(0)})
        );
        vm.stopPrank();

        // final asserts that the intent has been fulfilled
        assertEq(IERC20(token).balanceOf(BOB), FAUCET_DRIP-10000+10);
        assertEq(IERC20(token).balanceOf(alice), FAUCET_DRIP-10+10000);
    }

    function testInstantiateMultiChain() public {
        (address alice, uint256 aliceKey) = makeAddrAndKey("alice");

        // just any from https://github.com/polytope-labs/ismp-solidity/blob/e67af4a359b3a53fa8132f7223c89ba680a24439/interfaces/IIsmpModule.sol#L84-L112
        uint256 forkIdSepolia = vm.createFork("wss://ethereum-sepolia-rpc.publicnode.com");
        uint256 forkIdBsc = vm.createFork("wss://bsc-testnet-rpc.publicnode.com");
        //
        // just operate using feeToken for now

        // Bsc instantiations
        // ---
        vm.selectFork(forkIdBsc);
        address hostBsc = hostAddr();
        address tokenBsc = IIsmpHost(hostBsc).feeToken();
        // instantiate Hypertents with default faucet address
        Hypertents tentBsc = new Hypertents(FAUCET);
        ITokenFaucet(FAUCET).drip(tokenBsc);
        assertEq(IERC20(tokenBsc).balanceOf(address(this)), FAUCET_DRIP);

        vm.startPrank(BOB);
        ITokenFaucet(FAUCET).drip(tokenBsc);
        assertEq(IERC20(tokenBsc).balanceOf(BOB), FAUCET_DRIP);

        IERC20(tokenBsc).approve(address(tentBsc), 10000+10000);
        vm.stopPrank();
        // ---

        // Sepolia instantiations
        // ---
        vm.selectFork(forkIdSepolia);
        address host = hostAddr();
        address token = IIsmpHost(host).feeToken();
        // instantiate Hypertents with default faucet address
        Hypertents tentSepolia = new Hypertents(FAUCET);

        ITokenFaucet(FAUCET).drip(token);
        assertEq(IERC20(token).balanceOf(address(this)), FAUCET_DRIP);

        vm.startPrank(alice);
        ITokenFaucet(FAUCET).drip(token);
        // assert that alice has some tokens
        assertEq(IERC20(token).balanceOf(alice), FAUCET_DRIP);
        IERC20(token).approve(address(tentSepolia), 10);
        vm.stopPrank();
        // ---

        Input[] memory swapperInputs = new Input[](1);
        swapperInputs[0] = Input({
            token: token,
            amount: 10
        });

        Output[] memory swapperOutputs = new Output[](1);
        swapperOutputs[0] = Output({
            token: tokenBsc,
            amount: 10000,
            recipient: alice,
            chainId: CHAIN_ID_BSC
        });

        Output[] memory fillerOutputs = new Output[](1);
        fillerOutputs[0] = Output({
            token: token,
            amount: 10,
            recipient: BOB,
            chainId: CHAIN_ID_SEPOLIA
        });

        // Encode the data
        bytes memory orderData = abi.encode(swapperInputs, swapperOutputs, fillerOutputs);

        // create a CrossChainOrder
        CrossChainOrder memory order = CrossChainOrder({
            settlementContract: address(tentSepolia),
            swapper: alice,
            nonce: 0,
            originChainId: 0,
            initiateDeadline: 0,
            fillDeadline: 0,
            orderData: orderData
        });

        // sign the order's hash with Alice's key
        bytes32 orderHash = keccak256(abi.encode(order));
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(aliceKey, orderHash);

        tentSepolia.initiate(order, abi.encodePacked(r, s, v), new bytes(0));

        vm.selectFork(forkIdBsc);
        vm.startPrank(BOB);
        tentBsc.fill(order, new bytes(0));
        vm.stopPrank();

        assertEq(IERC20(tokenBsc).balanceOf(BOB), FAUCET_DRIP-10000);
        assertEq(IERC20(token).balanceOf(alice), 10000);

        vm.selectFork(forkIdSepolia);
        vm.startPrank(host);
        tentSepolia.onAccept(
                IncomingPostRequest({request: PostRequest({
                                        source: new bytes(0),
                                        dest: new bytes(0),
                                        nonce: 0,
                                        from: new bytes(0),
                                        to: new bytes(0),
                                        body: abi.encode(fillerOutputs),
                                        timeoutTimestamp: 0
                                }),
                                relayer: address(0)})
        );
        vm.stopPrank();

        // final asserts that the intent has been fulfilled
        assertEq(IERC20(token).balanceOf(BOB), 10);
        assertEq(IERC20(token).balanceOf(alice), FAUCET_DRIP-10);
    }
}
