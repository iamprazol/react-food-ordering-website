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
    <section class="rfow-restaurant-details-container">
      <div className="rfow-restaurant-details-header u-line">
        <div class="rfow-restaurant-title-address">
          <h1 class="fw-700">{name}</h1>
          <p class="text-light-black">
            <IconContainer
              icon={<LocationOnOutlinedIcon />}
              colorClass="text-red"
              fontSizeClass="icon-medium"
            />
            {address}
          </p>
        </div>
        <div class="rfow-restaurant-image">
          <img src={picture} alt="restaurant" />
        </div>
      </div>
      <div class="rfow-restaurant-details u-line">
        <div class="rfow-details price-time">
          <span class="text-light-black">{"DELIVERY HOURS"}</span>
          <span class="text-light-black">{deliveryHours}</span>
        </div>
        <div class="rfow-details minimum-order">
          <span class="text-light-black">{"MINIMUM ORDER"}</span>
          <span class="text-light-black">Rs. {minimumOrder}</span>
        </div>
        <div class="rfow-details discount-rate">
          <span class="text-light-black">{"DISCOUNT"}</span>
          <span class="text-light-black">{discount} % </span>
        </div>
        <div class="rfow-details service-charge">
          <span class="text-light-black">{"SERVICE CHARGE"}</span>
          <span class="text-light-black">{additionalCharges} % </span>
        </div>
        <div class="rfow-details additional-vat">
          <span class="text-light-black">{"ADDITIONAL VAT"}</span>
          <span class="text-light-black">{vat} % </span>
        </div>
      </div>
      <div class="rfow-restaurant-description u-line">
        <div class="rating">
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
        <div class="restaurant-tag">
          <h3 class="text-light-white">{description}</h3>
        </div>
      </div>

      <div class="restaurant-tabs u-line">
        <div class="restaurant-menu-tab">
          <a class="nav-link text-light-white fw-700" href="#about">
            Menu
          </a>
          <a class="nav-link text-light-white fw-700" href="#about">
            About
          </a>
          <a class="nav-link text-light-white fw-700" href="#review">
            Reviews
          </a>
          <a class="nav-link text-light-white fw-700" href="#mapgallery">
            Map &amp; Gallery
          </a>
        </div>
        <div class="add-wishlist">
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
