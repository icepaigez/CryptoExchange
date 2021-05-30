import React, { Component } from 'react';
import { ethers } from "ethers";
import Navbar from "./Navbar";
import './App.css';

class App extends Component {

  constructor(){
    super()
    this.state = {
      walletInstalled: true,
      account:""
    }
  }

  isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  loadBlockchainData = async () => {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(ethereum);
    this.setState({
      account: accounts[0]
    })
    let hexBalance = await provider.getBalance(this.state.account)
    let ethBalance = await ethers.utils.formatEther(hexBalance)
  }

  async componentDidMount() {
    if (!this.isMetaMaskInstalled()) {
      this.setState({
        walletInstalled: false
      })
    } else {
      await this.loadBlockchainData();
    }
  }

  render() {
    const { walletInstalled, account } = this.state;
    return (
      <div>
       <Navbar walletState={walletInstalled} account={account}/>
       { !walletInstalled && <p className="wallet__alert">You need a blockchain wallet to use this DApp. Please click <span><a href="https://metamask.io/download" target="_blank" rel="noopener noreferrer">Install Wallet</a></span> above to get MetaMask!</p> }
      </div>
    );
  }
}

export default App;
