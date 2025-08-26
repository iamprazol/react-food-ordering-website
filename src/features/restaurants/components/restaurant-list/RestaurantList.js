import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import Cards from "./cards/Cards";

const RestaurantList = ({ searchText, col }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  const shuffle = (a) => {
    const cloned = [...a];
    for (let i = cloned.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
    }
    return cloned;
  };

  useEffect(() => {
    setRestaurants([]);
    setPage(1);
    setHasMore(true);
  }, [searchText]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!hasMore || loading) return;
      setLoading(true);
      try {
        const { REACT_APP_API_URL } = process.env;
        const searchParams = new URLSearchParams();

        if (searchText) searchParams.append("name", searchText); // Already supported
        searchParams.append("page", page); // Laravel handles this automatically
        searchParams.append("per_page", 8); // Optional pagination size

        const res = await fetch(
          `${REACT_APP_API_URL}/restaurants/search?${searchParams.toString()}`
        );
        const data = await res.json();

        if (data?.data?.length > 0) {
          setRestaurants((prev) => [...prev, ...shuffle(data.data)]);
        }

        if (data?.pagination?.current_page >= data?.pagination?.last_page) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [page, searchText]);

  const loadMoreRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore]
  );

  const renderSkeletons = () =>
    Array.from({ length: 12 }).map((_, index) => (
      <Box
        key={index}
        borderRadius="md"
        overflow="hidden"
        boxShadow="sm"
        bg="white"
        p={4}
      >
        <Skeleton height="150px" mb={4} />
        <SkeletonText noOfLines={2} spacing="3" />
        <Skeleton height="20px" mt={3} />
      </Box>
    ));

  return (
    <Box as="section" py={10} px={{ base: 4, md: 8 }} bg="gray.50">
      <Box maxW="7xl" mx="auto">
        {"" === searchText && (
          <Heading fontSize="30px" mb={4}>
            Browse By Restaurants
          </Heading>
        )}

        <SimpleGrid columns={col} spacing={6}>
          {restaurants.map((restaurant) => (
            <Cards
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.restaurant_name}
              description={restaurant.description}
              image={restaurant.picture}
              address={restaurant.address}
              delivery_hours={restaurant.delivery_hours}
              minimum_order={restaurant.minimum_order}
              discount={restaurant.discount}
            />
          ))}

          {loading && renderSkeletons()}
        </SimpleGrid>

        {searchText && <div ref={loadMoreRef} style={{ height: "1px" }} />}

        {!loading && restaurants.length === 0 && (
          <Text mt={6} textAlign="center">
            No restaurants found.
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default RestaurantList;
