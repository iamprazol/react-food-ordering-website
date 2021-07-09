import React from "react";
import RestaurantList from "../restaurantList/RestaurantList";

function SearchRestaurantPage(props) {
  const { searchText } = props;

  return <RestaurantList searchText={searchText} />;
}

export default SearchRestaurantPage;
