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
	
	render() {
		const { ethBalance, tokenBalance, buytoken } = this.props;
		const { formState } = this.state;
		return(
			<div className="main">
		      { formState === "buy" ? <BuyForm ethBalance={ethBalance} tokenBalance={tokenBalance} buytoken={buytoken}/> : <SellForm /> }
	      	</div>
		)
	}
}

export default Main;