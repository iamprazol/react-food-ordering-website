import React from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  Badge,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Import Icons.
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";

// Import Components.
import IconContainer from "../iconContainer/IconContainer";

const Cards = ({
  id,
  name,
  description,
  image,
  delivery_hours,
  minimum_order,
  discount,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
    >
      <Box position="relative">
        <Image src={image} alt={name} objectFit="cover" w="100%" h="180px" />

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
        <Box position="absolute" top="2" right="2">
          <IconContainer
            icon={<IoMdHeartEmpty />}
            fontSizeClass="icon--medium"
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
