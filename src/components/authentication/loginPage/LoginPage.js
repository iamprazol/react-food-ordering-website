import React from "react";
import "./LoginPage.css";
import InputHandler from "../../common/inputHandler/InputHandler";
import FoodieImage from "../../../assets/images/foodie.png";
import IconContainer from "../../common/iconContainer/IconContainer";
import MailIcon from "@material-ui/icons/Mail";
import LockIcon from "@material-ui/icons/Lock";
import Buttons from "../../common/buttons/Buttons";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

function LoginPage() {
  return (
    <div className="rfow-restaurant-login">
      <div className="rfow-restaurant-login-left">
        <img className="wd-70" src={FoodieImage} alt="foodie" />
      </div>
      <div className="rfow-restaurant-login-right">
        <div className="rfow-restaurant-login-header">
          <h1>Member Login</h1>
        </div>
        <div className="rfow-restaurant-login-body">
          <div className={`rfow-field`}>
            <IconContainer
              icon={<MailIcon />}
              fontSizeClass="icon-small"
              colorClass="text-green"
            />
            <InputHandler
              fieldSetting={{
                type: "email",
                value: "",
                required: false,
                placeholder: "iamprazol@gmail.com",
                id: `user_login_email`,
              }}
            />
          </div>
          <div className={`rfow-field`}>
            <IconContainer
              icon={<LockIcon />}
              fontSizeClass="icon-small"
              colorClass="text-green"
            />
            <InputHandler
              fieldSetting={{
                type: "password",
                value: "",
                required: false,
                placeholder: "",
                id: `user_login_password`,
              }}
            />
          </div>
          <Buttons variant="primary" size="large" title="LOGIN" />
        </div>
        <div className="rfow-restaurant-login-footer">
          <p>Forgot</p>
          <a href="">Username / Password?</a>
        </div>
        <a href="" className="text-right mt-50">
          Create your account
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
