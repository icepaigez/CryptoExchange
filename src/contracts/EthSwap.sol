pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
	string public name = "EthSwap Cryptocurrency Exchange";
	Token public token;
	uint public rate = 100; //1 ether => 100 tokens

	event TokenPurchased(address receiver, address token, uint amount, uint rate);

	constructor(Token _token) public { //this is another form of inheriting from the Token contract, and we have to link the Token contract to this contract by passing in the address in the deployment file i.e set arg here and pass in the parameter before deploying to the blockchain
		token = _token;
	}

	function buyToken() public payable {
		uint tokenAmount = msg.value * rate;
		//require(token.balanceOf() >= tokenAmount);
		token.transfer(msg.sender, tokenAmount);
		//emit an event after a transfer is done
		emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
	}
}