// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

interface Position {
    function getTokenOwnerBalances(address _token) external view returns (uint256);
    function tokenBalances(address _token) external view returns (uint256);
    function counter() external view returns (uint256);
    function getAllTokenOwnerAddress() external view returns (address[] memory);
}

contract PositionTest is Test {
    Position position;
    address ahmad = 0x9CB49d64564819f4396730b408cb16A03315B340;
    address ghoza = 0x597c129eE29d761f4Add79aF124593Be5E0EB77e;
    address mockUsdc = 0x58E50D45A7Bec0aa0079b67B756FEE3CD8b21D3C;

    address constant CONTRACT_ADDRESS = 0xb0fE85A070d93C3522862B3732DeC8dc1AD79e15;

    function setUp() public {
        vm.createSelectFork("https://testnet.riselabs.xyz");
        position = Position(CONTRACT_ADDRESS);
    }

    function test_tokenBalances() public view {
        // vm.startPrank(ahmad);
        console.log("Testing token", position.getTokenOwnerBalances(mockUsdc));
        console.log("counter", position.counter());
        console.log("position mockUsdc IERC20 balance", IERC20(mockUsdc).balanceOf(CONTRACT_ADDRESS));
        // 56,153.525351
        // vm.stopPrank();
    }
}
