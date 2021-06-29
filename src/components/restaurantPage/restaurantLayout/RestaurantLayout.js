import React, { Component } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../common/navBar/NavBar";
import Banner from "../../common/banner/Banner";
import FooterTop from "../../common/footer/footerTop/FooterTop";
import FooterBottom from "../../common/footer/footerBottom/FooterBottom";
import RestaurantDetails from "../restaurantDetails/RestaurantDetails";

class RestaurantLayout extends Component {
  constructor() {
    super();
    this.state = {
      restaurantDetails: [],
    };
  }

  componentDidMount() {
    fetch(
      `http://wptest.me/api/restaurant/${this.props.match.params.restaurantId}`
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
      <div className="container-fluid">
        <NavBar />
        <Banner
          bannerImage="http://wptest.me/images/food/1624721580.jpeg"
          bannerHeight="medium"
        />
        {this.state.restaurantDetails}
        <FooterTop />
        <FooterBottom />
      </div>
    );
  }
}

export default RestaurantLayout;
