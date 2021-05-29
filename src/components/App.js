import React, { Component } from 'react';
import Web3 from "web3";
import Header from "./Header";
import './App.css';

class App extends Component {

  constructor(){
    super()
    this.state = {
      walletInstalled: true
    }
  }

  isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  componentDidMount() {
    if (!this.isMetaMaskInstalled()) {
      this.setState({
        walletInstalled: false
      })
    }
  }

  render() {
    const { walletInstalled } = this.state;
    return (
      <div>
       <Header walletState={walletInstalled}/>
       <p className="wallet__alert">You need a blockchain wallet to use this DApp. Please click <span>Install Wallet</span> above to get MetaMask!</p>
        {/*<div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>Dapp University Starter Kit</h1>
                <p>
                  Edit <code>src/components/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LEARN BLOCKCHAIN <u><b>NOW! </b></u>
                </a>
              </div>
            </main>
          </div>
        </div>*/}
      </div>
    );
  }
}

export default App;
