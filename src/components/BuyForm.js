import React, { Component } from "react";
import { ethers } from "ethers";
import ethLogo from "./eth-logo.png";
import tokenLogo from "./token-logo.png";

class BuyForm extends Component {
	constructor() {
		super()
		this.state = {
			tokenQuantity: 0,
			exchangeRate: 100
		}
	}

	doExchange = e => {
		const { exchangeRate } = this.state
		let eth2Token = e.target.value * exchangeRate;
		this.setState({
			tokenQuantity: eth2Token
		})
	}

	makeExchange = async e => {
		e.preventDefault()
		const { tokenQuantity, exchangeRate } = this.state;
		let ethQty = String(tokenQuantity / exchangeRate);
		let ethQtyWei = await ethers.utils.parseEther(ethQty).toString()
		this.props.buytoken(ethQtyWei);
	}
 
	render() {
		const { ethBalance, tokenBalance } = this.props;
		const { tokenQuantity, exchangeRate } = this.state;
		return(
				<form className="mb-3" onSubmit={this.makeExchange}>
			        <div>
			          <label className="float-left"><b>Input</b></label>
			          <span className="float-right text-muted">
			            Balance: {ethBalance}
			          </span>
			        </div>
			        <div className="input-group mb-4">
			          <input
			          	onChange={this.doExchange}
			            type="text"
			            className="form-control form-control-lg"
			            placeholder="0"
			            required />
			          <div className="input-group-append">
			            <div className="input-group-text">
			              <img src={ethLogo} height='32' alt=""/>
			              &nbsp;&nbsp;&nbsp; ETH
			            </div>
			          </div>
			        </div>
			        <div>
			          <label className="float-left"><b>Output</b></label>
			          <span className="float-right text-muted">
			            Balance: {tokenBalance}
			          </span>
			        </div>
			        <div className="input-group mb-2">
			          <input
			            type="text"
			            className="form-control form-control-lg"
			            placeholder="0"
			            value={tokenQuantity}
			            disabled
			          />
			          <div className="input-group-append">
			            <div className="input-group-text">
			              <img src={tokenLogo} height='32' alt=""/>
			              &nbsp; DApp
			            </div>
			          </div>
			        </div>
			        <div className="mb-5">
			          <span className="float-left text-muted">Exchange Rate</span>
			          <span className="float-right text-muted">1 ETH = {exchangeRate} DApp</span>
			        </div>
			        <button type="submit" className="btn btn-primary btn-block btn-lg">SWAP!</button>
		      </form>
		)
	}
}

export default BuyForm;