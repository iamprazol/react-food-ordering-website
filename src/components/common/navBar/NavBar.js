import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Input,
  IconButton,
  Button as ChakraButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdOutlineSearch } from "react-icons/md";

function NavBar({ onClick, onKeyPress }) {
  const [searchText, setSearchText] = useState("");

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      px={{ base: 4, md: 5 }}
      bg="white"
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex="999"
    >
      <Box>
        <Image
          src="http://localhost:8000/images/logo/foodie.png"
          alt="Foodie Logo"
          width={{ base: "140px", md: "160px" }}
          height={{ base: "50px", md: "70px" }}
          objectFit="contain"
        />
      </Box>

      <Flex
        flex="1"
        align="center"
        justify="center"
        maxW="700px"
        px={4}
        display={{ base: "none", md: "flex" }}
      >
        <Flex
          align="center"
          borderWidth="1px"
          borderRadius="md"
          overflow="hidden"
          bg="gray.50"
          w="100%"
        >
          <IconButton
            aria-label="Search"
            icon={<MdOutlineSearch />}
            variant="ghost"
            fontSize="xl"
          />
          <Input
            placeholder="Bajeko Sekuwa"
            border="none"
            focusBorderColor="transparent"
            onKeyPress={(e) => onKeyPress(e)}
            onChange={(e) => setSearchText(e.target.value)}
            bg="white"
            rounded="full"
            shadow="sm"
            _placeholder={{ color: "gray.400" }}
          />
        </Flex>

        <ChakraButton
          colorScheme="blue"
          ml={4}
          px={8}
          bgColor="brand.500"
          borderColor="brand.500"
          _hover={{ bgColor: "brand.600" }}
          onClick={() => onClick("find_restaurant", searchText)}
        >
          Find Restaurant
        </ChakraButton>
      </Flex>

      <Flex align="center" gap={2}>
        <ChakraButton
          variant="outline"
          colorScheme="blue"
          onClick={() => onClick("login")}
        >
          Login
        </ChakraButton>
        <ChakraButton
          variant="solid"
          colorScheme="blue"
          bgColor="brand.500"
          borderColor="brand.500"
          _hover={{ bgColor: "brand.600" }}
          onClick={() => onClick("register")}
        >
          Register
        </ChakraButton>
      </Flex>
    </Flex>
  );
}

export default NavBar;
