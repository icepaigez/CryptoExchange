import React from "react";
import Identicon from "identicon.js";
import "./navbar.css";

const Navbar = ({ walletState, account }) => {
	if (account) {
		var data = new Identicon(account, 30).toString();
	} 
	
	return(
		 <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow header">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.binance.com/en"
            target="_blank"
            rel="noopener noreferrer"
          >
            Centra Cryptocurrency Exchange
          </a>
          { walletState ? <div className="wallet__address">{ account }<span><img width="30" height="30" src={`data:image/png;base64,${data}`} alt=""/></span></div> : <div className="install"><a href="https://metamask.io/download" target="_blank" rel="noopener noreferrer" className="install__metamask">Install Wallet</a></div> }
        </nav>
	)
}

export default Navbar;
