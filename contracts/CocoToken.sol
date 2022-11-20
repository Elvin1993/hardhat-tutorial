// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "hardhat/console.sol";

contract CocoToken {
    string public name = "Coco Token";
    string public symbol = "CCT";

    uint256 public totalSupply = 1000000;

    address private _owner;

    mapping(address => uint256) balances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        // console.log('constructor', msg.sender, totalSupply);
        balances[msg.sender] = totalSupply;
        _transferOwnership(msg.sender);
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(owner() == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "new owner is th zero address");
        _transferOwnership(newOwner);
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    /**
     * A 转账给B 正常
     * A 转账给A自己 因为设置balances[to]的时候取的是` balances[msg.sender] -= amount;`之前的余额 所以每次A 转账给* A的时候 他的balances都会增加amount
     */
    function transferHasBug(address to, uint256 amount) public virtual returns (bool) {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        uint256 amountTo = balances[to];
        balances[msg.sender] -= amount;
        balances[to] = amountTo + amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function balanceOf(address account) external view returns (uint256) {
      return balances[account];
    }
}
