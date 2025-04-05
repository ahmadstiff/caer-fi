// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Script, console} from "forge-std/Script.sol";
import {LendingPool} from "../src/LendingPool.sol";

contract LendingPoolScript is Script {
    LendingPool public lendingPool;

    function setUp() public {
        vm.createSelectFork(vm.rpcUrl("rise_sepolia"));
    }

    function run() public {
        uint256 privateKey = vm.envUint("DEPLOYER_WALLET_PRIVATE_KEY");
        vm.startBroadcast(privateKey);

        address collateral = 0x5Eef02790e6722CC1B1C03595C28f9Fa63f9846d;
        address borrow = 0x2C659014c834A27731b0Ed53cA43f3Fd64B2aea3;
        address oracle = 0x174a6aa5f27F062C63D920693FEB1511D449ba4B;

        lendingPool = new LendingPool(collateral, borrow, oracle, 700000000000000000);
        vm.stopBroadcast();
    }
}
