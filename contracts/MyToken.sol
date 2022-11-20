// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("MyToken", "MTK") {
      _mint(msg.sender, 1000000);
    }
    mapping (address => uint) public balanceOf1;
    //单价每个Token  1 wei 
    uint256 public tokenPrice = 1;

      // 定义购买 和 赎回事件
    event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

     // 使用ETH 购买Token
    function tokenBuy() public payable returns (uint256 tokenAmount) {
        // 买入的数量必须大于0
        require(msg.value > 0, "Send ETH to buy some tokens");

        // 计算买入需要花费的ETH
        uint256 amountToBuy = msg.value / tokenPrice;
      
        // 向合约的调用者发送代币 
        balanceOf1[msg.sender] += amountToBuy;

        // 注册事件
        emit BuyTokens(msg.sender, msg.value, amountToBuy);

        return amountToBuy;

    }

      // 赎回ETH,并销毁Token
    function tokenRedeem(uint256 redeemAmount) public {
         // 检查销毁数量是否大于0
        require(redeemAmount > 0, "Specify an amount of token greater than zero");
        
        // // // 验证sender 是否有足够的Token销毁
        // uint256 userBalance = balanceOf(msg.sender);
        // require(userBalance >= redeemAmount, "Your balance is lower than the amount of tokens you want to redeem");

        // // // 验证合约是否有足够的ETH赎回
        uint256 redeemETH = redeemAmount * tokenPrice;
        // uint256 contractBalanceETH = address(this).balance;
        // require(contractBalanceETH >= redeemETH, "Vendor has not enough funds to accept the sell request");

        // 向合约调用者发送指定的 ETH
        // (bool sent,) = msg.sender.call{value: redeemETH}("");
        (bool sent,)=payable(msg.sender).call{value: redeemETH}("");
        require(sent, "Failed to send ETH to the user");

          // 销毁sender 的Token
        balanceOf1[msg.sender] -= redeemAmount;

    }
}