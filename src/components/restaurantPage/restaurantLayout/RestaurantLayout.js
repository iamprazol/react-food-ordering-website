// Import Libraries.
import React, { Component } from "react";

// Import SCSS.
import "./RestaurantLayout.scss";

// Import Components.
import NavBar from "../../common/navBar/NavBar";
import Banner from "../../common/banner/Banner";
import FooterTop from "../../common/footer/footerTop/FooterTop";
import FooterBottom from "../../common/footer/footerBottom/FooterBottom";
import RestaurantDetails from "../restaurantDetails/RestaurantDetails";
import MenuLayout from "../menuLayout/MenuLayout";

class RestaurantLayout extends Component {
  constructor() {
    super();
    this.state = {
      restaurantDetails: [],
    };
  }

  componentDidMount() {
    const { REACT_APP_API_URL } = process.env;

    fetch(
      `${REACT_APP_API_URL}/restaurant/${this.props.match.params.restaurantId}`
    )
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        let restaurantDetails = data.data.map((restaurant) => {
          return (
            <RestaurantDetails
              restaurantId={restaurant.id}
              name={restaurant.restaurant_name}
              description={restaurant.description}
              deliveryHours={restaurant.delivery_hours}
              minimumOrder={restaurant.minimum_order}
              coverPic={restaurant.cover_pic}
              picture={
                "http://wptest.me/images/restaurant/" + restaurant.picture
              }
              address={restaurant.address}
              vat={restaurant.vat}
              discount={restaurant.discount}
              additionalCharges={restaurant.additional_charges}
            />
          );
        });
        this.setState({ restaurantDetails: restaurantDetails });
      });
  }

  render() {
    return (
      <div className="rfow-wrapper">
        <NavBar />
        <Banner
          bannerImage="http://wptest.me/images/food/1624721580.jpeg"
          bannerHeight="medium"
        />
        {this.state.restaurantDetails}
        <MenuLayout restaurantId={this.props.match.params.restaurantId} />
        <FooterTop />
        <FooterBottom />
      </div>
    );
  }
}

export default RestaurantLayout;
