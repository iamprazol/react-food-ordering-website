import React from "react";
import "./Cards.css";
import StarBorderIcon from "@material-ui/icons/Star";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import IconContainer from "../iconContainer/IconContainer";

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
            <a
              className="text-light-black"
              href={"http://themegrill.me:3000/restaurant/" + id}
            >
              {name}
            </a>
          </h6>
          <div class="tags">
            <span class="text-custom-white rectangle-tag bg-yellow">3.1</span>
          </div>
        </div>
        <p class="text-light-white">{description}</p>
        <div class="product-details">
          <div class="price-time">
            <span class="text-light-black time">{delivery_hours}</span>
            <span class="text-light-white price">Rs. {minimum_order} min</span>
          </div>
          <div class="rating">
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
