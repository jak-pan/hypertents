// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "src/Hypertents.sol";

address constant TOKEN_FAUCET = address(0x17d8cc0859fbA942A7af243c3EBB69AbBfe0a320);

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        bytes32 privateKey = vm.envBytes32("PRIVATE_KEY");
        bytes32 version = keccak256("v3");
        vm.createSelectFork("sepolia");
        vm.startBroadcast(uint256(privateKey));

        // create and select for optimism
        Hypertents a = new Hypertents{salt: version}(TOKEN_FAUCET);
        console2.log(address(a));
        vm.stopBroadcast();

        // create and select fork for goerli
        vm.createSelectFork("bnb");
        vm.startBroadcast(uint256(privateKey));

        Hypertents b = new Hypertents{salt: version}(TOKEN_FAUCET);
        console2.log(address(b));
        vm.stopBroadcast();
    }
}
