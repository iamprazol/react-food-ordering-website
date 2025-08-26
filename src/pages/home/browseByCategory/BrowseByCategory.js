import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Link,
  Flex,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import BrowseByCategoryNav from "./BrowseByCategoryNav";

const BrowseByCategory = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const shuffleArray = (array) => {
    const clonedArray = [...array];
    for (let i = clonedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]];
    }
    return clonedArray;
  };

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/foods`);
        const result = await response.json();
        const shuffled = shuffleArray(result.data).slice(0, 8);
        setFoods(shuffled);
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const renderSkeletons = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <Box
        key={index}
        width={{ base: "100%", sm: "48%", md: "23%" }}
        height="150px"
        borderRadius="md"
        px={6}
      >
        <SkeletonCircle size="100" />
        <SkeletonText noOfLines={1} spacing="2" marginTop={4} />
      </Box>
    ));
  };

  return (
    <Box as="section" py={10} px={{ base: 4, md: 8 }} bg="gray.50">
      <Box maxW="7xl" mx="auto">
        <Heading
          fontSize="30px"
          mb={4}
          color="blackAlpha.800"
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

        <Flex gap={4}>
          {loading
            ? renderSkeletons()
            : foods.map((food) => (
                <BrowseByCategoryNav
                  key={food.id}
                  id={`slide-item-${food.id}`}
                  category_id={food.category_id}
                  image={food.picture}
                  restaurant_id={food.restaurant_id}
                  title={food.food_name}
                />
              ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default BrowseByCategory;
