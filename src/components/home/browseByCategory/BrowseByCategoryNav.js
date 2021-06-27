import React from "react";
import { NavLink } from "react-router-dom";

const BrowseByCategoryNav = (props) => {
  const { category_id, image, restaurant_id, title } = props;

  return (
    <NavLink to={"/restaurants/" + restaurant_id} exact>
      <input
        type="radio"
        name="slideItem"
        id={category_id}
        className="slide-toggle"
      />
      <label htmlFor={category_id}>
        <img
          className="icon"
          alt="food.jpeg"
          src={"http://wptest.me/images/food/" + image}
        />
        <span>{title}</span>
      </label>
    </NavLink>
  );
};

export default BrowseByCategoryNav;
