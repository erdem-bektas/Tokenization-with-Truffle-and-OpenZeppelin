// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ActAsAlwaysToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Act As Always Token", "AAA") {
        _mint(msg.sender, initialSupply);
    }
}
