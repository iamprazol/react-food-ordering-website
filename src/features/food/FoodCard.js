import { useMemo, useCallback, memo, useState } from "react";
import { Box, chakra, Text, Flex, IconButton, HStack } from "@chakra-ui/react";

// Import Icons.
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

// Import Components.
import { MdAddCircleOutline } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { useUserData } from "../../context/UserDataContext";

const LazyImage = chakra("img", { baseStyle: { loading: "lazy" } });
const API_URL = process.env.REACT_APP_API_URL;

const MemoFoodCard = ({ currentFood, context, onClick }) => {
  const {
    state: { token },
  } = useAuth();
  const {
    state: { favourites },
    dispatch,
  } = useUserData();

  const [optimisticLike, setOptimisticLike] = useState(null);
  const [pending, setPending] = useState(false);

  const foodId = currentFood?.food_id ?? currentFood?.id;

  const isLiked = useMemo(() => {
    if (!token) return false;
    const list = (favourites && favourites.foods) || [];

    return list.some((food) => food && food.food_id == foodId);
  }, [token, favourites, foodId]);

  const uiLiked = optimisticLike ?? isLiked;
  const handleFavourites = useCallback(
    async (targetId) => {
      if (!token || !API_URL || targetId == null) return;
      const endpoint = isLiked
        ? `deletefavouritefood/${targetId}`
        : `favouritefood/${targetId}`;
      const method = isLiked ? "DELETE" : "POST";

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${endpoint}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const jsonResponse = await response.json();

      const serverFood = jsonResponse?.data?.food;

      const current = (favourites && favourites.foods) || [];

      const nextFoods = isLiked
        ? current.filter((food) => (food?.food_id ?? food?.id) != targetId)
        : [...current, serverFood];

      dispatch({
        type: "SET_FAVOURITES",
        payload: { ...favourites, foods: nextFoods },
      });

      setPending(false);
      setOptimisticLike(null);
    },
    [token, favourites, dispatch, isLiked, pending]
  );

  const onHeartClick = useCallback(() => {
    if (foodId == null) return;
    setOptimisticLike(!isLiked);
    setPending(true);
    handleFavourites(foodId);
  }, [foodId, handleFavourites, isLiked]);

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
          aria-label={uiLiked ? "Remove from favourites" : "Add to favourites"}
          icon={
            uiLiked ? <IoMdHeart size={26} /> : <IoMdHeartEmpty size={26} />
          }
          padding={1}
          variant="ghost"
          fontSize="24px"
          color={uiLiked ? "brand.500" : "grey.600"}
          _hover={{
            color: uiLiked ? "grey.600" : "brand.500",
          }}
          onClick={pending ? null : onHeartClick}
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
          <MdAddCircleOutline color="green" size={"16px"} onClick={onClick} />
        )}
      </HStack>
    </>
  );
};

const FoodCard = memo(
  MemoFoodCard,
  (prev, next) =>
    (prev.currentFood?.food_id ?? prev.currentFood?.id) ===
      (next.currentFood?.food_id ?? next.currentFood?.id) &&
    prev.context === next.context
);

export default FoodCard;
