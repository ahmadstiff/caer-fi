// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Script, console} from "forge-std/Script.sol";
import {Position} from "../src/Position.sol";

contract PositionScript is Script {
    Position public position;

    function setUp() public {
        vm.createSelectFork(vm.rpcUrl("op_sepolia"));
    }

    function run() public {
        uint256 privateKey = vm.envUint("DEPLOYER_WALLET_PRIVATE_KEY");

        address collateral = 0x5Eef02790e6722CC1B1C03595C28f9Fa63f9846d;
        address borrow = 0x2C659014c834A27731b0Ed53cA43f3Fd64B2aea3;
        vm.startBroadcast(privateKey);
        position = new Position(collateral, borrow);
        vm.stopBroadcast();
    }
}
