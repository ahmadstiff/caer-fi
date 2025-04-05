// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Script, console} from "forge-std/Script.sol";
import {MockWETH} from "../src/MockWETH.sol";

contract MockWETHScript is Script {
    MockWETH public mockWETH;

    function setUp() public {
        vm.createSelectFork(vm.rpcUrl("op_sepolia"));
    }

    function run() public {
        uint256 privateKey = vm.envUint("DEPLOYER_WALLET_PRIVATE_KEY");
        vm.startBroadcast(privateKey);
        mockWETH = new MockWETH();
        vm.stopBroadcast();
    }
}
