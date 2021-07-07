import React from "react";
import "./Button.css";

const Button = (props) => {
  const { buttonClass, buttonHref, text, onClick } = props;

  return (
    <a class={buttonClass} href={buttonHref} onClick={onClick}>
      {text}
    </a>
  );
};

export default Button;
