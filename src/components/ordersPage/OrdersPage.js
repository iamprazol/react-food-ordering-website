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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Progress,
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
import EmptyCartImage from "../../assets/images/cart-empty.png";
// Import Icons.
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";

// Import Components.
import IconContainer from "../common/iconContainer/IconContainer";
import OrdersTab from "./ordersTab/allOrdersTab";

const OrdersPage = () => {
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [restaurantCharge, setRestaurantCharge] = useState({});
  const [myOrders, setMyOrders] = useState([]);
  const [openRegistrationPopup, setOpenRegistrationPopup] = useState(false);
  const [searchRestaurants, setSearchRestaurants] = useState("");
  const { REACT_APP_URL, REACT_APP_API_URL } = process.env;
  const { token } = useAuth();
  const { cartItems } = useCart();

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/myorder`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
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

  const handleSearchRestaurants = (e) => {
    if (e.key === "Enter") {
      setSearchRestaurants(e.target.value);
    }
  };

  const formatDate = (deliveryDate, deliveryTime) => {
    const dateTimeStr = `${deliveryDate.replace(
      /(\d{2})\/(\d{2})\/(\d{4})/,
      "$2/$1/$3"
    )} ${deliveryTime}`;

    const parsedDate = new Date(dateTimeStr);

    const oneHourAgo = new Date(parsedDate.getTime() - 60 * 60 * 1000);

    const day = oneHourAgo.getDate();
    const month = oneHourAgo.toLocaleString("default", { month: "long" });
    const year = oneHourAgo.getFullYear();
    const hours = oneHourAgo.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"],
        v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return `${getOrdinal(day)} ${month}, ${year} at ${hours}`;
  };

  const parseOrderedItems = (order) => {
    const orderDetails = JSON.parse(order.details);
    let detail = "";

    orderDetails.map((item, idx) => {
      detail += item.quantity + "x " + item.food_name;

      if (idx !== orderDetails.length - 1) {
        detail += ", ";
      }
    });
    return detail;
  };

  console.log(myOrders);

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
            borderTop="1px solid #E7E7E7"
          >
            <Box px={{ base: 2, md: 8 }} paddingTop={{ base: 4, md: 12 }}>
              <Heading
                fontSize={{ base: "20px", md: "30px", lg: "40px" }}
                mb={4}
                fontWeight="400"
                lineHeight="1.2"
                color={"#4a4a4a"}
              >
                My Orders
              </Heading>
              <Text fontSize={"16px"} color="#666">
                Track your food orders and reorder your favorites
              </Text>
            </Box>
          </Box>
          <Box as="section" py={10} px={{ base: 4, md: 8 }} bg="#f7f7f9">
            <Box maxW="7xl" mx="auto" px={14} py={4}>
              <Tabs variant="unstyled" justifyContent={"space-between"}>
                <TabList>
                  <Tab
                    _selected={{ color: "white", bg: "brand.400" }}
                    width="100%"
                    fontSize={"14px"}
                    fontWeight={"500"}
                    p="15px 20px"
                    borderTopLeftRadius={"4px"}
                    borderBottomLeftRadius={"4px"}
                    bgColor={"white"}
                    boxShadow={"md"}
                  >
                    All Orders
                  </Tab>
                  <Tab
                    _selected={{ color: "white", bg: "brand.400" }}
                    width="100%"
                    fontSize={"14px"}
                    fontWeight={"500"}
                    p="15px 20px"
                    bgColor={"white"}
                    boxShadow={"md"}
                  >
                    Active
                  </Tab>
                  <Tab
                    _selected={{ color: "white", bg: "brand.400" }}
                    width="100%"
                    fontSize={"14px"}
                    fontWeight={"500"}
                    p="15px 20px"
                    bgColor={"white"}
                    boxShadow={"md"}
                  >
                    Delivered
                  </Tab>
                  <Tab
                    _selected={{ color: "white", bg: "brand.400" }}
                    width="100%"
                    fontSize={"14px"}
                    fontWeight={"500"}
                    p="15px 20px"
                    bgColor={"white"}
                    boxShadow={"md"}
                  >
                    Cancelled
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel p="20px 0px">
                    <OrdersTab myOrders={myOrders} />
                  </TabPanel>
                  <TabPanel p="20px 0px">
                    <OrdersTab
                      myOrders={myOrders.filter(
                        (order) => order.delivered === 0
                      )}
                    />
                  </TabPanel>
                  <TabPanel p="20px 0px">
                    <OrdersTab
                      myOrders={myOrders.filter(
                        (order) => order.delivered === 1
                      )}
                    />
                  </TabPanel>
                  <TabPanel p="20px 0px">
                    <OrdersTab
                      myOrders={myOrders.filter(
                        (order) => order.delivered === -1
                      )}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default OrdersPage;
