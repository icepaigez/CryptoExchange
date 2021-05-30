import React, { Component } from "react";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";
import "./main.css";


class Main extends Component {
	constructor() {
		super()
		this.state = {
			formState: "buy"
		}
	}

	buyOption = () => {
		this.setState({
			formState: "buy"
		})
	}

	sellOption = () => {
		this.setState({
			formState: "sell"
		})
	}
	
	render() {
		const { ethBalance, tokenBalance, buytoken, sellToken } = this.props;
		const { formState } = this.state;
		return(
			<div className="main">
				<div className="d-flex justify-content-between mb-3">
				  <button onClick={this.buyOption} className="btn btn-light">Buy</button>
				  {/*<span className="text-muted">&lt; &nbsp; &gt;</span>*/}
				  <button onClick={this.sellOption} className="btn btn-light">Sell</button>
				</div>
		      { formState === "buy" ? <BuyForm ethBalance={ethBalance} tokenBalance={tokenBalance} buytoken={buytoken}/> : <SellForm sellToken={sellToken} ethBalance={ethBalance} tokenBalance={tokenBalance}/> }
	      	</div>
		)
	}
}

export default Main;