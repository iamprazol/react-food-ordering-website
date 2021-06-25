import React from "react";
import BrowseByCategory from "../browseByCategory/BrowseByCategory";
import RestaurantList from "../restaurantList/RestaurantList";
import FooterTop from "../../common/footer/footerTop/FooterTop";

const HomePage = () => {
  return (
    <div className="container-fluid">
      <BrowseByCategory />
      <RestaurantList />
      <FooterTop />
    </div>
  );
};

export default HomePage;
