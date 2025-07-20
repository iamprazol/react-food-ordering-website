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

import Banner from "../../common/banner/Banner";
import IconContainer from "../../common/iconContainer/IconContainer";
import RestaurantList from "../restaurantList/RestaurantList";
import Buttons from "../../common/buttons/Buttons";

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
    <Box>
      <Banner
        bannerHeight="small"
        bannerContent={
          <Box px={4}>
            <Heading size="lg" color="white">
              Restaurants and Stores
            </Heading>
          </Box>
        }
      />

      <Box bg="gray.800" py={3} px={4}>
        <Text color="white" fontSize="sm" userSelect="none">
          Home{" "}
          <IconContainer
            icon={<MdArrowForward />}
            fontSizeClass="icon--small"
          />{" "}
          Search{" "}
          <IconContainer
            icon={<MdArrowForward />}
            fontSizeClass="icon--small"
          />{" "}
          Restaurants Found
        </Text>
      </Box>

      <Flex
        maxW="7xl"
        mx="auto"
        px={4}
        py={6}
        direction={{ base: "column", md: "row" }}
        gap={6}
      >
        {/* Filters Sidebar */}
        <Box flex="0 0 300px">
          <VStack align="start" spacing={4}>
            <Select
              placeholder="Select a Filter"
              value={selected}
              onChange={handleSelectedItem}
              bg="white"
            >
              <option value="name">Restaurant</option>
              <option value="food_name">Food</option>
              <option value="category">Category</option>
            </Select>

            {selected && (
              <HStack width="100%" spacing={2}>
                <Input
                  placeholder="Filter Item"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={handleFilterFinalization}
                >
                  Done
                </Button>
              </HStack>
            )}

            {filterParams.length > 0 && (
              <HStack wrap="wrap" spacing={2} pt={2}>
                {filterParams.map((value, idx) => (
                  <Tag
                    size="md"
                    key={idx}
                    borderRadius="full"
                    variant="solid"
                    colorScheme="blue"
                  >
                    <TagLabel>{value}</TagLabel>
                    <TagCloseButton
                      onClick={() => handleCloseFilterParam(idx)}
                    />
                  </Tag>
                ))}
              </HStack>
            )}
          </VStack>
        </Box>

        {/* Main Body */}
        <Box flex="1">
          <RestaurantList searchText={searchText} />
        </Box>
      </Flex>
    </Box>
  );
}

export default SearchRestaurantPage;
