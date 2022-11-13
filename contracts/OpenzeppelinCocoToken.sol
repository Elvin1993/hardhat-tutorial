// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OpenzeppelinCocoToken is ERC20 {
    constructor() ERC20("OpenzeppelinCocoToken", "OCCT") {
        _mint(msg.sender, 1000000);
    }
}