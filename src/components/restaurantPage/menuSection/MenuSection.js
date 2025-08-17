import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  IconButton,
  VStack,
  HStack,
  Textarea,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Divider,
  Heading,
  Skeleton,
} from "@chakra-ui/react";

import { MdOutlineSearch, MdAdd, MdOutlineRemoveCircle } from "react-icons/md";
import { useCart } from "../../../hooks/useCart/useCart";
import { useApp } from "../../../context/AppContext";
import FoodCard from "./foodCard/FoodCard";

function MenuSection({ menuItems }) {
  const [openOrderBar, setOpenOrderBar] = useState(false);
  const [orderedFood, setOrderedFood] = useState({});
  const [orderedQuantity, setOrderedQuantity] = useState(1);
  const [orderHandled, setOrderHandled] = useState(true);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [currentRestaurantId, setCurrentRestaurantId] = useState(0);
  const [loading, setLoading] = useState(true);

  const {
    state: { favourites, token },
  } = useApp();
  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose,
  } = useDisclosure();
  const {
    isOpen: isConfirmationOpen,
    onOpen: onConfirmationOpen,
    onClose: onConfirmationClose,
  } = useDisclosure();
  const { cartItems, addToCart, clearCart } = useCart();

  useEffect(() => {
    if (menuItems?.length > 0) {
      setLoading(false);
    }
  }, [menuItems]);

  useEffect(() => {
    if (pendingOrder && cartItems.length === 0) {
      addToCart(pendingOrder);
      setPendingOrder(null);
      setOrderedQuantity(1);
      onConfirmationClose();
      onCartClose();
    }
  }, [cartItems, pendingOrder]);

  const generateRandomKey = (length = 16) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length })
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("");
  };

  const handleOrderedFood = (food) => {
    if (!orderHandled) {
      setOrderHandled(true);
      const specialInstructions =
        document.getElementById(`food_${food.id}_special_instructions`)
          ?.value || "";

      const order = {
        id: generateRandomKey(),
        food_id: food.id,
        food_name: food.food_name,
        quantity: orderedQuantity,
        price: food.price * orderedQuantity,
        special_instructions: specialInstructions,
      };

      let restaurant_id = localStorage.getItem("order_restaurant_id");

      if (restaurant_id === null) {
        localStorage.setItem("order_restaurant_id", food.restaurant_id);
        restaurant_id = food.restaurant_id;
      }

      if (
        cartItems.length >= 0 &&
        Number(restaurant_id) !== food.restaurant_id
      ) {
        setPendingOrder(order);
        setCurrentRestaurantId(food.restaurant_id);
        onConfirmationOpen();
      } else {
        addToCart(order);
        setOrderedQuantity(1);
        onCartClose();
      }
    }
  };

  const handleInputValue = (value) => {
    setOrderedQuantity(Number(value));
  };

  const renderSkeletons = () => {
    return Array.from({ length: 3 }).map((_, sectionIndex) => (
      <Box key={sectionIndex} mb={6}>
        <Skeleton height="20px" width="550px" mb={3} />
        <VStack align="stretch" spacing={4}>
          {Array.from({ length: 3 }).map((_, itemIndex) => (
            <Skeleton key={itemIndex} height="30px" />
          ))}
        </VStack>
      </Box>
    ));
  };

  return (
    <Box p={4} w="100%">
      <Flex direction="column" gap="60px">
        {/* Search Bar */}
        <Flex
          align="center"
          borderWidth="1px"
          borderRadius="md"
          overflow="hidden"
          bg="gray.50"
          w="100%"
        >
          <IconButton
            aria-label="Search"
            icon={<MdOutlineSearch />}
            variant="ghost"
            fontSize="xl"
          />
          <Input
            placeholder="Chicken Momo"
            bg="white"
            border="none"
            focusBorderColor="transparent"
            rounded="full"
            shadow="sm"
            _placeholder={{ color: "gray.400" }}
          />
        </Flex>

        <Flex direction="column" gap="20px">
          {loading ? (
            renderSkeletons()
          ) : menuItems && menuItems.length > 0 ? (
            menuItems.map((menuItem, index) => (
              <Box key={index} mb={6}>
                <Box bg="#FBF9F9" p={3}>
                  <Text
                    fontWeight="400"
                    fontSize="sm"
                    color="#2d2c2c "
                    id={menuItem.category?.toLowerCase()}
                  >
                    {menuItem.category.toUpperCase()}
                  </Text>
                </Box>
                <VStack align="stretch">
                  {menuItem.foods && menuItem.foods.length > 0 ? (
                    menuItem.foods.map((food, idx) => (
                      <Flex
                        key={idx}
                        justify="space-between"
                        p={3}
                        borderBottomWidth="1px"
                        onClick={() => {
                          setOrderedFood(food);
                          setOpenOrderBar(true);
                          setOrderHandled(false);
                          onCartOpen();
                        }}
                        cursor="pointer"
                      >
                        <FoodCard currentFood={food} />
                      </Flex>
                    ))
                  ) : (
                    <Text>No foods found.</Text>
                  )}
                </VStack>
              </Box>
            ))
          ) : (
            <Text>No menu items found.</Text>
          )}
        </Flex>
      </Flex>

      {/* Popup Cart Modal */}
      <Modal isOpen={isCartOpen} onClose={onCartClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box mt={6} mb={6} opacity={0.8}>
              <Heading
                as="h3"
                fontSize={"30px"}
                fontWeight={"400"}
                color="#4A4A4A"
                mb={3}
              >
                {orderedFood?.food_name}
              </Heading>
              <Text fontSize="2xl" color="#4A4A4A" fontWeight="400" mb={2}>
                Rs {orderedFood?.price}
              </Text>
              <Text fontSize="sm" color="#4A4A4A">
                {orderedFood?.description}
              </Text>
            </Box>
            <Divider orientation="horizontal" />
            {/* Special Instructions */}
            <Box mt={3} mb={4}>
              <Text mb={3} fontWeight={600}>
                SPECIAL INSTRUCTIONS
              </Text>
              <Textarea
                placeholder="Extra toppings on pizza"
                id={`food_${orderedFood?.id}_special_instructions`}
                fontSize="sm"
              />
            </Box>
          </ModalBody>
          <ModalFooter
            justifyContent="space-between"
            alignItems="center"
            background={"#FBF9F9"}
          >
            <Flex align="center" bgColor={"#ffffff"} p={3} borderRadius="md">
              <IconButton
                icon={<MdAdd />}
                aria-label="Increase quantity"
                onClick={() => setOrderedQuantity((q) => q + 1)}
                size="md"
              />
              <Input
                type="number"
                value={orderedQuantity}
                onChange={(e) => handleInputValue(e.target.value)}
                mx={2}
                width="55px"
                textAlign={"center"}
              />
              <IconButton
                icon={<MdOutlineRemoveCircle />}
                aria-label="Decrease quantity"
                onClick={() => setOrderedQuantity((q) => (q > 1 ? q - 1 : 1))}
                size="md"
              />
            </Flex>
            <Button
              background={"brand.400"}
              color={"white"}
              width="50%"
              onClick={() => handleOrderedFood(orderedFood)}
              justifyContent={"space-between"}
              fontSize={"sm"}
              fontWeight={"400"}
              _hover={{ bgColor: "brand.600" }}
            >
              <Text ml={2}>ADD TO BAG</Text>
              <Text ml={2}>
                Rs {Math.round(orderedFood?.price * orderedQuantity || 0)}
              </Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Popup Restaurant Change Modal */}
      <Modal
        isOpen={isConfirmationOpen}
        onClose={onConfirmationClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box mt={6} mb={6} opacity={0.8}>
              <Heading
                as="h3"
                fontSize={"30px"}
                fontWeight={"400"}
                color="#4A4A4A"
                mb={3}
              >
                Restaurant Changed
              </Heading>
            </Box>
            <Divider orientation="horizontal" />
            <Box mt={3} mb={4}>
              <Text mb={3} fontWeight={400} fontSize={"18px"}>
                Your cart already has item from another restaurant. You have to
                clear cart items and add items from this restaurant. Do you want
                to proceed ?
              </Text>
              <Flex gap={4} justifyContent={"end"}>
                <Button
                  border={"2px solid"}
                  borderColor={"brand.400"}
                  bgColor="white"
                  color={"brand.400"}
                  onClick={() => {
                    setPendingOrder(null);
                    onConfirmationClose();
                    onCartClose();
                  }}
                  fontSize={"sm"}
                  fontWeight={"400"}
                  width="15%"
                  _hover={{ bgColor: "brand.300", color: "white" }}
                >
                  <Text>No</Text>
                </Button>
                <Button
                  background={"brand.400"}
                  color={"white"}
                  onClick={() => {
                    localStorage.setItem(
                      "order_restaurant_id",
                      currentRestaurantId
                    );
                    clearCart();
                  }}
                  fontSize={"sm"}
                  fontWeight={"400"}
                  width="15%"
                  _hover={{ bgColor: "brand.600" }}
                  textAlign={"center"}
                >
                  <Text>Yes</Text>
                </Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default MenuSection;
