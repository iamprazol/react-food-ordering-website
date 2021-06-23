import React, { Component } from "react";
import Cards from "../../common/cards/Cards";
import "./RestaurantList.css";

class RestaurantList extends Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
    };
  }

  shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  componentDidMount() {
    fetch("http://foodzone.me/api/restaurant")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        let restaurantsArray = this.shuffle(data.data),
          restaurants = restaurantsArray.map((restaurant) => {
            return (
              <Cards
                id={restaurant.id}
                name={restaurant.restaurant_name}
                description={restaurant.description}
                image={
                  "http://foodzone.me/images/restaurant/" + restaurant.picture
                }
                address={restaurant.address}
                delivery_hours={restaurant.delivery_hours}
                minimum_order={restaurant.minimum_order}
                discount={restaurant.discount}
              />
            );
          });
        this.setState({ restaurants: restaurants });
      });
  }

  render() {
    return (
      <section class="rfb-nav-container section-padding rbf-bottom-line">
        <h3 class="rbf-title">Browse By Restaurants</h3>
        <div className="row">{this.state.restaurants}</div>
      </section>
    );
  }
}

export default RestaurantList;
