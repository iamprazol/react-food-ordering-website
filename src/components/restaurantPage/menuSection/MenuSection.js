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
  ModalHeader,
} from "@chakra-ui/react";
import {
  MdOutlineSearch,
  MdAddCircleOutline,
  MdAdd,
  MdOutlineRemoveCircle,
} from "react-icons/md";

function MenuSection({ menuItems }) {
  const [openOrderBar, setOpenOrderBar] = useState(false);
  const [orderedFood, setOrderedFood] = useState({});
  const [orderedQuantity, setOrderedQuantity] = useState(1);
  const [orderHandled, setOrderHandled] = useState(true);
  const [orderList, setOrderList] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOrderedFood = (food) => {
    if (!orderHandled) {
      setOrderHandled(true);

      const specialInstructions =
        document.getElementById(`food_${food.id}_special_instructions`)
          ?.value || "";

      const order = {
        restaurant_id: food.restaurant_id,
        food_id: food.id,
        quantity: orderedQuantity,
        price: food.price * orderedQuantity,
        special_instructions: specialInstructions,
      };

      setOrderList([...orderList, order]);
      setOrderedQuantity(1);
      onClose();
    }
  };

  const handleInputValue = (value) => {
    setOrderedQuantity(Number(value));
  };

  return (
    <Box p={4}>
      {/* Search Bar */}
      <Flex mb={4} align="center" gap={2}>
        <IconButton
          aria-label="Search"
          icon={<MdOutlineSearch />}
          variant="outline"
        />
        <Input placeholder="Chicken Momo" />
      </Flex>

      {menuItems && menuItems.length > 0 ? (
        menuItems.map((menuItem, index) => (
          <Box key={index} mb={6}>
            <Text
              fontWeight="bold"
              fontSize="xl"
              color="red.500"
              id={menuItem.category?.toLowerCase()}
              mb={2}
            >
              {menuItem.category}
            </Text>
            <VStack align="stretch" spacing={3}>
              {menuItem.foods && menuItem.foods.length > 0 ? (
                menuItem.foods.map((food, idx) => (
                  <Flex
                    key={idx}
                    justify="space-between"
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    onClick={() => {
                      setOrderedFood(food);
                      setOpenOrderBar(true);
                      setOrderHandled(false);
                      onOpen();
                    }}
                    cursor="pointer"
                  >
                    <Text>{food.food_name}</Text>
                    <HStack>
                      <Text>Rs {food.price}</Text>
                      <MdAddCircleOutline color="green" />
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

      {/* Popup Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{orderedFood?.food_name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* Special Instructions */}
            <Box mb={4}>
              <Text mb={1}>Special Instructions</Text>
              <Textarea
                placeholder="Extra toppings on pizza"
                id={`food_${orderedFood?.id}_special_instructions`}
              />
            </Box>

            {/* Quantity Input */}
            <Flex align="center" mb={4}>
              <IconButton
                icon={<MdAdd />}
                aria-label="Increase quantity"
                onClick={() => setOrderedQuantity((q) => q + 1)}
                size="sm"
              />
              <Input
                type="number"
                value={orderedQuantity}
                onChange={(e) => handleInputValue(e.target.value)}
                mx={2}
                width="70px"
              />
              <IconButton
                icon={<MdOutlineRemoveCircle />}
                aria-label="Decrease quantity"
                onClick={() => setOrderedQuantity((q) => (q > 1 ? q - 1 : 1))}
                size="sm"
              />
            </Flex>

            {/* Add To Cart Button */}
            <Button
              colorScheme="red"
              width="100%"
              onClick={() => handleOrderedFood(orderedFood)}
            >
              Add To Cart | Rs {orderedFood?.price * orderedQuantity || 0}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default MenuSection;
