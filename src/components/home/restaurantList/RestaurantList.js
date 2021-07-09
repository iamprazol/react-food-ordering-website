import React, { Component } from "react";
import Cards from "../../common/cards/Cards";
import "./RestaurantList.css";

class RestaurantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      message: "",
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
    const { REACT_APP_API_URL } = process.env;
    const searchText = this.props.searchText ? this.props.searchText : "";

    fetch(REACT_APP_API_URL + `/restaurants?name=${searchText}`)
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
                  "http://wptest.me/images/restaurant/" + restaurant.picture
                }
                address={restaurant.address}
                delivery_hours={restaurant.delivery_hours}
                minimum_order={restaurant.minimum_order}
                discount={restaurant.discount}
              />
            );
          });
        this.setState({ message: data.message });
        this.setState({ restaurants: restaurants });
      });
  }

  render() {
    return (
      <section className="rfow-nav-container section-padding">
        <h3 className="rfow-title">
          {this.props.searchText ? this.state.message : "Browse By Restaurants"}
        </h3>
        <div className="row">{this.state.restaurants}</div>
      </section>
    );
  }
}

export default RestaurantList;
