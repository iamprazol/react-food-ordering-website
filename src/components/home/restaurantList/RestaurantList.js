import React, { useState, useEffect } from "react";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Cards from "../../common/cards/Cards";

const RestaurantList = ({ searchText }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [message, setMessage] = useState("");

  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  useEffect(() => {
    const { REACT_APP_API_URL } = process.env;
    const searchParams = searchText ? `name=${searchText}` : "";

    fetch(`${REACT_APP_API_URL}/restaurants?${searchParams}`)
      .then((res) => res.json())
      .then((data) => {
        const restaurantsArray = shuffle(data.data);
        const cards = restaurantsArray.map((restaurant) => (
          <Cards
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.restaurant_name}
            description={restaurant.description}
            image={`${restaurant.picture}`}
            address={restaurant.address}
            delivery_hours={restaurant.delivery_hours}
            minimum_order={restaurant.minimum_order}
            discount={restaurant.discount}
          />
        ));
        setMessage(data.message);
        setRestaurants(cards);
      });
  }, [searchText]);

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
          {searchText ? message : "Browse By Restaurants"}
        </Heading>
        {restaurants.length > 0 ? (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {restaurants}
          </SimpleGrid>
        ) : (
          <Text>No restaurants found.</Text>
        )}
      </Box>
    </Box>
  );
};

export default RestaurantList;
