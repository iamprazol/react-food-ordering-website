// Import Libraries.
import React, { useState } from "react";
import { connect } from "react-redux";

// Import SCSS
import "./HomePage.scss";

// Import redux fields.
import { alertActions } from "../../../redux/actions";

// Import Components.
import BrowseByCategory from "../browseByCategory/BrowseByCategory";
import RestaurantList from "../restaurantList/RestaurantList";
import FooterTop from "../../common/footer/footerTop/FooterTop";
import FooterBottom from "../../common/footer/footerBottom/FooterBottom";
import NavBar from "../../common/navBar/NavBar";
import Banner from "../../common/banner/Banner";
import Ads from "../../common/ads/Ads";
import LoginPage from "../../authentication/loginPage/LoginPage";
import Popup from "../../common/popup/Popup";
import RegistrationPage from "../../authentication/registrationPage/RegistrationPage";
import SearchRestaurantPage from "../searchRestaurantPage/SearchRestaurantPage";
import Button from "../../common/button/Button";
import Toast from "../../common/toast/Toast";

const ConnectedHome = (props) => {
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [openRegistrationPopup, setOpenRegistrationPopup] = useState(false);
  const [searchRestaurants, setSearchRestaurants] = useState("");
  const { alert } = props;

  const handleOpenAuthenticationPopup = (clickAction, value) => {
    if ("login" === clickAction) {
      setOpenLoginPopup(!openLoginPopup);
    } else if ("register" === clickAction) {
      setOpenRegistrationPopup(!openRegistrationPopup);
    } else {
      setSearchRestaurants(value);
    }
  };

  const handleSearchRestaurants = (e) => {
    if (e.key === "Enter") {
      var searchText = e.target.value;
      setSearchRestaurants(searchText);
    }
  };

  return (
    <div className="rfow-wrapper">
      <NavBar
        onClick={handleOpenAuthenticationPopup}
        onKeyPress={handleSearchRestaurants}
      />
      {Object.keys(alert).length > 0 ? (
        <Toast
          title={alert.message.title}
          type={alert.message.type}
          message={alert.message.description}
        />
      ) : (
        ""
      )}
      {openLoginPopup ? (
        <Popup
          onClick={(value) => setOpenLoginPopup(!value)}
          popupClass="wd-50 br-25"
          content={<LoginPage />}
        />
      ) : (
        ""
      )}
      {openRegistrationPopup ? (
        <Popup
          onClick={(value) => setOpenLoginPopup(!value)}
          popupClass="wd-50 br-25"
          content={<RegistrationPage />}
        />
      ) : (
        ""
      )}
      {searchRestaurants ? (
        <SearchRestaurantPage searchText={searchRestaurants} />
      ) : (
        <>
          <Banner
            bannerImage="http://wptest.me/images/food/1624721452.jpg"
            bannerHeight="large"
            bannerContent={
              <div className="rfow-banner--text">
                <h1>Order your favourite food from anywhere</h1>
                <h3>with the largest food ordering platform all over Nepal</h3>
                <Button
                  buttonClass="btn-submit btn-primary"
                  buttonHref="http://themegrill.me:41239/restaurants"
                  text={"Order Now"}
                />
              </div>
            }
          />
          <BrowseByCategory />
          <Ads
            adsText={"Get free delivery with Rs.5000"}
            image="http://wptest.me/images/food/1624721452.jpg"
            link="google.com"
            buttonText="Learn More"
          />
          <RestaurantList />
          <Ads
            adsText={"Get free delivery with Rs.5000"}
            image="http://wptest.me/images/food/1624721452.jpg"
            link="google.com"
            buttonText="Learn More"
          />
        </>
      )}
      <div className="rfow-footer">
        <FooterTop />
        <FooterBottom />
      </div>
    </div>
  );
};

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear,
};
const HomePage = connect(mapState, actionCreators)(ConnectedHome);
export default HomePage;
