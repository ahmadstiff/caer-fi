// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Script, console} from "forge-std/Script.sol";
import {PriceFeed} from "../src/PriceFeed.sol";

contract PriceFeedScript is Script {
    PriceFeed public priceFeed;

    function setUp() public {
        vm.createSelectFork(vm.rpcUrl("op_sepolia"));
    }

    function run() public {
        uint256 privateKey = vm.envUint("DEPLOYER_WALLET_PRIVATE_KEY");
        vm.startBroadcast(privateKey);
        priceFeed = new PriceFeed();
        vm.stopBroadcast();
    }
}
