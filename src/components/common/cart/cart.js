import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button as ChakraButton,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Image } from "@chakra-ui/react";
import EmptyCartImage from "../../../assets/images/cart-empty.png";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useCart } from "../../../hooks/useCart/useCart";

export default function Cart({ cartType }) {
  const { cartItems, removeFromCart, clearCart } = useCart();

  useEffect(() => {}, [cartItems]);

  const getTotalPrice = () => {
    var price = 0;

    cartItems.map((items, idx) => {
      price += items.price;
    });

    return price;
  };

  return (
    <Flex
      direction={"column"}
      pt={"drawer" === cartType ? 2 : 8}
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
        position="sticky"
        top="0"
        zIndex="1000"
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
                    Rs. {item.price}
                  </Text>
                </Flex>
              ))}
              <Flex py={4} pl={2} pr={12} justifyContent={"space-between"}>
                <Text color="#00000059" fontWeight={"900"} fontSize={"13px"}>
                  Items subtotal:
                </Text>
                <Text color="#00000059" fontWeight={"900"} fontSize={"13px"}>
                  Rs. {getTotalPrice()}
                </Text>
              </Flex>
            </Flex>
          ) : (
            <Flex
              direction={"column"}
              alignItems="center"
              justifyContent="center"
              p={6}
            >
              <Image src={EmptyCartImage} alt="Empty Cart" width="25%" />
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
      <Flex
        mb={4}
        fontWeight="bold"
        fontSize="lg"
        px={10}
        py={4}
        border={"drawer" === cartType ? "none" : "1px solid #cccccc"}
        bgColor="#ffffff"
        direction={"column"}
        gap={2}
      >
        <ChakraButton
          bgColor="#28a745"
          color={"white"}
          fontSize={"13px"}
          width="100%"
          _hover={{
            bgColor: "white",
            borderColor: "brand.500",
            border: "1px solid",
            color: "brand.500",
          }}
        >
          Proceed to Checkout
        </ChakraButton>
        <ChakraButton
          bgColor="brand.500"
          color={"white"}
          fontSize={"13px"}
          width="100%"
          _hover={{
            bgColor: "white",
            borderColor: "brand.500",
            border: "1px solid",
            color: "brand.500",
          }}
          onClick={() => clearCart()}
        >
          Empty Bag
        </ChakraButton>
      </Flex>
    </Flex>
  );
}
