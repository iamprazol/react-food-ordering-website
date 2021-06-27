import React from "react";
import BrowseByCategory from "../browseByCategory/BrowseByCategory";
import RestaurantList from "../restaurantList/RestaurantList";
import FooterTop from "../../common/footer/footerTop/FooterTop";
import FooterBottom from "../../common/footer/footerBottom/FooterBottom";
import Navbar from "../../common/navBar/NavBar";
import Banner from "../../common/banner/Banner";
import Ads
 from "../../common/ads/Ads";
const HomePage = () => {
  return (
    <div className="container-fluid">
      <Navbar />
      <Banner />
      <BrowseByCategory />
      <Ads adsText={"Get free delivery with Rs.5000"} image="http://wptest.me/images/food/1624721452.jpg" link="google.com" buttonText="Learn More"/>
      <RestaurantList />
      <Ads adsText={"Get free delivery with Rs.5000"} image="http://wptest.me/images/food/1624721452.jpg" link="google.com" buttonText="Learn More"/>
      <FooterTop />
      <FooterBottom />
    </div>
  );
};

export default HomePage;
