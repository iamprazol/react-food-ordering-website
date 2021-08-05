// Import Libraries.
import React from "react";

// Import SCSS.
import "./Buttons.scss";

// Import Components.
import IconContainer from "../iconContainer/IconContainer";

// Import Icons.
import CloseIcon from "@material-ui/icons/Close";

function Buttons({ variant, size, title, onClick, close, onCloseClick }) {
  return (
    <button
      className={`rfow-button rfow-button__${variant} rfow-button--${size}`}
      onClick={onClick}
    >
      <span>{title}</span>
      {close ? (
        <IconContainer
          icon={<CloseIcon />}
          fontSizeClass="icon--xs"
          onClick={onCloseClick}
        />
      ) : (
        ""
      )}
    </button>
  );
}

export default Buttons;
