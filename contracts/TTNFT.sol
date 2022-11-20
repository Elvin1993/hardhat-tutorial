// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TiktokNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    mapping(address => uint256) private _userMInt;
    uint256 private _timeout;
    uint256 private _minprice;
    uint256 private _firstNumber;
    uint256 public nft_money;

    constructor(
        uint256 firstNumber,
        uint256 minprice,
        uint256 timeout
    ) ERC721("TiktokNFT", "TTNFT") {
        _firstNumber = firstNumber;
        _minprice = minprice;
        _timeout = timeout;
    }

    function freemint(address to) public payable {
        require(block.number <= _timeout);
        require(_userMInt[msg.sender] <= 3);
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId <= _firstNumber);
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _userMInt[msg.sender] += 1;
    }

    function mint(address to) public payable {
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId >= _firstNumber);
        require(msg.value >= _minprice);
        _minprice = msg.value;
        nft_money += msg.value;
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _userMInt[msg.sender] += 1;
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(nft_money);
    }
}
