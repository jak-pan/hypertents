// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "src/Hypertents.sol";

address constant FAUCET_A = address(0x17d8cc0859fbA942A7af243c3EBB69AbBfe0a320);
address constant FAUCET_B = address(0x02);

address constant ALICE = address(0x03);


contract TestTokenFaucet {
    ITokenFaucet public tokenFaucetContract;

    constructor(address _tokenFaucetAddress) {
        tokenFaucetContract = ITokenFaucet(_tokenFaucetAddress);
    }

    function drip(address recipient) external {
        tokenFaucetContract.drip(recipient);
    }
}

contract BaseTest is Test {

    function testInstantiateSameChain() public {
        // just any from https://github.com/polytope-labs/ismp-solidity/blob/e67af4a359b3a53fa8132f7223c89ba680a24439/interfaces/IIsmpModule.sol#L84-L112
        uint256 forkId = vm.createFork("wss://ethereum-sepolia-rpc.publicnode.com");
        vm.selectFork(forkId);

        // instantiate Hypertents with default address
        Hypertents tentA = new Hypertents(FAUCET_A);
        // Hypertents tentB = new Hypertents(address(faucetB));
        // create a CrossChainOrder
        CrossChainOrder memory order = CrossChainOrder({
            settlementContract: address(FAUCET_B),
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
