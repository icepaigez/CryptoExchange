import React, { Component } from 'react';
import { ethers } from "ethers";
import EthSwap from "../abis/EthSwap.json";
import Token from "../abis/Token.json";
import Navbar from "./Navbar";
import Main from "./Main";
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      walletInstalled: true,
      account:"",
      ethBalance: 0,
      token: {},
      ethSwap: {},
      tokenBalance: 0,
      loadingBlockchainData: true,
    }
  }

  isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  loadBlockchainData = async () => {
    const { ethereum } = window;
    let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(ethereum); //this provides read-only functionality and cannot do any transaction that will change the state of the blockchain
    //this will change state in the blockchain when attached to functions defined in the contract
    const signer = provider.getSigner();
    this.setState({
      account: accounts[0]
    })
    let hexBalance = await provider.getBalance(this.state.account)
    let ethBalance = await ethers.utils.formatEther(hexBalance) //converts hexadecimal format of balance to ether format
    this.setState({ ethBalance })

    //import the token and ethswap contracts and create a javascript version, so that the
    //frontend can interact with it

    //Token Contract
    const networkId = await ethereum.request({ method: 'net_version' });
    const tokenAbi = Token.abi;
    const addressInterface = await Token.networks[networkId]
    if (addressInterface) {
      const tokenAddress = addressInterface.address;
      let token = await new ethers.Contract(tokenAddress, tokenAbi, provider)
      this.setState({ token });
      let tokenBalance = await token.balanceOf(this.state.account)
      let tokenBalEthFormat = ethers.utils.formatEther(tokenBalance.toString()) //tokenBalance.toString() is in wei format
      this.setState({
        tokenBalance: tokenBalEthFormat
      })
    } else {
      window.alert("Token contract not deployed to the detected network!")
    }

    //Ethswap Contract
    const ethSwapAbi = EthSwap.abi;
    const ethSwapInterface = await EthSwap.networks[networkId]
    if (ethSwapInterface) {
      const ethSwapAddress = ethSwapInterface.address;
      const ethSwap = await new ethers.Contract(ethSwapAddress, ethSwapAbi, signer);
      this.setState({ ethSwap })
    } else {
      window.alert("EthSwap contract not deployed to the detected network!")
    }

    this.setState({
      loadingBlockchainData: false
    })
  }

  buyTokens = async ethQty => {
    const { ethSwap, account } = this.state;
    let txData = await ethSwap.buyToken({ from: account, value: ethQty }) //buyToken does not have any defined arguments [check the contract], so this object is a default requirement
    if (txData) {
      window.location.reload();
    }
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
    const { walletInstalled, account, loadingBlockchainData, ethBalance, tokenBalance } = this.state;
    return (
      <div>
       <Navbar walletState={walletInstalled} account={account}/>
       { !walletInstalled && <p className="wallet__alert">You need a blockchain wallet to use this DApp. Please click <span><a href="https://metamask.io/download" target="_blank" rel="noopener noreferrer">Install Wallet</a></span> above to get MetaMask!</p> }
       <div className="contents">{ loadingBlockchainData ? <h4>Loading...</h4> : <Main ethBalance={ethBalance} tokenBalance={tokenBalance} buytoken={this.buyTokens}/> }</div>
      </div>
    );
  }
}

export default App;
