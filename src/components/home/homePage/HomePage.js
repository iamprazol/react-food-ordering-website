import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Stack,
  Button as ChakraButton,
} from "@chakra-ui/react";

// Components
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
import Toast from "../../common/toast/Toast";

const HomePage = () => {
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [openRegistrationPopup, setOpenRegistrationPopup] = useState(false);
  const [searchRestaurants, setSearchRestaurants] = useState("");
  const { REACT_APP_URL } = process.env;

  const handleOpenAuthenticationPopup = (clickAction, value) => {
    if (clickAction === "login") {
      setOpenLoginPopup(!openLoginPopup);
      setOpenRegistrationPopup(false);
    } else if (clickAction === "register") {
      setOpenRegistrationPopup(!openRegistrationPopup);
      setOpenLoginPopup(false);
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
    <Flex direction="column" minH="100vh" bg="gray.50">
      <NavBar
        onClick={handleOpenAuthenticationPopup}
        onKeyPress={handleSearchRestaurants}
      />
      {openLoginPopup && (
        <Popup
          onClick={(value) => setOpenLoginPopup(!value)}
          content={<LoginPage onClick={handleOpenAuthenticationPopup} />}
        />
      )}

      {openRegistrationPopup && (
        <Popup
          onClick={(value) => setOpenRegistrationPopup(!value)}
          popupClass="wd-50 br-25"
          content={<RegistrationPage />}
        />
      )}

      {searchRestaurants ? (
        <SearchRestaurantPage searchText={searchRestaurants} />
      ) : (
        <>
          {/* Banner Section */}
          <Banner
            bannerImage={REACT_APP_URL + "images/food/1624721452.jpg"}
            bannerHeight="large"
            bannerContent={
              <Box
                textAlign={{ base: "center", md: "left" }}
                px={{ base: 4, md: 16 }}
                py={{ base: 8, md: 24 }}
                transform="translateY(0)"
              >
                <Heading
                  fontSize={{ base: "40px", md: "50px", lg: "60px" }}
                  mb={4}
                  fontWeight="600"
                  lineHeight="1.2"
                  width="70%"
                >
                  Order your favourite food from anywhere
                </Heading>
                <Text
                  fontSize={{ base: "24px", md: "28px" }}
                  mb={6}
                  fontWeight="400"
                >
                  with the largest food ordering platform all over Nepal
                </Text>
                <ChakraButton
                  colorScheme="blue"
                  ml={4}
                  px={8}
                  bgColor="brand.500"
                  borderColor="brand.500"
                  _hover={{ bgColor: "brand.600" }}
                  buttonHref="http://themegrill.me:41239/restaurants"
                >
                  {"Order Now"}
                </ChakraButton>
              </Box>
            }
          />

          <BrowseByCategory />

          <Ads
            adsText={"Get free delivery with Rs.5000"}
            image={REACT_APP_URL + "images/food/1624721452.jpg"}
            link="google.com"
            buttonText="Learn More"
          />

          <RestaurantList />

          <Ads
            adsText={"Get free delivery with Rs.5000"}
            image={REACT_APP_URL + "images/food/1624721452.jpg"}
            link="google.com"
            buttonText="Learn More"
          />
        </>
      )}

      <Box mt="auto" bg="gray.100" pt={10}>
        <FooterTop />
        <FooterBottom />
      </Box>
    </Flex>
  );
};

export default HomePage;
