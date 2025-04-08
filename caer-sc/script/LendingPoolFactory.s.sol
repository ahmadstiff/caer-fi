// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Script, console} from "forge-std/Script.sol";
import {LendingPoolFactory} from "../src/LendingPoolFactory.sol";

contract LendingPoolFactoryScript is Script {
    LendingPoolFactory public lendingPoolFactory;
    address public oracle = 0x13B026C3c5589C046F193FFa66427389fa2dbD22;

    function setUp() public {
        vm.createSelectFork(vm.rpcUrl("op_sepolia"));
    }

    function run() public {
        uint256 privateKey = vm.envUint("DEPLOYER_WALLET_PRIVATE_KEY");
        vm.startBroadcast(privateKey);

        lendingPoolFactory = new LendingPoolFactory(oracle);
        vm.stopBroadcast();
    }
}
