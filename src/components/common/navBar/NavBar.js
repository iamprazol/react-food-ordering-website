// Import Libraries.
import React, { useState } from "react";

// Import CSS.
import "./NavBar.css";

// Import Components.
import IconContainer from "../iconContainer/IconContainer";
import Button from "../button/Button";

// Import Icons.
import SearchIcon from "@material-ui/icons/Search";

function NavBar({ onClick, onKeyPress }) {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="rfow-navbar">
      <div className="rfow-navbar-left">
        <div className="rfow-navbar-logo">
          <img src="http://wptest.me/images/logo/foodie.png" alt="logo" />
        </div>
      </div>
      <div className="rfow-navbar-center">
        <div className="rfow-navbar-search">
          <IconContainer icon={<SearchIcon />} fontSizeClass="icon-medium" />
          <input
            className="rfow-search"
            type="text"
            placeholder={"Bajeko Sekuwa"}
            onKeyPress={(e) => onKeyPress(e)}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <Button
          buttonClass="btn-submit btn-primary"
          text={"Find Restaurant"}
          onClick={() => onClick("find_restaurant", searchText)}
        />
      </div>
      <div className="rfow-navbar-right">
        <div className="rfow-navbar-account">
          <Button
            buttonClass="btn-submit btn-secondary"
            text={"Login"}
            onClick={() => onClick("login")}
          />
          <Button
            buttonClass="btn-submit btn-secondary"
            text={"Register"}
            onClick={() => onClick("register")}
          />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
