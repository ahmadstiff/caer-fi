// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";

interface TokenSwap {
    function mint(address _to, uint256 _amount) external;
    function burn(address _spender, uint256 _amount) external;
}

contract LendingPoolSequencer is ReentrancyGuard {
    using SafeERC20 for IERC20;

    error InsufficientLiquidity();
    error ZeroAmount();

    event BorrowBySequencer(address indexed user, uint256 amount, uint256 shares, bool bridge);
    event Supply(address indexed user, uint256 amount, uint256 shares);

    uint256 public totalSupplyAssets;
    uint256 public totalSupplyShares;
    uint256 public totalBorrowAssets;
    uint256 public totalBorrowShares;
    mapping(address => uint256) public userSupplyShares;
    mapping(address => uint256) public userBorrowShares;
    mapping(address => uint256) public userCollaterals;
    address public collateralToken;
    address public borrowToken;
    uint256 public lastAccrued;

    constructor(address _collateralToken, address _borrowToken) {
        collateralToken = _collateralToken;
        borrowToken = _borrowToken;
    }

    function supply(uint256 amount) public nonReentrant {
        if (amount == 0) revert ZeroAmount();
        _accrueInterest();
        uint256 shares = 0;
        if (totalSupplyAssets == 0) {
            shares = amount;
        } else {
            shares = (amount * totalSupplyShares) / totalSupplyAssets;
        }

        userSupplyShares[msg.sender] += shares;
        totalSupplyShares += shares;
        totalSupplyAssets += amount;

        IERC20(borrowToken).safeTransferFrom(msg.sender, address(this), amount);

        emit Supply(msg.sender, amount, shares);
    }

    function borrowBySequencer(uint256 _amount, address _user) public nonReentrant {
        uint256 shares = 0;
        if (totalBorrowShares == 0) {
            shares = _amount;
        } else {
            shares = totalBorrowShares * _amount / totalBorrowAssets;
        }
        userBorrowShares[_user] += shares;
        totalBorrowShares += shares;
        totalBorrowAssets += _amount;

        if (totalSupplyAssets < _amount) {
            TokenSwap(borrowToken).mint(_user, _amount);
        } else {
            IERC20(borrowToken).safeTransfer(_user, _amount);
        }

        bool bridge = _user != msg.sender;

        emit BorrowBySequencer(_user, _amount, shares, bridge);
    }

    function _accrueInterest() internal {
        uint256 borrowRate = 10;

        uint256 interestPerYear = (totalBorrowAssets * borrowRate) / 100;

        uint256 elapsedTime = block.timestamp - lastAccrued;

        uint256 interest = (interestPerYear * elapsedTime) / 365 days;

        totalSupplyAssets += interest;
        totalBorrowAssets += interest;
        lastAccrued = block.timestamp;
    }
}
