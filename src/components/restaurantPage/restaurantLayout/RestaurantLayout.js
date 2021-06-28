import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../common/navBar/NavBar";
import Banner from "../../common/banner/Banner";
import FooterTop from "../../common/footer/footerTop/FooterTop";
import FooterBottom from "../../common/footer/footerBottom/FooterBottom";
import RestaurantDetails from "../restaurantDetails/RestaurantDetails";

function RestaurantLayout() {
  let { restaurantId } = useParams();

  return (
    <div className="container-fluid">
      <NavBar />
      <Banner
        bannerImage="http://wptest.me/images/food/1624721580.jpeg"
        bannerHeight="medium"
      />
      <RestaurantDetails />
      <FooterTop />
      <FooterBottom />
    </div>
  );
}

export default RestaurantLayout;
