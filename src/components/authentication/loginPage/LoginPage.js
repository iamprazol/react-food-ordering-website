import React from "react";
import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";

import InputHandler from "../../common/inputHandler/InputHandler";
import FoodieImage from "../../../assets/images/foodie.png";
import IconContainer from "../../common/iconContainer/IconContainer";

import { MdEmail, MdLock } from "react-icons/md";
import Buttons from "../../common/buttons/Buttons";

function LoginPage() {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      maxW="900px"
      mx="auto"
      borderRadius="md"
      overflow="hidden"
      p={6}
    >
      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="white"
      >
        <Image src={FoodieImage} alt="foodie" maxW="70%" />
      </Box>
      <Box
        flex="1"
        bg="white"
        p={{ base: 6, md: 10 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading as="h1" size="xl" mb={6}>
          Member Login
        </Heading>

        <Box mb={4}>
          <Flex align="center" mb={2} gap={3}>
            <InputHandler
              fieldSetting={{
                type: "email",
                value: "",
                required: false,
                placeholder: "iamprazol@gmail.com",
                id: `user_login_email`,
                icon: <MdEmail />,
              }}
            />
          </Flex>
        </Box>

        <Box mb={6}>
          <Flex align="center" gap={3}>
            <InputHandler
              fieldSetting={{
                type: "password",
                value: "",
                required: false,
                placeholder: "",
                id: `user_login_password`,
                icon: <MdLock />,
              }}
            />
          </Flex>
        </Box>

        <Buttons variant="primary" size="large" title="LOGIN" />

        <Flex justifyContent="space-between" mt={6} mb={4} fontSize="sm">
          <Text>Forgot</Text>
          <Link href="/forgot-password" color="blue.500" fontWeight="semibold">
            Username / Password?
          </Link>
        </Flex>

        <Link
          href="/register"
          alignSelf="flex-end"
          color="blue.500"
          fontWeight="semibold"
          mt={8}
        >
          Create your account
        </Link>
      </Box>
    </Flex>
  );
}

export default LoginPage;
