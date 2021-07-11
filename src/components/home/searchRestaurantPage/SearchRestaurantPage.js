import React from "react";
import RestaurantList from "../restaurantList/RestaurantList";
import Banner from "../../common/banner/Banner";
import IconContainer from "../../common/iconContainer/IconContainer";
import "./searchRestaurantPage.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

function SearchRestaurantPage(props) {
  const { searchText } = props;

  return (
    <div className="rfow-search-result-page">
      <Banner
        bannerHeight="small"
        bannerContent={
          <div className="rfow-banner-text">
            <h3 class="text-black-white">Restaurants and Stores </h3>
          </div>
        }
      />
      <div class="rfow-search-result-nav">
        <span className="text-black-white">
          {"Home "}
          <IconContainer
            icon={<ArrowForwardIosIcon />}
            fontSizeClass="icon-small"
          />
          {" Search"}
          <IconContainer
            icon={<ArrowForwardIosIcon />}
            fontSizeClass="icon-small"
          />
          {" Restaurants Found"}
        </span>
      </div>
      <div className="rfow-search-result-wrapper">
        <div class="rfow-search-result-filter-nav">
          <div class="rfow-search-result-filter-tab">
            <h1>TAB</h1>
          </div>
          <div class="rfow-search-result-filter-params">
            <h2>Params</h2>
          </div>
        </div>
        <div className="rfow-search-result">
          <RestaurantList searchText={searchText} />
        </div>
      </div>
    </div>
  );
}

export default SearchRestaurantPage;
