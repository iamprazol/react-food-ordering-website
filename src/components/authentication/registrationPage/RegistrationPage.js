// Import Libraries.
import React, { useState } from "react";
import { connect } from "react-redux";
import { userActions, alertActions } from "../../../redux/actions";
import { store } from "../../../redux/helpers";

// Import SCSS.
import "./RegistrationPage.scss";

// Import Components.
import InputHandler from "../../common/inputHandler/InputHandler";
import IconContainer from "../../common/iconContainer/IconContainer";

// Import Icons.
import MailIcon from "@material-ui/icons/Mail";
import LockIcon from "@material-ui/icons/Lock";
import Buttons from "../../common/buttons/Buttons";
import PersonIcon from "@material-ui/icons/Person";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";

const ConnectedRegistrationPage = (props) => {
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
        ...userData.user,
        [name]: value,
      },
    });
  };

  const handleSubmit = (event, userDatas) => {
    const { register } = props;

    setUserData({ ...userData, submitted: true });
    setErrors({});
    register(userData);
  };

  const [errors, setErrors] = useState({});
  const { error } = props;

  if (error) {
    if (0 === Object.keys(errors).length) {
      setErrors(error);
    }
  }

  return (
    <div className="rfow-popup__register">
      <div className="rfow-popup__register-header">
        <h1>Member Register</h1>
      </div>
      <div className="rfow-popup__register-body">
        <div className="row">
          <div className={`rfow-field`}>
            <IconContainer
              icon={<PersonIcon />}
              fontSizeClass="icon--small"
              colorClass={errors.first_name ? "text-red" : "text-green"}
            />
            <InputHandler
              fieldSetting={{
                type: "text",
                value: userData.first_name ? userData.first_name : "",
                required: false,
                placeholder: "First Name",
                id: "user_first_name",
                name: "first_name",
                error: errors.first_name ? errors.first_name : "",
              }}
              onChange={handleInputChange}
            />
          </div>
          <div className={`rfow-field`}>
            <IconContainer
              icon={<PersonIcon />}
              fontSizeClass="icon--small"
              colorClass={errors.last_name ? "text-red" : "text-green"}
            />
            <InputHandler
              fieldSetting={{
                type: "text",
                value: userData.last_name ? userData.last_name : "",
                required: false,
                placeholder: "Last Name",
                id: `user_last_name`,
                name: "last_name",
                error: errors.last_name ? errors.last_name : "",
              }}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className={`rfow-field`}>
            <IconContainer
              icon={<MailIcon />}
              fontSizeClass="icon--small"
              colorClass={errors.email ? "text-red" : "text-green"}
            />
            <InputHandler
              fieldSetting={{
                type: "email",
                value: userData.email ? userData.email : "",
                required: false,
                placeholder: "Email",
                id: `user_email`,
                name: "email",
                error: errors.email ? errors.email : "",
              }}
              onChange={handleInputChange}
            />
          </div>
          <div className={`rfow-field`}>
            <IconContainer
              icon={<ContactPhoneIcon />}
              fontSizeClass="icon--small"
              colorClass={errors.phone ? "text-red" : "text-green"}
            />
            <InputHandler
              fieldSetting={{
                type: "text",
                value: userData.phone ? userData.phone : "",
                required: false,
                placeholder: "Phone Number",
                id: `user_phone_number`,
                name: "phone",
                error: errors.phone ? errors.phone : "",
              }}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className={`rfow-field`}>
            <IconContainer
              icon={<LockIcon />}
              fontSizeClass="icon--small"
              colorClass={errors.password ? "text-red" : "text-green"}
            />
            <InputHandler
              fieldSetting={{
                type: "password",
                value: userData.password ? userData.password : "",
                required: false,
                placeholder: "Password",
                id: `user_password`,
                name: "password",
                error: errors.password ? errors.password : "",
              }}
              onChange={handleInputChange}
            />
          </div>
          <div className={`rfow-field`}>
            <IconContainer
              icon={<LockIcon />}
              fontSizeClass="icon--small"
              colorClass={errors.c_password ? "text-red" : "text-green"}
            />
            <InputHandler
              fieldSetting={{
                type: "password",
                value: userData.c_password ? userData.c_password : "",
                required: false,
                placeholder: "Confirm Password",
                id: `user_confirm_password`,
                name: "c_password",
                error: errors.c_password ? errors.c_password : "",
              }}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Buttons
          type="submit"
          variant="primary"
          title="Register"
          size="large"
          onClick={(e) => handleSubmit(e, userData)}
        />
      </div>
    </div>
  );
};

function mapState(state) {
  const { registering, error } = state.registration;
  return { registering, error };
}

const actionCreators = {
  register: userActions.register,
};

const RegistrationPage = connect(
  mapState,
  actionCreators
)(ConnectedRegistrationPage);

export default RegistrationPage;
