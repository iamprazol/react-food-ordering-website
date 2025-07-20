import React, { useEffect, useState } from "react";
import { Box, Heading, Link, Flex } from "@chakra-ui/react";
import BrowseByCategoryNav from "./BrowseByCategoryNav";

const BrowseByCategory = () => {
  const [foodsByCategory, setFoodsByCategory] = useState([]);

  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    const { REACT_APP_API_URL } = process.env;

    fetch(`${REACT_APP_API_URL}/foods`)
      .then((res) => res.json())
      .then((data) => {
        const foodsArray = shuffle(data.data);
        const sliced = foodsArray
          .slice(0, 8)
          .map((food) => (
            <BrowseByCategoryNav
              key={food.id}
              id={"slide-item-" + food.id}
              category_id={food.category_id}
              image={food.picture}
              restaurant_id={food.restaurant_id}
              title={food.food_name}
            />
          ));
        setFoodsByCategory(sliced);
      });
  }, []);

  return (
    <Box as="section" py={10} px={{ base: 4, md: 8 }} bg="gray.50">
      <Box maxW="7xl" mx="auto">
        <Heading
          fontSize="30px"
          mb={4}
          color={"rgba(0,0,0,.8705882352941177)"}
          fontWeight={600}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          Browse By Categories
          <Link href="/foods" color="brand.300" fontSize="md" ml={2}>
            View all foods
          </Link>
        </Heading>
        <Flex wrap="wrap" gap={4}>
          {foodsByCategory}
        </Flex>
      </Box>
    </Box>
  );
};

export default BrowseByCategory;
