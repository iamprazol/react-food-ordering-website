import React, { Component } from "react";
import NavBar from "./NavBar";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      foodsByCategory: [],
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
    fetch("http://foodzone.me/api/foods")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        let foodsArray = this.shuffle(data.data),
          foodsByCategory = foodsArray.slice(0, 8).map((food) => {
            return (
              <NavBar
                id={"slide-item-" + food.id}
                category_id={food.category_id}
                image={food.picture}
                restaurant_id={food.restaurant_id}
                title={food.food_name}
              />
            );
          });
        this.setState({ foodsByCategory: foodsByCategory });
      });
  }

  render() {
    return <nav className="slidemenu">{this.state.foodsByCategory}</nav>;
  }
}

export default Header;
