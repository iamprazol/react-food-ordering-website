import React from "react";
import "./Cards.css";
import StarBorderIcon from "@material-ui/icons/Star";
import IconContainer from "../iconContainer/IconContainer";

const Cards = (props) => {
  const {
    id,
    name,
    description,
    image,
    address,
    delivery_hours,
    minimum_order,
    discount,
  } = props;
  return (
    <div className="card">
      <div className="image-holder">
        <img src={image} alt="food" />
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
              />
              <IconContainer
                icon={<StarBorderIcon />}
                colorClass="text-yellow"
              />
              <IconContainer
                icon={<StarBorderIcon />}
                colorClass="text-yellow"
              />
              <IconContainer icon={<StarBorderIcon />} />
              <IconContainer icon={<StarBorderIcon />} />
            </span>
            <span class="text-light-white text-right">4225 ratings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
