import React, { useState, useEffect } from "react";
import Cards from "../../common/cards/Cards";
import "./RestaurantList.css";

const RestaurantList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [message, setMessage] = useState("");
  const { searchText } = props;
  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  useEffect(() => {
    const { REACT_APP_API_URL } = process.env;
    const searchParams = searchText ? `name=${searchText}` : "";

    fetch(REACT_APP_API_URL + `/restaurants?${searchParams}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        let restaurantsArray = shuffle(data.data),
          restaurants = restaurantsArray.map((restaurant) => {
            return (
              <Cards
                id={restaurant.id}
                name={restaurant.restaurant_name}
                description={restaurant.description}
                image={
                  "http://wptest.me/images/restaurant/" + restaurant.picture
                }
                address={restaurant.address}
                delivery_hours={restaurant.delivery_hours}
                minimum_order={restaurant.minimum_order}
                discount={restaurant.discount}
              />
            );
          });
        setMessage(data.message);
        setRestaurants(restaurants);
      });
  }, [searchText]);

  return (
    <section className="rfow-nav-container section-padding">
      <h3 className="rfow-title">
        {searchText ? message : "Browse By Restaurants"}
      </h3>
      <div className="row">{restaurants}</div>
    </section>
  );
};

export default RestaurantList;
