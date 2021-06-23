import React from "react";
import BrowseByCategory from "../browseByCategory/BrowseByCategory";
import RestaurantList from "../restaurantList/RestaurantList";

const HomePage = () => {
  return (
    <div className="container-fluid">
      <BrowseByCategory />
      <RestaurantList />
    </div>
  );
};

export default HomePage;
