import React from "react";
import IconContainer from "../iconContainer/IconContainer";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

function Toast(props) {
  const { title, message, type } = props;

  return (
    <div
      className={"rfow-toast " + ("success" === type ? "bg-green" : "bg-red")}
    >
      <div className="rfow-toast__left">
        <IconContainer
          icon={"success" === type ? <CheckCircleIcon /> : <ErrorIcon />}
          colorClass={"success" === type ? "text-green" : "text-red"}
        />
      </div>
      <div className="rfow-toast__center">
        <p className="rfow-toast__center-title text-white">{title}</p>
        <p className="rfow-toast__center-message text-white">{message}</p>
      </div>
      <div className="rfow-toast__right">
        <span className="rfow-toast__close">&times;</span>
      </div>
    </div>
  );
}

export default Toast;
