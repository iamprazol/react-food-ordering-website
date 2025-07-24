import React from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  VisuallyHidden,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";

const BrowseByCategoryNav = ({
  category_id,
  image,
  restaurant_id,
  title,
  id,
}) => {
  const imageUrl = `${image}`;

  return (
    <NavLink to={`/restaurant/${restaurant_id}`}>
      <Box
        as="label"
        htmlFor={category_id}
        cursor="pointer"
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderColor="gray.200"
        textAlign="center"
        w={36}
        transition="transform 0.3s ease-in-out"
        _hover={{ transform: "scale(1.2)" }}
      >
        <VisuallyHidden
          as="input"
          type="radio"
          name="slideItem"
          id={category_id}
        />

        <Image
          boxSize="130px"
          objectFit="cover"
          borderRadius="full"
          src={imageUrl}
          alt={title}
          mb={2}
        />

        <Text fontSize="sm" noOfLines={1}>
          {title}
        </Text>
      </Box>
    </NavLink>
  );
};

export default BrowseByCategoryNav;
