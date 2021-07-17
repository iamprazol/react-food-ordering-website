// Import Libraries.
import React from "react";

// Import CSS.
import "./Buttons.css";

// Import Components.
import IconContainer from "../iconContainer/IconContainer";

// Import Icons.
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
          fontSizeClass="icon-xs"
          onClick={onCloseClick}
        />
      ) : (
        ""
      )}
    </button>
  );
}

export default Buttons;
