import React from "react";
import "./Buttons.css";

function Buttons({ variant, size, title, onClick }) {
  return (
    <button
      className={`rfow-button rfow-button-${size} rfow-button-${variant}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Buttons;
