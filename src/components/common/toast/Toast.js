// Import Libraries.
import React, { useState } from "react";

// Import Components.
import IconContainer from "../iconContainer/IconContainer";

// Import Icons.
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import "./Toast.scss";
function Toast(props) {
  const { title, message, type } = props;
  const [showToast, setShowToast] = useState(true);

  const closeToastHandler = () => {
    setShowToast(!showToast);
  };

  return showToast ? (
    <div
      className={"rfow-toast " + ("success" === type ? "bg-green" : "bg-red")}
    >
      <div className="rfow-toast__left">
        <IconContainer
          icon={"success" === type ? <CheckCircleIcon /> : <ErrorIcon />}
          colorClass="text-white"
          fontSizeClass="icon--large"
        />
      </div>
      <div className="rfow-toast__center">
        <h3 className="rfow-toast__center-title text-white">{title}</h3>
        <p className="rfow-toast__center-message text-white">{message}</p>
      </div>
      <div className="rfow-toast__right">
        <span className="rfow-toast__close" onClick={closeToastHandler}>
          &times;
        </span>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Toast;
