import React, { Component } from "react";
import BuyForm from "./BuyForm";
import "./main.css";


class Main extends Component {
	
	render() {
		const { ethBalance, tokenBalance, buytoken } = this.props;
		return(
			<div className="main">
		      <BuyForm ethBalance={ethBalance} tokenBalance={tokenBalance} buytoken={buytoken}/>
	      </div>
		)
	}
}

export default Main;