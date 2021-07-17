import React, { useState } from "react";
import NavBar from "../common/navBar/NavBar";
import LoginPage from "../authentication/loginPage/LoginPage";
import Popup from "../common/popup/Popup";
import RegistrationPage from "../authentication/registrationPage/RegistrationPage";
import SearchRestaurantPage from "../home/searchRestaurantPage/SearchRestaurantPage";
import FooterTop from "../common/footer/footerTop/FooterTop";
import FooterBottom from "../common/footer/footerBottom/FooterBottom";
import HungryImage from "../../assets/images/hungry.png";
import "./PageNotFound.css";

const PageNotFound = () => {
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [openRegistrationPopup, setOpenRegistrationPopup] = useState(false);
  const [searchRestaurants, setSearchRestaurants] = useState("");

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
    <div className="container-fluid">
      <NavBar
        onClick={handleOpenAuthenticationPopup}
        onKeyPress={handleSearchRestaurants}
      />
      {openLoginPopup ? (
        <Popup onClick={""} popupClass="wd-50 br-25" content={<LoginPage />} />
      ) : (
        ""
      )}
      {openRegistrationPopup ? (
        <Popup
          onClick={""}
          popupClass="wd-50 br-25"
          content={<RegistrationPage />}
        />
      ) : (
        ""
      )}
      {searchRestaurants ? (
        <SearchRestaurantPage searchText={searchRestaurants} />
      ) : (
        <div className="rfow-page-not-found-container">
          <img src={HungryImage} alt="foodie" />
          <h1 className="text-red">OOPS! Page not found.</h1>
        </div>
      )}
      ;
      <FooterTop />
      <FooterBottom />
    </div>
  );
};

export default PageNotFound;
