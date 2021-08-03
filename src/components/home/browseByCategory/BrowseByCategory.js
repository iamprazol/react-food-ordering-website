// Import Libraries.
import React, { Component } from "react";

// Import SCSS.
import "./BrowseByCategory.scss";

// Import Components.
import BrowseByCategoryNav from "./BrowseByCategoryNav";

class BrowseByCategory extends Component {
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
    const { REACT_APP_API_URL } = process.env;

    fetch(`${REACT_APP_API_URL}/foods`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        let foodsArray = this.shuffle(data.data),
          foodsByCategory = foodsArray.slice(0, 8).map((food) => {
            return (
              <BrowseByCategoryNav
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
    return (
      <section className="rfow-browse section-padding">
        <div className="rfow-browse__body rfow-container">
          <h3 className="rfow-browse--title">
            Browse By Categories
            <span className="text-sm">
              <a className="text-red" href="/foods">
                {" "}
                View all foods{" "}
              </a>
            </span>
          </h3>
          <nav className="slidemenu">{this.state.foodsByCategory}</nav>
        </div>
      </section>
    );
  }
}

export default BrowseByCategory;
