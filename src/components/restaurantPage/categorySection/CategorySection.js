import React from "react";
import "./CategorySection.css";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import IconContainer from "../../common/iconContainer/IconContainer";
import { Link } from "react-scroll";

function CategorySection() {
  return (
    <div class="rfow-restaurant-categories">
      <div class="rfow-restaurant-categories-header u-line">
        <h3>
          <IconContainer
            icon={<WhatshotIcon />}
            colorClass="text-yellow"
            fontSizeClass="icon-small"
          />
          Categories
        </h3>
      </div>
      <ul
        class="rfow-restaurant-categories-body"
        style={{
          listStyle: "none",
          margin: "0px",
          padding: "0px",
        }}
      >
        <li class="active text-medium u-line-short">
          <Link to="momo" smooth={true}>
            Momo
          </Link>
        </li>
        <li class="text-medium u-line-short">
          <Link to="chicken" smooth={true}>
            Chicken
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default CategorySection;
