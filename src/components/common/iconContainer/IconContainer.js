// Import Libraries.
import React from "react";

// Import SCSS.
import "./IconContainer.scss";

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
        (colorClass ? colorClass : "") +
        " " +
        (fontSizeClass ? fontSizeClass : "") +
        " " +
        (iconPlacement ? iconPlacement : "")
      }
      onClick={(e) => {
        e.preventDefault();
        return onClick ? onClick(true) : "";
      }}
    >
      {icon && icon}
      {text && <p> {text}</p>}
      {tag && <p>{tag}</p>}
    </i>
  );
}

export default IconContainer;
