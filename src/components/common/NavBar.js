import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  const { id, icon, links, title } = props;

  return (
    <NavLink to={links} exact>
      <input
        type="radio"
        name="slideItem"
        id={id}
        className="slide-toggle"
        checked
      />
      <label htmlFor={id}>
        <p className="icon">{icon}</p>
        <span>{title}</span>
      </label>
    </NavLink>
  );
};

export default NavBar;
