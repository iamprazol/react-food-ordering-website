import React from "react";
import "./Buttons.css";

function Buttons({ variant, size, title }) {
  return (
    <button
      className={`rfow-button rfow-button-${size} rfow-button-${variant}`}
    >
      {title}
    </button>
  );
}

export default Buttons;
