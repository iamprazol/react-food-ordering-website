import React from "react";
import "./IconContainer.css";

function IconContainer({ icon, colorClass, text, tag }) {
  return (
    <i className={"iconContainer " + colorClass}>
      {icon && icon}
      {text && <h4> {text}</h4>}
      {tag && <p>{tag}</p>}
    </i>
  );
}

export default IconContainer;
