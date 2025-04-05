// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract MockPEPE is ERC20 {
    constructor() ERC20("PEPE", "PEPE") {
        _mint(msg.sender, 1000);
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function burn(address spender, uint256 amount) public {
        _burn(spender, amount);
    }
}
