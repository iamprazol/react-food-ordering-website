import React from "react";
import SVG from "react-inlinesvg";
import Foodie from "../../../assets/images/foodie.png";

const HomePage = () => {
  return (
    <div className="container">
      <div className="logo-box">
        <SVG src={Foodie} />
        <div className="divider-2" />
      </div>
      <div className="content">
        <h4 className="motto">"Hello Foodie"</h4>
      </div>
    </div>
  );
};

export default HomePage;
