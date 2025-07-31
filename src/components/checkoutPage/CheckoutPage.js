import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Button as ChakraButton,
  Heading,
  Link,
  Text,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";

// Components
import FooterTop from "../common/footer/footerTop/FooterTop";
import FooterBottom from "../common/footer/footerBottom/FooterBottom";
import NavBar from "../common/navBar/NavBar";
import LoginPage from "../authentication/loginPage/LoginPage";
import Popup from "../common/popup/Popup";
import RegistrationPage from "../authentication/registrationPage/RegistrationPage";
import SearchRestaurantPage from "../home/searchRestaurantPage/SearchRestaurantPage";
import { useAuth } from "../../context/auth-context";
import Cart from "../common/cart/cart";
import { useCart } from "../../hooks/useCart/useCart";

const CheckoutPage = () => {
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [restaurantCharge, setRestaurantCharge] = useState({});
  const [userAddress, setUserAddress] = useState("");
  const [openRegistrationPopup, setOpenRegistrationPopup] = useState(false);
  const [searchRestaurants, setSearchRestaurants] = useState("");
  const { REACT_APP_URL } = process.env;
  const { token } = useAuth();
  const { cartItems } = useCart();

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

  useEffect(() => {
    const { REACT_APP_API_URL } = process.env;
    fetch(`${process.env.REACT_APP_API_URL}/myaddress`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserAddress(data.data);
      });
  }, []);

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
        <Flex direction={"column"} justifyContent={"left"}>
          <Box
            as="section"
            px={{ base: 20, md: 40 }}
            bg="gray.50"
            textAlign="left"
            borderBottom="1px solid #E7E7E7"
            borderTop="1px solid #E7E7E7"
            bgColor={"#FAFAFA"}
          >
            <Box px={{ base: 2, md: 8 }} paddingTop={{ base: 4, md: 12 }}>
              <Heading
                fontSize={{ base: "20px", md: "30px", lg: "40px" }}
                mb={4}
                fontWeight="400"
                lineHeight="1.2"
                color={"#4a4a4a"}
              >
                Checkout
              </Heading>
            </Box>
          </Box>
          <Box as="section" py={10} px={{ base: 4, md: 8 }} bg="#f7f7f9">
            <Box
              maxW="6xl"
              mx="auto"
              px={14}
              py={4}
              border={"1px solid #E7E7E7"}
            >
              <Heading
                fontSize="20px"
                color={"#2d2c2c"}
                fontWeight={600}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                ORDER DETAILS
              </Heading>
            </Box>
            <Box
              maxW="6xl"
              mx="auto"
              px={14}
              py={4}
              border={"1px solid #E7E7E7"}
              borderTop={"none"}
              fontWeight={"500"}
              bgColor="white"
            >
              <Flex>
                <Flex
                  justifyContent={"center"}
                  gap={5}
                  direction={"column"}
                  flex={"0 0 60%"}
                >
                  <Flex justifyContent={"center"} gap={5} direction={"column"}>
                    <Text fontSize="16px">DELIVERY ADDRESS</Text>
                    <Flex spacing={6} mb={8}>
                      {userAddress.length > 0
                        ? userAddress.map((address, idx) => (
                            <Box
                              bgColor={"#FAFAFA"}
                              border="1px solid #E7E7E7"
                              p={8}
                              color={"#4A4A4A"}
                              fontWeight={"400"}
                              fontSize={"0.875rem"}
                              width="90%"
                            >
                              <Text>{address.address_title.toUpperCase()}</Text>
                              <Text>{address.full_name}</Text>
                              <Text>{address.address_details}</Text>
                              <Text>Phone: {address.address_contact}</Text>
                              <Text>
                                Alternate Phone:{" "}
                                {address.address_alternate_contact}
                              </Text>
                            </Box>
                          ))
                        : "hello"}
                    </Flex>
                  </Flex>
                  <Flex justifyContent={"center"} gap={5} direction={"column"}>
                    <Text fontSize="16px"> YOUR ORDER SETTINGS</Text>
                    <Flex spacing={6} mb={8}>
                      <Box
                        bgColor={"#FAFAFA"}
                        border="1px solid #E7E7E7"
                        p={8}
                        color={"#4A4A4A"}
                        fontWeight={"400"}
                        fontSize={"0.875rem"}
                        width="90%"
                      >
                        <Text>Delivery Time: ASAP</Text>
                        <Text>Payment Option: Cash on Delivery</Text>
                      </Box>
                    </Flex>
                  </Flex>
                  <Flex justifyContent={"center"} gap={5} direction={"column"}>
                    <Text fontSize="16px"> SPECIAL INSTRUCTIONS</Text>
                    <Flex>
                      <Box
                        bgColor={"#FAFAFA"}
                        border="1px solid #E7E7E7"
                        p={8}
                        color={"#4A4A4A"}
                        fontWeight={"400"}
                        fontSize={"0.875rem"}
                        width="90%"
                      >
                        <Textarea
                          placeholder="Please mention if there are special instruction for the delivery person. (eg. Beware of Dogs)"
                          id={`order_special_instructions`}
                          fontSize="sm"
                          bgColor={"white"}
                        />
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>
                <Cart
                  position="relative"
                  restaurantCharge={restaurantCharge}
                  cartType="checkout"
                />
              </Flex>
            </Box>
          </Box>
        </Flex>
      )}

      <Box mt="auto" bg="gray.100" pt={10}>
        <FooterTop />
        <FooterBottom />
      </Box>
    </Flex>
  );
};

export default CheckoutPage;
