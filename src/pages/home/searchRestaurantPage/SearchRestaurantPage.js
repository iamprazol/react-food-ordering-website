import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  HStack,
  VStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Select,
  Input,
  Button,
} from "@chakra-ui/react";

import Banner from "../../../widgets/banner/Banner";
import IconContainer from "../../../components/common/iconContainer/IconContainer";
import RestaurantList from "../../../features/restaurants/components/RestaurantList";
import Buttons from "../../../shared/ui/Buttons";

import { MdArrowForward } from "react-icons/md";

function SearchRestaurantPage({ searchText }) {
  const [selected, setSelected] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filterParams, setFilterParams] = useState([]);

  const handleSelectedItem = (e) => {
    setSelected(e.target.value);
  };

  const handleFilterFinalization = () => {
    if (filterText && selected) {
      setFilterParams([...filterParams, `${selected} : ${filterText}`]);
      setFilterText("");
      setSelected("");
    }
  };

  const handleCloseFilterParam = (indexToRemove) => {
    setFilterParams(filterParams.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg="gray.700" px={6} py={4} color="white">
        <Heading size="lg">Restaurants and Stores</Heading>
        <HStack mt={2} fontSize="sm">
          <Text>Home</Text>
          <MdArrowForward />
          <Text>Search</Text>
          <MdArrowForward />
          <Text fontWeight="medium">Restaurants Found</Text>
        </HStack>
      </Box>

      <Flex
        maxW="8xl"
        mx="25px"
        py={8}
        px={6}
        direction={{ base: "column", md: "row" }}
        gap={8}
      >
        <Box
          w={{ base: "100%", md: "300px" }}
          bg="white"
          p={5}
          borderRadius="md"
          shadow="sm"
        >
          <VStack align="stretch" spacing={4}>
            <Text fontWeight="semibold">Choose Filter Type</Text>
            <Select
              placeholder="Select filter type"
              value={selected}
              onChange={handleSelectedItem}
            >
              <option value="name">Restaurant</option>
              <option value="food_name">Food</option>
              <option value="category">Category</option>
            </Select>

            {selected && (
              <HStack>
                <Input
                  placeholder="Enter filter keyword"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
                <Button
                  size="sm"
                  onClick={handleFilterFinalization}
                  colorScheme="blue"
                >
                  Apply
                </Button>
              </HStack>
            )}

            {filterParams.length > 0 && (
              <VStack align="start" spacing={2} pt={2} wrap="wrap">
                {filterParams.map((value, idx) => (
                  <Tag key={idx} colorScheme="blue" borderRadius="full">
                    <TagLabel>{value}</TagLabel>
                    <TagCloseButton
                      onClick={() => handleCloseFilterParam(idx)}
                    />
                  </Tag>
                ))}
              </VStack>
            )}
          </VStack>
        </Box>

        {/* Main Body */}
        <Box flex="1">
          <RestaurantList searchText={searchText} col="3" />
        </Box>
      </Flex>
    </Box>
  );
}

export default SearchRestaurantPage;
