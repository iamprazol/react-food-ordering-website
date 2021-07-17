import React from "react";
import "./CategorySection.css";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import IconContainer from "../../common/iconContainer/IconContainer";
import { Link } from "react-scroll";

function CategorySection(props) {
  const { categories } = props;

  return (
    <div className="rfow-restaurant-categories">
      <div className="rfow-restaurant-categories-header u-line">
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
        className="rfow-restaurant-categories-body"
        style={{
          listStyle: "none",
          margin: "0px",
          padding: "0px",
        }}
      >
        {categories
          ? categories.map((category) => (
              <li className="active text-medium u-line-short">
                <Link to={category.toLowerCase()} smooth>
                  {category}
                </Link>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
}

export default CategorySection;
