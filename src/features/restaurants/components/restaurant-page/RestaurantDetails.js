import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Icon,
  Link,
  VStack,
  HStack,
  Divider,
  chakra,
  IconButton,
} from "@chakra-ui/react";

import { Stars } from "../../../../widgets/icon/Icon";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useAuth } from "../../../../context/AuthContext";
import { useUserData } from "../../../../context/UserDataContext";

const LazyImage = chakra("img", { baseStyle: { loading: "lazy" } });

function RestaurantDetails(props) {
  const {
    restaurantId,
    name,
    description,
    deliveryHours,
    minimumOrder,
    picture,
    address,
    vat,
    discount,
    additionalCharges,
  } = props;

  const [liked, setLiked] = useState(false);

  const {
    state: { token },
  } = useAuth();
  const {
    state: { favourites },
    dispatch,
  } = useUserData();

  useEffect(() => {
    if (token) {
      favourites?.restaurants.map((restaurant) => {
        if (restaurantId == restaurant.restaurant_id) {
          setLiked(true);
        }
      });
    }
  }, [favourites]);

  const handleFavourites = async (restaurant_id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/${
        liked
          ? `deletefavouriterestaurant/${restaurant_id}`
          : `favouriterestaurant/${restaurant_id}`
      }`,
      {
        method: liked ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    const restaurant = data.data.restaurant;

    let newFavouritesRef = {};
    if (liked) {
      newFavouritesRef = favourites.restaurants.filter((restaurant) => {
        return restaurant.restaurant_id !== restaurant_id;
      });
    } else {
      const currentFoods = favourites.restaurants || [];

      newFavouritesRef = [...currentFoods, restaurant];
    }
    const updatedFavourites = {
      ...favourites,
      restaurants: newFavouritesRef,
    };

    dispatch({
      type: "SET_FAVOURITES",
      payload: updatedFavourites,
    });

    setLiked(!liked);
  };

  return (
    <Box maxW="7xl" mx="auto" p={4}>
      {/* Header Section */}
      <Flex
        justify="space-between"
        borderBottom="1px"
        borderColor="gray.200"
        pb={4}
      >
        <Box>
          <Heading size="lg" fontWeight="700">
            {name}
          </Heading>
          <Text color="gray.600" mt={2}>
            <Icon as={MdOutlineAddLocationAlt} color="red.400" mr={1} />
            {address}
          </Text>
        </Box>
        <LazyImage
          src={picture}
          alt="restaurant"
          boxSize="100px"
          objectFit="cover"
          borderRadius="md"
        />
      </Flex>

      {/* Info Section */}
      <Flex wrap="wrap" py={4} borderBottom="1px" borderColor="gray.200">
        <InfoBlock label="DELIVERY HOURS" value={deliveryHours} />
        <InfoBlock label="MINIMUM ORDER" value={`Rs. ${minimumOrder}`} />
        <InfoBlock label="DISCOUNT" value={`${discount} %`} />
        <InfoBlock label="SERVICE CHARGE" value={`${additionalCharges} %`} />
        <InfoBlock label="ADDITIONAL VAT" value={`${vat} %`} />
      </Flex>

      {/* Rating and Description */}
      <Box py={4} borderBottom="1px" borderColor="gray.200">
        <HStack spacing={1} mb={2}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Icon
              key={i}
              as={Stars}
              color={i <= 3 ? "yellow.400" : "gray.300"}
              boxSize={5}
            />
          ))}
          <Text color="gray.600">58 ratings</Text>
        </HStack>
        <Text fontSize="lg" fontWeight="semibold" color="gray.700">
          {description}
        </Text>
      </Box>

      {/* Tabs and Wishlist */}
      <Flex
        justify="space-between"
        align="center"
        py={4}
        borderBottom="1px"
        borderColor="gray.200"
      >
        <HStack spacing={6}>
          {["Menu", "Reviews", "Map & Gallery"].map((tab) => (
            <Link
              key={tab}
              href={`#${tab.toLowerCase().replace(/\s+/g, "")}`}
              fontWeight="700"
              color="gray.700"
            >
              {tab}
            </Link>
          ))}
        </HStack>
        <IconButton
          icon={liked ? <IoMdHeart size={26} /> : <IoMdHeartEmpty size={26} />}
          padding={1}
          variant="ghost"
          fontSize="24px"
          color={liked ? "brand.500" : "grey.600"}
          _hover={{
            color: liked ? "grey.600" : "brand.500",
          }}
          onClick={() => handleFavourites(restaurantId)}
        />
      </Flex>
    </Box>
  );
}

function InfoBlock({ label, value }) {
  return (
    <Box flex="1 1 200px" mb={3} pr={4}>
      <Text fontSize="sm" color="gray.500">
        {label}
      </Text>
      <Text fontWeight="medium" color="gray.700">
        {value}
      </Text>
    </Box>
  );
}

export default RestaurantDetails;
