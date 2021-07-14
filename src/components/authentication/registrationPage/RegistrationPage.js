import React, { useState } from "react";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions";

import "./RegistrationPage.css";
import InputHandler from "../../common/inputHandler/InputHandler";
import IconContainer from "../../common/iconContainer/IconContainer";
import MailIcon from "@material-ui/icons/Mail";
import LockIcon from "@material-ui/icons/Lock";
import Buttons from "../../common/buttons/Buttons";
import PersonIcon from "@material-ui/icons/Person";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";

const RegistrationPage = (props) => {
  const [userData, setUserData] = useState({
    user: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      c_password: "",
      phone: "",
    },
    submitted: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      user: {
        ...userData,
        [name]: value,
      },
    });
  };

  const handleSubmit = (event) => {
    const { register } = props;

    setUserData({ submitted: true });
    register(userData);
  };

  return (
    <div className="rfow-restaurant-register">
      <div className="rfow-restaurant-register-header">
        <h1>Member Register</h1>
      </div>
      <div className="rfow-restaurant-register-body">
        <div className="row">
          <div className={`rfow-field`}>
            <IconContainer
              icon={<PersonIcon />}
              fontSizeClass="icon-small"
              colorClass="text-green"
            />
            <InputHandler
              fieldSetting={{
                type: "text",
                value: "",
                required: false,
                placeholder: "First Name",
                id: "user_first_name",
                name: "first_name",
              }}
              onChange={handleInputChange}
            />
          </div>
          <div className={`rfow-field`}>
            <IconContainer
              icon={<PersonIcon />}
              fontSizeClass="icon-small"
              colorClass="text-green"
            />
            <InputHandler
              fieldSetting={{
                type: "text",
                value: "",
                required: false,
                placeholder: "Last Name",
                id: `user_last_name`,
                name: "last_name",
              }}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
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
                placeholder: "Email",
                id: `user_email`,
                name: "email",
              }}
              onChange={handleInputChange}
            />
          </div>
          <div className={`rfow-field`}>
            <IconContainer
              icon={<ContactPhoneIcon />}
              fontSizeClass="icon-small"
              colorClass="text-green"
            />
            <InputHandler
              fieldSetting={{
                type: "text",
                value: "",
                required: false,
                placeholder: "Phone Number",
                id: `user_phone_number`,
                name: "phone",
              }}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
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
                placeholder: "Password",
                id: `user_password`,
                name: "password",
              }}
              onChange={handleInputChange}
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
                placeholder: "Confirm Password",
                id: `user_confirm_password`,
                name: "c_password",
              }}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Buttons
          variant="primary"
          size="large"
          title="Register"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default RegistrationPage;
