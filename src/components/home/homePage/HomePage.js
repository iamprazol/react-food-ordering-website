import React from "react";
import BrowseByCategory from "../browseByCategory/BrowseByCategory";
import RestaurantList from "../restaurantList/RestaurantList";
import FooterTop from "../../common/footer/footerTop/FooterTop";
import FooterBottom from "../../common/footer/footerBottom/FooterBottom";
import Navbar from "../../common/navBar/NavBar";

const HomePage = () => {
  return (
    <div className="container-fluid">
      <Navbar />
      <BrowseByCategory />
      <RestaurantList />
      <FooterTop />
      <FooterBottom />
    </div>
  );
};

export default HomePage;
