import React, { useMemo, useCallback } from "react";
import {
  Box,
  chakra,
  Text,
  Flex,
  Badge,
  Link as ChakraLink,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Import Icons.
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

// Import Components.
import IconContainer from "../../../../../widgets/icon-container/IconContainer";
import { useAuth } from "../../../../../context/AuthContext";
import { useUserData } from "../../../../../context/UserDataContext";

const LazyImage = chakra("img", { baseStyle: { loading: "lazy" } });

const Cards = ({
  id,
  name,
  description,
  image,
  delivery_hours,
  minimum_order,
  discount,
}) => {
  const {
    state: { token },
  } = useAuth();
  const {
    state: { favourites },
    dispatch,
  } = useUserData();

  const isLiked = useMemo(() => {
    if (!token) return false;
    const list = (favourites && favourites.restaurants) || [];
    return list.some((r) => r && r.restaurant_id === id);
  }, [token, favourites, id]);

  const handleFavourites = useCallback(
    async (restaurant_id) => {
      if (!token) return;
      const endpoint = isLiked
        ? `deletefavouriterestaurant/${restaurant_id}`
        : `favouriterestaurant/${restaurant_id}`;
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${endpoint}`,
        {
          method: isLiked ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      const restaurant = data && data.data && data.data.restaurant;

      const current = (favourites && favourites.restaurants) || [];
      const nextRestaurants = isLiked
        ? current.filter((r) => r && r.restaurant_id !== restaurant_id)
        : [...current, restaurant];

      dispatch({
        type: "SET_FAVOURITES",
        payload: { ...favourites, restaurants: nextRestaurants },
      });
    },
    [token, favourites, dispatch, isLiked]
  );

  const filledStars = useMemo(() => Array.from({ length: 3 }), []);
  const emptyStars = useMemo(() => Array.from({ length: 2 }), []);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
    >
      <Box position="relative">
        <LazyImage
          src={image}
          alt={name}
          objectFit="cover"
          w="100%"
          h="180px"
          loading="lazy"
          decoding="async"
        />

        <Box position="absolute" top="2" left="2">
          <Badge
            colorScheme="red"
            fontSize="0.8em"
            px={2}
            py={1}
            borderRadius="md"
          >
            {discount}%
          </Badge>
        </Box>

        <Box
          position="absolute"
          top="2"
          right="2"
          bgColor="white"
          borderRadius="full"
        >
          <IconButton
            aria-label={
              isLiked ? "Remove from favourites" : "Add to favourites"
            }
            icon={
              isLiked ? <IoMdHeart size={26} /> : <IoMdHeartEmpty size={26} />
            }
            padding={1}
            variant="ghost"
            fontSize="24px"
            color={isLiked ? "brand.500" : "grey.600"}
            _hover={{ color: isLiked ? "grey.600" : "brand.500" }}
            onClick={() => handleFavourites(id)}
          />
        </Box>
      </Box>

      <Box p={4}>
        <Flex justify="space-between" align="center" mb={1}>
          <ChakraLink
            as={Link}
            to={`/restaurant/${id}`}
            fontWeight="bold"
            fontSize="md"
            color="black"
            _hover={{ textDecoration: "underline" }}
          >
            {name}
          </ChakraLink>
          <Badge colorScheme="yellow" fontSize="0.7em">
            3.1
          </Badge>
        </Flex>

        <Text fontSize="sm" color="gray.600" noOfLines={2} mb={3}>
          {description}
        </Text>

        <Flex justify="space-between" mb={2} fontSize="sm">
          <Text color="gray.800">{delivery_hours}</Text>
          <Text color="gray.500">Rs. {minimum_order} min</Text>
        </Flex>

        <Flex align="center" gap={2}>
          <Flex color="yellow.400" gap={1}>
            {filledStars.map((_, i) => (
              <IconContainer
                key={`filled-${i}`}
                icon={<MdOutlineStarPurple500 />}
                fontSizeClass="icon--small"
                colorClass="text-yellow"
              />
            ))}
            {emptyStars.map((_, i) => (
              <IconContainer
                key={`empty-${i}`}
                icon={<MdOutlineStarPurple500 />}
                fontSizeClass="icon--small"
              />
            ))}
          </Flex>
          <Text fontSize="xs" color="gray.500">
            4225 ratings
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default React.memo(Cards);
