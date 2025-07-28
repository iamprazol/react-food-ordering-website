import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  useToast,
  Button as ChakraButton,
} from "@chakra-ui/react";

import InputHandler from "../../common/inputHandler/InputHandler";
import FoodieImage from "../../../assets/images/foodie.png";
import IconContainer from "../../common/iconContainer/IconContainer";

import { MdEmail, MdLock } from "react-icons/md";
import Buttons from "../../common/buttons/Buttons";
import { useLoginUser } from "../../../hooks/useLoginUser/useLoginUser";

function LoginPage({ onClick }) {
  const toast = useToast();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const { mutate: login, isPending } = useLoginUser(
    () => {
      toast({
        title: "Login Successful",
        description: "You have been successfully logged-in into the site.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setErrors({});
      onClick("login");
    },
    (error) => {
      setErrors(error.data || {});

      toast({
        title: "Login Error",
        description: "Please fix the errors and try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  );

  const handleInputChange = (data) => {
    const { name, value } = data;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    login(userData);
  };

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
        <Heading fontWeight="500" size="xl" mb={8} textAlign="center">
          Member Login
        </Heading>

        <form onSubmit={handleSubmit}>
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
                  name: "email",
                }}
                onChange={handleInputChange}
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
                  name: "password",
                }}
                onChange={handleInputChange}
              />
            </Flex>
          </Box>

          <ChakraButton
            type="submit"
            colorScheme="blue"
            bgColor="brand.500"
            borderColor="brand.500"
            _hover={{ bgColor: "brand.600" }}
            loadingText="Logging In"
            isLoading={isPending}
            width="100%"
          >
            LOGIN
          </ChakraButton>
        </form>
        <Flex justifyContent="space-between" mt={6} mb={4} fontSize="sm">
          <Text>Forgot</Text>
          <Link href="/forgot-password" color="blue.500" fontWeight="semibold">
            Username / Password?
          </Link>
        </Flex>

        <Link
          alignSelf="flex-end"
          color="blue.500"
          fontWeight="semibold"
          mt={8}
          onClick={() => onClick("register")}
        >
          Create your account
        </Link>
      </Box>
    </Flex>
  );
}

export default LoginPage;
