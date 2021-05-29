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
       { !walletInstalled && <p className="wallet__alert">You need a blockchain wallet to use this DApp. Please click <span><a href="https://metamask.io/download" target="_blank" rel="noopener noreferrer">Install Wallet</a></span> above to get MetaMask!</p> }
      </div>
    );
  }
}

export default App;
