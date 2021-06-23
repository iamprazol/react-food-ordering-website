import React from "react";
import "./Cards.css";

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
      <div className="description">
        <p>{description}</p>
        <div className="details">
          <p>
            <strong>Address:</strong> {address}
          </p>
          <p>
            <strong>Delivery Hours:</strong> {delivery_hours} |{" "}
            <strong>Minimum Order:</strong> {minimum_order}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
