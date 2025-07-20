import React, { useState } from "react";
import { Box, Image, Heading, Center, useDisclosure } from "@chakra-ui/react";

import NavBar from "../common/navBar/NavBar";
import LoginPage from "../authentication/loginPage/LoginPage";
import Popup from "../common/popup/Popup";
import RegistrationPage from "../authentication/registrationPage/RegistrationPage";
import SearchRestaurantPage from "../home/searchRestaurantPage/SearchRestaurantPage";
import FooterTop from "../common/footer/footerTop/FooterTop";
import FooterBottom from "../common/footer/footerBottom/FooterBottom";

import HungryImage from "../../assets/images/hungry.png";

const PageNotFound = () => {
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [openRegistrationPopup, setOpenRegistrationPopup] = useState(false);
  const [searchRestaurants, setSearchRestaurants] = useState("");

  const handleOpenAuthenticationPopup = (clickAction, value) => {
    if (clickAction === "login") {
      setOpenLoginPopup(!openLoginPopup);
    } else if (clickAction === "register") {
      setOpenRegistrationPopup(!openRegistrationPopup);
    } else {
      setSearchRestaurants(value);
    }
  };

  const handleSearchRestaurants = (e) => {
    if (e.key === "Enter") {
      setSearchRestaurants(e.target.value);
    }
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavBar
        onClick={handleOpenAuthenticationPopup}
        onKeyPress={handleSearchRestaurants}
      />

      {openLoginPopup && (
        <Popup
          onClick={() => setOpenLoginPopup(false)}
          popupClass="wd-50 br-25" // You may want to convert these to Chakra styles too
          content={<LoginPage />}
        />
      )}

      {openRegistrationPopup && (
        <Popup
          onClick={() => setOpenRegistrationPopup(false)}
          popupClass="wd-50 br-25"
          content={<RegistrationPage />}
        />
      )}

      {searchRestaurants ? (
        <SearchRestaurantPage searchText={searchRestaurants} />
      ) : (
        <Center flex="1" flexDirection="column" p={8}>
          <Image
            src={HungryImage}
            alt="foodie"
            maxW="300px"
            mb={6}
            objectFit="contain"
          />
          <Heading color="red.500" size="2xl">
            OOPS! Page not found.
          </Heading>
        </Center>
      )}

      <FooterTop />
      <FooterBottom />
    </Box>
  );
};

export default PageNotFound;
