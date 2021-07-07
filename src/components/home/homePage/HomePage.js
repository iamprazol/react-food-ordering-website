import React, { useState } from "react";
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

const HomePage = () => {
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [openRegistrationPopup, setOpenRegistrationPopup] = useState(false);

  const handleOpenAuthenticationPopup = (popupType) => {
    if ("login" === popupType) {
      setOpenLoginPopup(!openLoginPopup);
    } else {
      setOpenRegistrationPopup(!openRegistrationPopup);
    }
  };

  return (
    <div className="container-fluid">
      <NavBar onClick={handleOpenAuthenticationPopup} />
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
      <Banner
        bannerImage="http://wptest.me/images/food/1624721452.jpg"
        bannerHeight="large"
        bannerLargeText="Order your favourite food from anywhere"
        bannerSmallText="with the largest food ordering platform all over Nepal"
        button={true}
        buttonClass="btn-submit btn-primary"
        buttonHref="http://themegrill.me:41239/restaurants"
        buttonText="Order Now"
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
      <FooterTop />
      <FooterBottom />
    </div>
  );
};

export default HomePage;
