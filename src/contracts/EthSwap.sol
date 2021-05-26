pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
	string public name = "EthSwap Cryptocurrency Exchange";
	Token public token;

	constructor(Token _token) public { //this is another form of inheriting from the Token contract, and we have to link the Token contract to this contract by passing in the address in the deployment file i.e set arg here and pass in the parameter before deploying to the blockchain
		token = _token;
	}
}