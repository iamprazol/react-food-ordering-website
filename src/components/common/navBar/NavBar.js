import React from "react";
import "./NavBar.css";
import SearchIcon from '@material-ui/icons/Search';
import IconContainer from "../iconContainer/IconContainer";

function NavBar() {

	return (
		<div className="rfb-navbar">
			<div className="rfb-navbar-left">
				<div className="rfb-navbar-logo">
					<img src="http://wptest.me/images/logo/foodie.png" alt="logo" />
				</div>
			</div>
			<div className="rfb-navbar-center">
				<div className="rfb-navbar-search">
					<IconContainer icon={<SearchIcon />} fontSizeClass="icon-medium" />
					<input className="rfb-search" type="text" placeholder={"Bajeko Sekuwa"} />
				</div>
			</div>
			<div className="rfb-navbar-right">
				<div className="rfb-navbar-account">
					<a className="rfb-account" href="google.com">{"Login"}</a>
					<a className="rfb-account" href="google.com">{"Register"}</a>
				</div>
			</div>
		</div>
	);
}

export default NavBar;
