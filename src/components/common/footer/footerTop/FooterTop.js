import React from "react";
import { Box, Flex, Text, useColorModeValue, Image } from "@chakra-ui/react";
import {
  MdPayment,
  MdOutlineCardGiftcard,
  MdOutlineAssignment,
  MdApps,
  MdOutlineSupportAgent,
  MdAccountCircle,
} from "react-icons/md";

// Utility icon box
const IconBox = ({ icon, text }) => {
  const iconColor = useColorModeValue("brand.500", "brand.300");

  return (
    <Flex
      direction="column"
      align="center"
      textAlign="center"
      gap={2}
      flex="1"
      minW={{ base: "40%", sm: "30%", md: "15%" }}
    >
      <Box fontSize="6xl" color={iconColor}>
        {icon}
      </Box>
      <Text color="white" fontSize="sm">
        {text}
      </Text>
    </Flex>
  );
};

const FooterTop = () => {
  return (
    <Box bg="black" py={10}>
      <Flex
        wrap="wrap"
        justify="center"
        gap={6}
        maxW="7xl"
        mx="auto"
        textAlign="center"
      >
        <IconBox icon={<MdPayment />} text="100% Payment Secured" />
        <IconBox icon={<MdAccountCircle />} text="Support lots of Payments" />
        <IconBox
          icon={<MdOutlineSupportAgent />}
          text="24/7 Customer Support"
        />
        <IconBox
          icon={<MdOutlineCardGiftcard />}
          text="Free Delivery with Rs.5000"
        />
        <IconBox icon={<MdOutlineAssignment />} text="Best Price Guaranteed" />
        <IconBox icon={<MdApps />} text="Mobile Apps Ready" />
      </Flex>
    </Box>
  );
};

export default FooterTop;
