import React from "react";
import "./CategorySection.css";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import IconContainer from "../../common/iconContainer/IconContainer";

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
      <div class="rfow-restaurant-categories-body">
        <a class="u-line-short" href="momo">
          Momo
        </a>
        <a class="u-line-short" href="momo">
          Pizza
        </a>
        <a class="u-line-short" href="momo">
          Veg
        </a>
        <a class="u-line-short" href="momo">
          Buff
        </a>
      </div>
    </div>
  );
}

export default CategorySection;
