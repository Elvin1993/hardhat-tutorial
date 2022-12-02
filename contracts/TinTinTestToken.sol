// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TinTinTestToken is ERC20, Ownable {
    uint256 public autoMintAmount = 100 * (10**uint256(decimals()));
    uint256 public initMintTime = 0;

    uint8 public whitelistedNumber;
    mapping(address => bool) public whiteMap;

    modifier onlyWhite() {
        require(verifyWhite(msg.sender), "You are not whitelisted");
        _;
    }

    constructor() ERC20("TinTinTestToken", "TTT") {
        whitelistedNumber = 1;
        whiteMap[msg.sender] = true;
        _mint(msg.sender, 1000000 * (10**uint256(decimals())));
    }

    function addToWhitelist(address whiteAddress) public onlyOwner{
        require(!whiteMap[whiteAddress], "already been whitelisted");
        whiteMap[whiteAddress] = true;
        whitelistedNumber += 1;
    }

    function removeToWhitelist(address whiteAddress) public onlyOwner{
        require(whiteAddress != owner(), "owner cannot be removed");
        require(whiteMap[whiteAddress], "address been not in whitelisted");
        whiteMap[whiteAddress] = false;
        whitelistedNumber -= 1;
    }

    function verifyWhite(address whiteAddress) public view returns (bool) {
        return whiteMap[whiteAddress];
    }

    function autoMint(address account) public onlyWhite {
        // block.timestamp - current block timestamp as seconds since unix epoch
        require(block.timestamp > initMintTime + 60, "only when time allowed");
        _mint(account, autoMintAmount);
        initMintTime = block.timestamp;
    }

    function changeAmount(uint256 amount) public onlyOwner {
        autoMintAmount = amount;
    }
}
