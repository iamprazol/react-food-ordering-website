import React from "react";
import "./RegistrationPage.css";
import InputHandler from "../../common/inputHandler/InputHandler";
import IconContainer from "../../common/iconContainer/IconContainer";
import MailIcon from "@material-ui/icons/Mail";
import LockIcon from "@material-ui/icons/Lock";
import Buttons from "../../common/buttons/Buttons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonIcon from "@material-ui/icons/Person";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import HomeIcon from "@material-ui/icons/Home";

function RegistrationPage() {
  return (
    <div className="rfow-restaurant-register">
      <div className="rfow-restaurant-register-header">
        <h1>Member Register</h1>
      </div>
      <div className="rfow-restaurant-register-body">
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
              }}
            />
          </div>
          <div className={`rfow-field`}>
            <IconContainer
              icon={<AccountCircleIcon />}
              fontSizeClass="icon-small"
              colorClass="text-green"
            />
            <InputHandler
              fieldSetting={{
                type: "text",
                value: "",
                required: false,
                placeholder: "Username",
                id: `user_name`,
              }}
            />
          </div>
        </div>
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
                id: `user_first_name`,
              }}
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
              }}
            />
          </div>
        </div>
        <div className="row">
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
              }}
            />
          </div>
          <div className={`rfow-field`}>
            <IconContainer
              icon={<HomeIcon />}
              fontSizeClass="icon-small"
              colorClass="text-green"
            />
            <InputHandler
              fieldSetting={{
                type: "text",
                value: "",
                required: false,
                placeholder: "Address",
                id: `user_address`,
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className={`rfow-field`}>
            <InputHandler
              fieldSetting={{
                type: "select",
                value: "",
                required: false,
                placeholder: "Gender",
                id: `user_gender`,
                options: [{ male: "Male", female: "Female" }],
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
                placeholder: "Password",
                id: `user_password`,
              }}
            />
          </div>
        </div>
        <Buttons variant="primary" size="large" title="Register" />
      </div>
    </div>
  );
}

export default RegistrationPage;
