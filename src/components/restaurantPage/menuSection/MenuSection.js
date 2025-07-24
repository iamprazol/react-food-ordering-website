// Import Libraries
import React, { useState } from "react";
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
} from "@chakra-ui/react";

import {
  MdOutlineSearch,
  MdAddCircleOutline,
  MdAdd,
  MdOutlineRemoveCircle,
} from "react-icons/md";
import { useCart } from "../../../hooks/useCart/useCart";

function MenuSection({ menuItems }) {
  const [openOrderBar, setOpenOrderBar] = useState(false);
  const [orderedFood, setOrderedFood] = useState({});
  const [orderedQuantity, setOrderedQuantity] = useState(1);
  const [orderHandled, setOrderHandled] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cartItems, addToCart } = useCart();

  const generateRandomKey = (length = 16) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let key = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      key += chars[randomIndex];
    }

    return key;
  };

  const handleOrderedFood = (food) => {
    if (!orderHandled) {
      setOrderHandled(true);

      const specialInstructions =
        document.getElementById(`food_${food.id}_special_instructions`)
          ?.value || "";

      const order = {
        id: generateRandomKey(),
        restaurant_id: food.restaurant_id,
        food_id: food.id,
        food_name: food.food_name,
        quantity: orderedQuantity,
        price: food.price * orderedQuantity,
        special_instructions: specialInstructions,
      };

      addToCart(order);
      setOrderedQuantity(1);
      onClose();
    }
  };

  const handleInputValue = (value) => {
    setOrderedQuantity(Number(value));
  };

  return (
    <Box p={4}>
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
          {menuItems && menuItems.length > 0 ? (
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
                          onOpen();
                        }}
                        cursor="pointer"
                      >
                        <Flex direction="column" gap={1}>
                          <Text fontSize={"md"} color="#4A4A4A">
                            {food.food_name}
                          </Text>
                          <Text
                            fontSize={"14px"}
                            color="#4A4A4A"
                            opacity={"0.5"}
                          >
                            {food.description}
                          </Text>
                        </Flex>
                        <HStack>
                          <Text fontSize={"md"} color="#383838">
                            Rs {food.price}
                          </Text>
                          <MdAddCircleOutline color="green" size={"16px"} />
                        </HStack>
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

      {/* Popup Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
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
    </Box>
  );
}

export default MenuSection;
