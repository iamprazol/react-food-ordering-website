import React from "react";
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
} from "@chakra-ui/react";
import {
  MdOutlineStarPurple500,
  MdOutlineAddLocationAlt,
} from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";

function RestaurantDetails(props) {
  const {
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
        <Image
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
              as={MdOutlineStarPurple500}
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
        <Icon as={IoMdHeartEmpty} boxSize={6} color="gray.600" />
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
