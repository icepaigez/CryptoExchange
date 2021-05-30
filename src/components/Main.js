import React, { Component } from "react";
import "./main.css";

class Main extends Component {
	render() {
		return(
			<div className="main">
				<form className="mb-3">
			        <div>
			          <label className="float-left"><b>Input</b></label>
			          <span className="float-right text-muted">
			            Balance: 0
			          </span>
			        </div>
			        <div className="input-group mb-4">
			          <input
			            type="text"
			            // ref={(input) => { this.input = input }}
			            className="form-control form-control-lg"
			            placeholder="0"
			            required />
			          <div className="input-group-append">
			            <div className="input-group-text">
			              <img src="" height='32' alt=""/>
			              &nbsp;&nbsp;&nbsp; ETH
			            </div>
			          </div>
			        </div>
			        <div>
			          <label className="float-left"><b>Output</b></label>
			          <span className="float-right text-muted">
			            Balance: 0
			          </span>
			        </div>
			        <div className="input-group mb-2">
			          <input
			            type="text"
			            className="form-control form-control-lg"
			            placeholder="0"
			            value=""
			            disabled
			          />
			          <div className="input-group-append">
			            <div className="input-group-text">
			              <img src="" height='32' alt=""/>
			              &nbsp; DApp
			            </div>
			          </div>
			        </div>
			        <div className="mb-5">
			          <span className="float-left text-muted">Exchange Rate</span>
			          <span className="float-right text-muted">1 ETH = 100 DApp</span>
			        </div>
			        <button type="submit" className="btn btn-primary btn-block btn-lg">SWAP!</button>
		      </form>
	      </div>
		)
	}
}

export default Main;