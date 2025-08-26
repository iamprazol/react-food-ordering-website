import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import debounce from "lodash.debounce";

// Components
import FooterTop from "../../widgets/footer/footer-top/FooterTop";
import FooterBottom from "../../widgets/footer/footer-bottom/FooterBottom";
import NavBar from "../../widgets/navBar/NavBar";
import LoginPage from "../../features/auth/components/LoginPage";
import RegistrationPage from "../../features/auth/components/RegistrationPage";
import SearchRestaurantPage from "../../features/restaurants/components/restaurant-filters/search-restaurant/SearchRestaurantPage";
import { useApp } from "../../context/AppContext";
import Popup from "../../widgets/popup/Popup";

const TopLayout = ({ element }) => {
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [myOrders, setMyOrders] = useState([]);
  const [openRegistrationPopup, setOpenRegistrationPopup] = useState(false);
  const [searchRestaurants, setSearchRestaurants] = useState("");
  const { REACT_APP_URL, REACT_APP_API_URL } = process.env;
  const {
    state: { token },
    dispatch,
  } = useApp();

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/myorder`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "SET_ORDERS",
          payload: data.data,
        });
        setMyOrders(data.data);
      });
  }, []);

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

  const debounceSearch = useCallback(
    debounce((value) => {
      setSearchRestaurants(value);
    }, 500),
    []
  );
  const handleSearchRestaurants = (e) => {
    debounceSearch(e.target.value);
  };

  return (
    <Flex direction="column" minH="100vh" bg="gray.50">
      <NavBar
        onClick={handleOpenAuthenticationPopup}
        onChange={handleSearchRestaurants}
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
        <Flex direction={"column"} justifyContent={"left"}>
          {element}
        </Flex>
      )}

      <Box mt="auto" bg="gray.100" pt={10}>
        <FooterTop />
        <FooterBottom />
      </Box>
    </Flex>
  );
};

export default TopLayout;
