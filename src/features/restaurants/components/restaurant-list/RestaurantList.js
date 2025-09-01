import { useRef, useEffect, useMemo } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import Cards from "./cards/Cards";
import { useRestaurants } from "../../api/useRestaurants";
import { useDebouncedValue } from "../../../../shared/hooks/useDebouncedValue";

const RestaurantList = ({ searchText, col }) => {
  const debounced = useDebouncedValue(searchText, 350);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRestaurants(debounced);

  const restaurants = useMemo(
    () => (data ? data.pages.flatMap((p) => p.items) : []),
    [data]
  );

  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "800px 0px 800px 0px", threshold: 0 }
    );

    observer.observe(node);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
        {searchText === "" && (
          <Heading fontSize="30px" mb={4}>
            Browse By Restaurants
          </Heading>
        )}

        <SimpleGrid columns={col} spacing={6}>
          {restaurants.map((r) => (
            <Cards
              key={r.id}
              id={r.id}
              name={r.restaurant_name}
              description={r.description}
              image={r.picture}
              address={r.address}
              delivery_hours={r.delivery_hours}
              minimum_order={r.minimum_order}
              discount={r.discount}
            />
          ))}

          {isLoading && renderSkeletons()}

          {isFetchingNextPage &&
            Array.from({ length: 4 }).map((_, i) => (
              <Box key={`more-${i}`} bg="white" p={4} borderRadius="md">
                <Skeleton height="150px" mb={4} />
                <SkeletonText noOfLines={2} spacing="3" />
              </Box>
            ))}
        </SimpleGrid>

        {/* Needs a real height so it can intersect */}
        {hasNextPage && <Box ref={sentinelRef} h="1px" />}

        {isError && (
          <Text mt={6} textAlign="center">
            No restaurants found.
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default RestaurantList;
