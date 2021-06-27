import React from "react";
import "./Button.css";

const Button = (props) => {
    const { buttonClass, buttonHref, text } = props;

	return (
        <a class={buttonClass} href={buttonHref}>{text}</a>
    );
}

export default Button;