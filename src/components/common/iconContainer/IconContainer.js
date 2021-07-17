// Import Libraries.
import React from "react";

// Import CSS.
import "./IconContainer.css";

function IconContainer({
  icon,
  colorClass,
  fontSizeClass,
  text,
  tag,
  iconStyle,
  iconPlacement,
  onClick,
}) {
  return (
    <i
      className={
        "iconContainer " +
        colorClass +
        " " +
        fontSizeClass +
        " " +
        iconPlacement
      }
      onClick={(e) => {
        e.preventDefault();
        return onClick ? onClick(true) : "";
      }}
    >
      {icon && icon}
      {text && <h4> {text}</h4>}
      {tag && <p>{tag}</p>}
    </i>
  );
}

export default IconContainer;
