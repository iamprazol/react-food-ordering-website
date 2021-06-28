import React from "react";
import "./RestaurantDetails.css";
import IconContainer from "../../common/iconContainer/IconContainer";
import StarBorderIcon from "@material-ui/icons/Star";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

function RestaurantDetails() {
  return (
    <section class="rfb-restaurant-details-container">
      <h1 class="fw-700">Bajeko Sekuwa</h1>
      <div class="rfb-restaurant-address u-line">
        <p class="text-light-dark">{"4508 Fort Hamilton Pkwy "}</p>
      </div>
      <div class="rfb-restaurant-details u-line">
        <div class="rfb-details price-time">
          <span class="text-light-black">{"DELIVERY HOURS"}</span>
          <span class="text-light-black">{"1pm to 80pm"}</span>
        </div>
        <div class="rfb-details minimum-order">
          <span class="text-light-black">{"MINIMUM ORDER"}</span>
          <span class="text-light-black">Rs. {"500"}</span>
        </div>
        <div class="rfb-details discount-rate">
          <span class="text-light-black">{"DISCOUNT"}</span>
          <span class="text-light-black">Rs. {"500"}</span>
        </div>
        <div class="rfb-details service-charge">
          <span class="text-light-black">{"SERVICE CHARGE"}</span>
          <span class="text-light-black">Rs. {"500"}</span>
        </div>
        <div class="rfb-details additional-vat">
          <span class="text-light-black">{"ADDITIONAL VAT"}</span>
          <span class="text-light-black">Rs. {"500"}</span>
        </div>
      </div>
      <div class="rfb-restaurant-description u-line">
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
          <h3 class="text-light-white">
            {"Famous for momos and chicken items"}
          </h3>
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
