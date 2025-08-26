import { useState, useEffect } from "react";
import {
  Box,
  chakra,
  Text,
  Flex,
  Badge,
  Link as ChakraLink,
  IconButton,
  HStack,
} from "@chakra-ui/react";

// Import Icons.
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

// Import Components.
import { useApp } from "../../context/AppContext";
import { MdAddCircleOutline } from "react-icons/md";

const LazyImage = chakra("img", { baseStyle: { loading: "lazy" } });

const FoodCard = ({ currentFood, context }) => {
  const [liked, setLiked] = useState(false);
  const {
    state: { token, favourites },
    dispatch,
  } = useApp();

  useEffect(() => {
    if (token) {
      favourites.foods.map((food) => {
        if (currentFood.food_id == food.food_id) {
          setLiked(true);
        }
      });
    }
  }, [favourites]);

  const handleFavourites = async (food_id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/${
        liked ? `deletefavouritefood/${food_id}` : `favouritefood/${food_id}`
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

    const food = data.data.food;

    let newFavouritesRef = {};
    if (liked) {
      newFavouritesRef = favourites.foods.filter((food) => {
        return food.food_id !== food_id;
      });
    } else {
      const currentFoods = favourites.foods || [];

      newFavouritesRef = [...currentFoods, food];
    }
    const updatedFavourites = {
      ...favourites,
      foods: newFavouritesRef,
    };

    dispatch({
      type: "SET_FAVOURITES",
      payload: updatedFavourites,
    });

    setLiked(!liked);
  };

  return (
    <>
      <LazyImage
        src={currentFood.picture}
        objectFit="cover"
        w="75px"
        height="75px"
        borderRadius={"8px"}
      />
      <Box
        top="2"
        right="2"
        bgColor={"white"}
        borderRadius={"full"}
        alignContent={"center"}
      >
        <IconButton
          icon={liked ? <IoMdHeart size={26} /> : <IoMdHeartEmpty size={26} />}
          padding={1}
          variant="ghost"
          fontSize="24px"
          color={liked ? "brand.500" : "grey.600"}
          _hover={{
            color: liked ? "grey.600" : "brand.500",
          }}
          onClick={() =>
            handleFavourites(
              currentFood.id ? currentFood.id : currentFood.food_id
            )
          }
        />
      </Box>
      <Flex direction="column" gap={1} flex="0 0 50%">
        <Text fontSize={"md"} color="#4A4A4A">
          {currentFood.food_name}
        </Text>
        <Text fontSize={"14px"} color="#4A4A4A" opacity={"0.5"}>
          {currentFood.restaurant_name}
        </Text>
      </Flex>
      <HStack>
        <Text fontSize={"md"} color="#383838">
          Rs {currentFood.price}
        </Text>
        {context !== "myAccount" && (
          <MdAddCircleOutline color="green" size={"16px"} />
        )}
      </HStack>
    </>
  );
};

export default FoodCard;
