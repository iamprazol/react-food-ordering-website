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
import FooterTop from "../../common/footer/footerTop/FooterTop";
import FooterBottom from "../../common/footer/footerBottom/FooterBottom";
import NavBar from "../../common/navBar/NavBar";
import LoginPage from "../../authentication/loginPage/LoginPage";
import Popup from "../../common/popup/Popup";
import RegistrationPage from "../../authentication/registrationPage/RegistrationPage";
import SearchRestaurantPage from "../../home/searchRestaurantPage/SearchRestaurantPage";
import Cart from "../../common/cart/cart";
import { useCart } from "../../../hooks/useCart/useCart";
import EmptyCartImage from "../../../assets/images/cart-empty.png";
// Import Icons.
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";

// Import Components.

function OrdersTab({ myOrders }) {
  myOrders = myOrders.sort((a, b) => b.id - a.id);

  const formatDate = (createdAt) => {
    const kathmanduOptions = {
      timeZone: "Asia/Kathmandu",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    const date = new Date(createdAt.date); // createdAt.date is like "2025-08-02 09:40:03.000000"
    const formatter = new Intl.DateTimeFormat("en-US", kathmanduOptions);
    const parts = formatter.formatToParts(date);

    const getPart = (type) => parts.find((p) => p.type === type)?.value;

    const day = parseInt(getPart("day"));
    const month = getPart("month");
    const year = getPart("year");
    const hour = getPart("hour");
    const minute = getPart("minute");
    const dayPeriod = getPart("dayPeriod");

    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return `${getOrdinal(
      day
    )} ${month}, ${year} at ${hour}:${minute} ${dayPeriod}`;
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

  function getDeliveryProgress(deliveryTimeStr, deliveryDateStr) {
    const [hourStr, minuteStr] = deliveryTimeStr.split(":");

    const parseDDMMYYYY = (date) => {
      const [day, month, year] = date.split("/").map(Number);
      return new Date(year, month - 1, day);
    };

    const deliveryDate = parseDDMMYYYY(deliveryDateStr);
    const deliveryTime = new Date(deliveryDate);
    deliveryTime.setHours(parseInt(hourStr, 10), parseInt(minuteStr, 10), 0, 0);
    const now = new Date();

    if (now >= deliveryTime) {
      return 100;
    }

    const orderTime = new Date(deliveryTime.getTime() - 60 * 60 * 1000);

    const totalDuration = deliveryTime - orderTime;
    const elapsed = now - orderTime;

    const percent = Math.min((elapsed / totalDuration) * 100, 100);

    return percent.toFixed(2);
  }

  return (
    <Flex direction={"column"} gap={5}>
      {myOrders.length > 0 ? (
        myOrders.map((myOrder, idx) => {
          return (
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              bg="white"
              boxShadow="md"
              key={idx}
            >
              <Flex
                justifyContent={"space-between"}
                p="20px"
                borderBottom="1px solid #f0f0f0"
              >
                <Flex direction={"column"}>
                  <Heading
                    fontSize={"18px"}
                    fontWeight={"600"}
                    mb="5px"
                    color={"#333"}
                  >
                    {" "}
                    Order #{myOrder.id}
                  </Heading>
                  <Text color="#666" fontSize={"14px"}>
                    Placed on {formatDate(myOrder.created_at)}{" "}
                  </Text>
                </Flex>
                {myOrder.delivered === 0 ? (
                  <Badge
                    bgColor="#cce5ff"
                    color="#0066cc"
                    fontSize="12px"
                    fontWeight={"500"}
                    px={3}
                    py={1}
                    borderRadius="xl"
                    height="50%"
                  >
                    On The Way
                  </Badge>
                ) : myOrder.delivered === 1 ? (
                  <Badge
                    bgColor="#e8f5e8"
                    color="#2d7738"
                    fontSize="12px"
                    fontWeight={"500"}
                    px={3}
                    py={1}
                    borderRadius="xl"
                    height="50%"
                  >
                    Delivered
                  </Badge>
                ) : (
                  <Badge
                    bgColor="#f8d7da"
                    color="#721c24"
                    fontSize="12px"
                    fontWeight={"500"}
                    px={3}
                    py={1}
                    borderRadius="xl"
                    height="50%"
                  >
                    Cancelled
                  </Badge>
                )}
              </Flex>
              <Flex
                direction={"column"}
                className="order-content"
                p="20px"
                gap={5}
              >
                <Flex className="restaurant-info" gap="15px" align={"center"}>
                  <Box position="relative">
                    <Image
                      src={myOrder.restaurant_image}
                      alt={myOrder.restaurant_name}
                      objectFit="cover"
                      h="60px"
                      w="60px"
                      borderRadius="8px"
                    />
                  </Box>
                  <Flex direction="column">
                    <Text
                      fontSize={"16px"}
                      fontWeight={"600"}
                      color="#333"
                      marginBottom={"5px"}
                    >
                      {myOrder.restaurant_name}
                    </Text>
                    <Text fontSize={"14px"} color="#666">
                      {myOrder.restaurant_address}
                    </Text>
                  </Flex>
                </Flex>
                <Progress
                  value={getDeliveryProgress(
                    myOrder.delivery_time,
                    myOrder.delivery_date
                  )}
                  size="xs"
                  colorScheme="pink"
                />
                <Flex className="restaurant-info" gap="15px" align={"center"}>
                  <Text fontSize={"14px"} color="#666">
                    {parseOrderedItems(myOrder)}
                  </Text>
                </Flex>
                <Flex className="order-footer" gap="15px" align={"center"}>
                  <Text fontSize={"18px"} fontWeight={"600"} color="#333">
                    Rs. {myOrder.total_price}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          );
        })
      ) : (
        <Flex
          direction={"column"}
          alignItems="center"
          justifyContent="center"
          p={6}
        >
          <Image src={EmptyCartImage} alt="Empty Cart" width="25%" />
          <Text fontSize="lg" color="gray.500" mt={4}>
            Your orders page is empty.
          </Text>
          <Text fontSize="lg" color="gray.500" mt={4}>
            Add item to your cart and checkout to get started.
          </Text>
        </Flex>
      )}
    </Flex>
  );
}

export default OrdersTab;
