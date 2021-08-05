// Import Libraries.
import React from "react";
import { Link } from "react-scroll";

// Import SCSS.
import "./CategorySection.scss";

// Import Components.
import IconContainer from "../../common/iconContainer/IconContainer";

// Import Icons.
import WhatshotIcon from "@material-ui/icons/Whatshot";

function CategorySection(props) {
  const { categories } = props;

  return (
    <div className="rfow-categories">
      <div className="rfow-categories__header u-line">
        <h3>
          <IconContainer
            icon={<WhatshotIcon />}
            colorClass="text-yellow"
            fontSizeClass="icon--small"
          />
          Categories
        </h3>
      </div>
      <ul
        className="rfow-categories__body"
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
