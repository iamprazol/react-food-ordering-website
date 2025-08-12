import { useState, useEffect } from "react";
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
import IconContainer from "../iconContainer/IconContainer";
import { useApp } from "../../../context/AppContext";

const Cards = ({
  id,
  name,
  description,
  image,
  delivery_hours,
  minimum_order,
  discount,
}) => {
  const LazyImage = chakra("img", {
    baseStyle: {
      loading: "lazy",
    },
  });

  const [liked, setLiked] = useState(false);
  const {
    state: { token, favourites },
    dispatch,
  } = useApp();

  useEffect(() => {
    if (token) {
      favourites?.restaurants.map((restaurant) => {
        if (id == restaurant.restaurant_id) {
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
          bgColor={"white"}
          borderRadius={"full"}
        >
          <IconButton
            icon={
              liked ? <IoMdHeart size={26} /> : <IoMdHeartEmpty size={26} />
            }
            padding={1}
            variant="ghost"
            fontSize="24px"
            color={liked ? "brand.500" : "grey.600"}
            _hover={{
              color: liked ? "grey.600" : "brand.500",
            }}
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
            {[...Array(3)].map((_, i) => (
              <IconContainer
                key={`filled-${i}`}
                icon={<MdOutlineStarPurple500 />}
                fontSizeClass="icon--small"
                colorClass="text-yellow"
              />
            ))}
            {[...Array(2)].map((_, i) => (
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

export default Cards;
