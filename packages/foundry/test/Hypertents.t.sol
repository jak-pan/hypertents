// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "src/Hypertents.sol";

address constant FAUCET_SEPOLIA = address(0x17d8cc0859fbA942A7af243c3EBB69AbBfe0a320);

address constant ALICE = address(0x03);

contract BaseTest is Test {

    function testInstantiateSameChain() public {
        // just any from https://github.com/polytope-labs/ismp-solidity/blob/e67af4a359b3a53fa8132f7223c89ba680a24439/interfaces/IIsmpModule.sol#L84-L112
        uint256 forkId = vm.createFork("wss://ethereum-sepolia-rpc.publicnode.com");
        vm.selectFork(forkId);

        // emit log_address(address(faucetA));
        // emit log_address(FAUCET_A);

        // instantiate Hypertents with default address
        Hypertents tentA = new Hypertents(FAUCET_SEPOLIA);
        Hypertents tentB = new Hypertents(FAUCET_SEPOLIA);

        // create a CrossChainOrder
        CrossChainOrder memory order = CrossChainOrder({
            settlementContract: address(tentB),
            swapper: address(ALICE),
            nonce: 0,
            originChainId: 0,
            initiateDeadline: 0,
            fillDeadline: 0,
            orderData: new bytes(0)
        });

        // tentA.initiate(order, new bytes(0), new bytes(0));
    }
}
