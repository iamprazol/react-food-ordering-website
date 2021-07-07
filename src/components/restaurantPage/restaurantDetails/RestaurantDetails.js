import React from "react";
import "./RestaurantDetails.css";
import IconContainer from "../../common/iconContainer/IconContainer";
import StarBorderIcon from "@material-ui/icons/Star";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

function RestaurantDetails(props) {
  let {
    restaurantId,
    name,
    description,
    deliveryHours,
    minimumOrder,
    coverPic,
    picture,
    address,
    vat,
    discount,
    additionalCharges,
  } = props;

  return (
    <section className="rfow-restaurant-details-container">
      <div className="rfow-restaurant-details-header u-line">
        <div className="rfow-restaurant-title-address">
          <h1 className="fw-700">{name}</h1>
          <p className="text-light-black">
            <IconContainer
              icon={<LocationOnOutlinedIcon />}
              colorClass="text-red"
              fontSizeClass="icon-medium"
            />
            {address}
          </p>
        </div>
        <div className="rfow-restaurant-image">
          <img src={picture} alt="restaurant" />
        </div>
      </div>
      <div className="rfow-restaurant-details u-line">
        <div className="rfow-details price-time">
          <span className="text-light-black">{"DELIVERY HOURS"}</span>
          <span className="text-light-black">{deliveryHours}</span>
        </div>
        <div className="rfow-details minimum-order">
          <span className="text-light-black">{"MINIMUM ORDER"}</span>
          <span className="text-light-black">Rs. {minimumOrder}</span>
        </div>
        <div className="rfow-details discount-rate">
          <span className="text-light-black">{"DISCOUNT"}</span>
          <span className="text-light-black">{discount} % </span>
        </div>
        <div className="rfow-details service-charge">
          <span className="text-light-black">{"SERVICE CHARGE"}</span>
          <span className="text-light-black">{additionalCharges} % </span>
        </div>
        <div className="rfow-details additional-vat">
          <span className="text-light-black">{"ADDITIONAL VAT"}</span>
          <span className="text-light-black">{vat} % </span>
        </div>
      </div>
      <div className="rfow-restaurant-description u-line">
        <div className="rating">
          <span>
            <IconContainer
              icon={<StarBorderIcon />}
              colorClass="text-yellow"
              fontSizeClass="icon-medium"
            />
            <IconContainer
              icon={<StarBorderIcon />}
              colorClass="text-yellow"
              fontSizeClass="icon-medium"
            />
            <IconContainer
              icon={<StarBorderIcon />}
              colorClass="text-yellow"
              fontSizeClass="icon-medium"
            />
            <IconContainer
              icon={<StarBorderIcon />}
              fontSizeClass="icon-medium"
            />
            <IconContainer
              icon={<StarBorderIcon />}
              fontSizeClass="icon-medium"
            />
          </span>
          <span className="text-light-black">58 ratings</span>
        </div>
        <div className="restaurant-tag">
          <h3 className="text-light-white">{description}</h3>
        </div>
      </div>

      <div className="restaurant-tabs u-line">
        <div className="restaurant-menu-tab">
          <a className="nav-link text-light-white fw-700" href="#about">
            Menu
          </a>
          <a className="nav-link text-light-white fw-700" href="#about">
            About
          </a>
          <a className="nav-link text-light-white fw-700" href="#review">
            Reviews
          </a>
          <a className="nav-link text-light-white fw-700" href="#mapgallery">
            Map &amp; Gallery
          </a>
        </div>
        <div className="add-wishlist">
          <IconContainer
            icon={<FavoriteBorderIcon />}
            fontSizeClass="icon-medium"
          />{" "}
        </div>
      </div>
    </section>
  );
}

export default RestaurantDetails;
