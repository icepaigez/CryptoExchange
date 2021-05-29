import React from "react";
import "./header.css";

const Header = () => {
	return(
		 <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow header">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Centralized Cryptocurrency Exchange
          </a>
        </nav>
	)
}

export default Header;