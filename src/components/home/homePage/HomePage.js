import React from "react";
import BrowseByCategory from "../browseByCategory/BrowseByCategory";
import RestaurantList from "../restaurantList/RestaurantList";
import FooterTop from "../../common/footer/footerTop/FooterTop";
import FooterBottom from "../../common/footer/footerBottom/FooterBottom";

const HomePage = () => {
  return (
    <div className="container-fluid">
      <BrowseByCategory />
      <RestaurantList />
      <FooterTop />
      <FooterBottom />
    </div>
  );
};

export default HomePage;
