import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Heading,
  Link,
  Flex,
  SkeletonCircle,
  SkeletonText,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import BrowseByCategoryNav from "../../../../../widgets/navBar/BrowseByCategoryNav";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useApp } from "../../../../../context/AppContext";

const API_URL = process.env.REACT_APP_API_URL;

const BrowseByCategory = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    state: { isMobile },
  } = useApp();
  const [startIndex, setStartIndex] = useState(0);

  const shuffleArray = (array) => {
    const clonedArray = [...array];
    for (let i = clonedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]];
    }
    return clonedArray;
  };

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/foods`, {
          signal: abortController.signal,
        });
        const result = await response.json();
        const shuffled = shuffleArray(result.data).slice(0, 8);
        if (!abortController.signal.aborted) setFoods(shuffled);
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        if (!abortController.signal.aborted) setLoading(false);
      }
    })();

    return () => abortController.abort();
  }, []);

  const skeletons = useMemo(
    () =>
      Array.from({ length: 8 }, (_, index) => (
        <Box
          key={index}
          width={{ base: "100%", sm: "48%", md: "23%" }}
          height={{ base: "100px", sm: "110px", md: "130px" }}
          borderRadius="md"
          px={6}
        >
          <SkeletonCircle boxSize={{ base: "80px", md: "100px" }} />
          <SkeletonText noOfLines={1} spacing="2" mt={4} />
        </Box>
      )),
    []
  );

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? Math.max(foods.length - 2, 0) : prev - 2
    );
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 2 >= foods.length ? 0 : prev + 2));
  };

  const displayedFoods = isMobile
    ? foods.slice(startIndex, startIndex + 2)
    : foods;

  return (
    <Box as="section" py={10} px={{ base: 4, md: 8 }} bg="gray.50">
      <Box maxW="7xl" mx="auto">
        <Heading
          fontSize={{ base: "20px", md: "30px" }}
          mb={4}
          color="blackAlpha.800"
          fontWeight={600}
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "left", md: "center" }}
          justifyContent="space-between"
          gap={{ base: 2, md: 0 }}
        >
          Browse By Categories
          <Link
            href="/foods"
            color="brand.300"
            ml={{ base: 0, md: 2 }}
            fontSize={{ base: "12px", md: "md" }}
          >
            View all foods
          </Link>
        </Heading>
        <Flex align="center">
          {isMobile && (
            <IconButton
              aria-label="Previous"
              icon={<ChevronLeftIcon />}
              onClick={handlePrev}
              variant="outline"
              size="sm"
              zIndex={"1"}
              bgColor={"brand.400"}
              color={"white"}
              position={"absolute"}
            />
          )}

          <Flex
            gap={{ base: 0, md: 4 }}
            flex="1"
            justify={isMobile ? "center" : "flex-start"}
          >
            {loading
              ? skeletons
              : displayedFoods.map((food) => (
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

          {isMobile && (
            <IconButton
              aria-label="Next"
              icon={<ChevronRightIcon />}
              onClick={handleNext}
              size="sm"
              zIndex={"1"}
              bgColor={"brand.400"}
              color={"white"}
              position={"absolute"}
              right={"15px"}
            />
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default BrowseByCategory;
