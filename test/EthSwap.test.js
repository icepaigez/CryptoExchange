const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(qty) {
	return web3.utils.toWei(qty, "ether");
}

contract('EthSwap', accounts => { //accounts refer to an array of the addresses on the blockchain holding ether
	let token, ethSwap
	before(async() => {
		token = await Token.new()
		ethSwap = await EthSwap.new(token.address)
	})

	describe('EthSwap Deployment', async () => {
		it('should have a contract name', async () => {
			let name = await ethSwap.name()
			assert.equal(name, "EthSwap Cryptocurrency Exchange")
		})
	})

	describe('Token Deployment', async () => {
		it('should have a contract name', async () => {
			let name = await token.name()
			assert.equal(name, "DApp Token")
		})
	})

	describe('Token Transfer to EthSwap', async () => {
		it('EthSwap should hold all the tokens', async () => {
			await token.transfer(ethSwap.address, tokens("1000000"))
			let balance = await token.balanceOf(ethSwap.address)
			assert.equal(balance.toString(), tokens("1000000"))
		})
	})

	describe('Buy tokens', async () => {
		it('should transfer tokens from EthSwap to the caller when buyToken() is called', async () => {
			await ethSwap.buyToken({
				from: accounts[1],
				value: tokens('1')
			})
		})
	})
})