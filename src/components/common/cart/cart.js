import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button as ChakraButton,
  Link,
  useToast,
  chakra,
} from "@chakra-ui/react";
import EmptyCartImage from "../../../assets/images/cart-empty.png";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useCart } from "../../../hooks/useCart/useCart";
import { useDispatchOrder } from "../../../hooks/useDispatchOrder/useDispatchOrder";
import { useNavigate } from "react-router-dom";

export default function Cart({ cartType, position }) {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  const restaurantId = localStorage.getItem("order_restaurant_id");
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const toast = useToast();

  useEffect(() => {}, [cartItems]);

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/restaurant/${restaurantId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setRestaurantDetails(data.data[0]);
        }
      });
  }, [REACT_APP_API_URL, restaurantId]);

  const { mutate: dispatchOrder, isPending } = useDispatchOrder(
    () => {
      toast({
        title: "Order Successful",
        description: "Your order has been processed successfully.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      clearCart();

      setTimeout(() => {
        navigate("/orders");
      }, 1500);
    },
    (error) => {
      toast({
        title: "Order Failed",
        description: "You order has failed. Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  );

  const getTotalPrice = () => {
    var price = 0;

    cartItems.map((items, idx) => {
      price += items.price;
    });

    return price;
  };

  const percentageToPrice = (percentage) => {
    return Math.round((percentage * Math.round(getTotalPrice())) / 100);
  };

  const cartCalculation = [
    {
      key: "Items Subtotal",
      value: Math.round(getTotalPrice()),
    },
    {
      key: "Restaurant Discount",
      value: percentageToPrice(restaurantDetails?.discount),
    },
    {
      key: "Restaurant Service Charge",
      value: percentageToPrice(restaurantDetails?.additional_charges),
    },
    {
      key: "Additional VAT",
      value: percentageToPrice(restaurantDetails?.vat),
    },
    {
      key: "Delivery Charge",
      value: 50,
    },
  ];

  const grandTotal =
    Math.round(getTotalPrice()) -
    percentageToPrice(restaurantDetails?.discount) +
    percentageToPrice(restaurantDetails?.additional_charges) +
    percentageToPrice(restaurantDetails?.vat) +
    50;

  const handleOrder = async () => {
    const orderInstruction =
      document.getElementById(`order_special_instructions`)?.value || "";
    const order = {
      user_id: 1,
      restaurant_id: restaurantId,
      address_id: 1,
      instruction: orderInstruction,
      total_price: grandTotal,
      details: JSON.stringify(cartItems),
    };
    dispatchOrder(order);
  };

  const LazyImage = chakra("img", {
    baseStyle: {
      loading: "lazy",
    },
  });

  return (
    <Flex
      direction={"column"}
      pt={"drawer" === cartType ? 2 : 8}
      maxW={"checkout" === cartType ? "50%" : "100%"}
      width={"drawer" === cartType ? "100%" : "80%"}
    >
      <Box mb={4} fontWeight="bold" fontSize="lg">
        <Text fontSize="16px">MY BAG</Text>
      </Box>
      <Box
        direction={"column"}
        p={4}
        borderRadius="md"
        bgColor={cartItems.length > 0 ? "#ffffff" : "#FAFAFA"}
        position={"relative" === position ? "relative" : "sticky"}
        top="0"
        zIndex={"relative" !== position && "1000"}
        maxH="70vh"
        border={"drawer" === cartType ? "none" : "1px solid #00000020"}
        borderBottom="none"
        overflow={"auto"}
      >
        <Flex
          direction="column"
          minH={cartItems.length > 0 ? "auto" : "400px"}
          justifyContent={cartItems.length > 0 ? "flex-start" : "center"}
        >
          {cartItems.length > 0 ? (
            <Flex direction={"column"}>
              {cartItems.map((item, idx) => (
                <Flex
                  key={idx}
                  py={4}
                  px={2}
                  borderBottom={"1px solid #cccccc"}
                  gap={4}
                >
                  <Flex direction={"column"} flex={"0 0 50%"} gap={1}>
                    <Flex gap={4}>
                      <Text
                        color="#00000059"
                        fontWeight={"900"}
                        fontSize={"14px"}
                      >
                        {item.quantity}
                      </Text>
                      <Text
                        color="red.500"
                        fontWeight={"900"}
                        fontSize={"14px"}
                      >
                        {item.food_name}
                      </Text>
                    </Flex>
                    <Text color={"#6b6b83"} fontWeight={"900"} fontSize="10px">
                      {item.special_instructions}
                    </Text>
                  </Flex>
                  <Box
                    as="button"
                    onClick={() => removeFromCart(item.id)}
                    _hover={{
                      color: "red.500",
                    }}
                    p={1}
                    borderRadius="md"
                    display="flex"
                    justifyContent="center"
                    color="#00000059"
                    alignItems="baseline"
                  >
                    <MdOutlineDeleteForever size={20} />
                  </Box>
                  <Text color="#00000059" flex={"0 0 25%"} fontWeight="500">
                    {Math.round(item.price)}
                  </Text>
                </Flex>
              ))}
              <Flex direction="column" gap={2} mt={2}>
                {cartCalculation.map((items, idx) => (
                  <Flex
                    direction={"row"}
                    key={idx}
                    justifyContent={"space-between"}
                  >
                    <Text
                      color="#00000059"
                      fontWeight={"500"}
                      fontSize={"14px"}
                    >
                      {items.key.toUpperCase()}:
                    </Text>
                    <Text
                      color="#00000059"
                      fontWeight={"500"}
                      fontSize={"13px"}
                      textAlign={"left"}
                      flex={"0 0 35%"}
                    >
                      {items.value}
                    </Text>
                  </Flex>
                ))}
                <Flex direction={"row"} justifyContent={"space-between"}>
                  <Text color="#00000059" fontWeight={"500"} fontSize={"14px"}>
                    GRAND TOTAL:
                  </Text>
                  <Text
                    color="#00000059"
                    fontWeight={"500"}
                    fontSize={"13px"}
                    textAlign={"left"}
                    flex={"0 0 35%"}
                  >
                    Rs. {grandTotal}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          ) : (
            <Flex
              direction={"column"}
              alignItems="center"
              justifyContent="center"
              p={6}
            >
              <LazyImage src={EmptyCartImage} alt="Empty Cart" width="25%" />
              <Text fontSize="lg" color="gray.500" mt={4}>
                Your cart is empty.
              </Text>
              <Text fontSize="lg" color="gray.500" mt={4}>
                Add items to get started.
              </Text>
            </Flex>
          )}
        </Flex>
      </Box>

      {cartItems.length > 0 && (
        <Flex
          mb={4}
          fontWeight="bold"
          fontSize="lg"
          px={10}
          py={4}
          border={cartType === "drawer" ? "none" : "1px solid #cccccc"}
          bgColor="#ffffff"
          direction="column"
          gap={2}
        >
          {cartType === "checkout" ? (
            <ChakraButton
              bgColor="brand.500"
              color="white"
              fontSize="13px"
              width="100%"
              _hover={{
                bgColor: "white",
                borderColor: "brand.500",
                border: "1px solid",
                color: "brand.500",
              }}
              onClick={handleOrder}
              isLoading={isPending}
              loadingText="Dispatching Order"
            >
              ORDER NOW
            </ChakraButton>
          ) : (
            <>
              <Link
                bgColor="#28a745"
                color="white"
                fontSize="13px"
                width="100%"
                p={3}
                borderRadius={6}
                _hover={{
                  bgColor: "white",
                  borderColor: "brand.500",
                  border: "1px solid",
                  color: "brand.500",
                }}
                textAlign="center"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Link>
              <ChakraButton
                bgColor="brand.500"
                color="white"
                fontSize="13px"
                width="100%"
                _hover={{
                  bgColor: "white",
                  borderColor: "brand.500",
                  border: "1px solid",
                  color: "brand.500",
                }}
                onClick={clearCart}
              >
                Empty Bag
              </ChakraButton>
            </>
          )}
        </Flex>
      )}
    </Flex>
  );
}
