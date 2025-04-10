// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {LendingPool} from "../src/LendingPool.sol";

interface Position {
    function getTokenOwnerBalances(address _token) external view returns (uint256);
    function tokenBalances(address _token) external view returns (uint256);
    function counter() external view returns (uint256);
    function getAllTokenOwnerAddress() external view returns (address[] memory);
}

contract PositionTest is Test {
    Position position;
    LendingPool lendingPool;
    address ahmad = 0x9CB49d64564819f4396730b408cb16A03315B340;
    address ghoza = 0x597c129eE29d761f4Add79aF124593Be5E0EB77e;
    address mockUsdc = 0x42260072BbfaD1b50AD01C8aAdeA5dE345f2E752;

    address constant CONTRACT_ADDRESS = 0xD2477a85e2A254f1365F03BDb00124897F259f4A;

    address constant LP_ADDRESS = 0xF64b9a1bbD331eB5e3Fa5c80fe9417E1A3F96F12;

    function setUp() public {
        vm.createSelectFork("https://rpc.open-campus-codex.gelato.digital");
        position = Position(CONTRACT_ADDRESS);
        lendingPool = LendingPool(LP_ADDRESS);
    }

    function test_tokenBalances() public {
        // vm.startPrank(ahmad);

        vm.startPrank(ghoza);
        console.log("position mockUsdc IERC20 balance before", IERC20(mockUsdc).balanceOf(CONTRACT_ADDRESS));
        lendingPool.repayWithSelectedToken(1e6, mockUsdc, 0); // 500 shares == 55 USDC
        console.log("position mockUsdc IERC20 balance after", IERC20(mockUsdc).balanceOf(CONTRACT_ADDRESS));
        vm.stopPrank();
        // 56,153.525351
        // vm.stopPrank();
    }
}
