import React from "react";
import IconContainer from "../iconContainer/IconContainer";
import "./Buttons.css";
import CloseIcon from "@material-ui/icons/Close";

function Buttons({ variant, size, title, onClick, close, onCloseClick }) {
  return (
    <button
      className={`rfow-button rfow-button-${size} rfow-button-${variant}`}
      onClick={onClick}
    >
      <span>{title}</span>
      {close ? (
        <IconContainer
          icon={<CloseIcon />}
          fontSizeclassName="icon-xs"
          onClick={onCloseClick}
        />
      ) : (
        ""
      )}
    </button>
  );
}

export default Buttons;
