// Import Libraries.
import React from "react";
import { Link } from "react-router-dom";

// Import CSS.
import "./Cards.css";

// Import Components.
import IconContainer from "../iconContainer/IconContainer";

// Import Icons.
import StarBorderIcon from "@material-ui/icons/Star";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const Cards = (props) => {
  const {
    id,
    name,
    description,
    image,
    delivery_hours,
    minimum_order,
    discount,
  } = props;
  return (
    <div className="card">
      <div className="image-holder">
        <img src={image} alt="food" />
        <div className="overlay">
          <span className="text-custom-white rectangle-tag bg-red">
            {discount + "%"}
          </span>
          <span className="circle-tag">
            <IconContainer
              icon={<FavoriteBorderIcon />}
              fontSizeClass="icon-medium"
            />
          </span>
        </div>
      </div>
      <div className="product-box">
        <div className="title-box">
          <h6 className="product-title">
            <Link className="text-light-black" to={"restaurant/" + id}>
              {name}
            </Link>
          </h6>
          <div className="tags">
            <span className="text-custom-white rectangle-tag bg-yellow">
              3.1
            </span>
          </div>
        </div>
        <p className="text-light-white">{description}</p>
        <div className="product-details">
          <div className="price-time">
            <span className="text-light-black time">{delivery_hours}</span>
            <span className="text-light-white price">
              Rs. {minimum_order} min
            </span>
          </div>
          <div className="rating">
            <span>
              <IconContainer
                icon={<StarBorderIcon />}
                colorClass="text-yellow"
                fontSizeClass="icon-small"
              />
              <IconContainer
                icon={<StarBorderIcon />}
                colorClass="text-yellow"
                fontSizeClass="icon-small"
              />
              <IconContainer
                icon={<StarBorderIcon />}
                colorClass="text-yellow"
                fontSizeClass="icon-small"
              />
              <IconContainer
                icon={<StarBorderIcon />}
                fontSizeClass="icon-small"
              />
              <IconContainer
                icon={<StarBorderIcon />}
                fontSizeClass="icon-small"
              />
            </span>
            <span className="text-light-white">4225 ratings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
