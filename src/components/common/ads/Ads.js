import React from "react";
import { Box, Flex, Text, Button as ChakraButton } from "@chakra-ui/react";

const Ads = ({ adsText, image, link, buttonText }) => {
  return (
    <Box my={10}>
      <Flex
        align="center"
        justify="center"
        minH="50px"
        bgImage={`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image})`}
        bgSize="cover"
        bgPosition="center"
        borderRadius="md"
        color="white"
        maxW="7xl"
        mx="auto"
      >
        <Box
          textAlign="center"
          display="flex"
          justifyContent="space-around"
          p={6}
          gap={20}
          alignItems="baseline"
        >
          <Text fontSize="2xl" mb={4} fontWeight="600">
            {adsText}
          </Text>
          <ChakraButton
            as="a"
            href={link}
            bg="red.500"
            _hover={{ bg: "red.600" }}
            color="white"
            px={6}
            py={4}
            fontWeight="bold"
            borderRadius="full"
          >
            {buttonText}
          </ChakraButton>
        </Box>
      </Flex>
    </Box>
  );
};

export default Ads;
