// Import Libraries.
import React from "react";

// Import SCSS.
import "./Button.scss";

const Button = (props) => {
  const { buttonClass, buttonHref, text, onClick } = props;

  return (
    <a class={buttonClass} href={buttonHref} onClick={onClick}>
      {text}
    </a>
  );
};

export default Button;
