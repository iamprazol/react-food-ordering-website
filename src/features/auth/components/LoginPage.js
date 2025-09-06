import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  chakra,
  Link,
  Text,
  useToast,
  Button as ChakraButton,
} from "@chakra-ui/react";

import InputHandler from "../../../widgets/inputHandler/InputHandler";
import FoodieImage from "../../../shared/assets/images/foodie.png";
import { MdEmail, MdLock } from "react-icons/md";
import { useLoginUser } from "../hooks/useLoginUser";
import { useApp } from "../../../context/AppContext";

const LazyImage = chakra("img", { baseStyle: { loading: "lazy" } });

function LoginPage({ onClick }) {
  const toast = useToast();
  const {
    state: { isMobile },
  } = useApp();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const { mutate: login, isPending } = useLoginUser(
    () => {
      toast({
        title: "Login Successful",
        description: (
          <Box fontSize={{ base: "12px", md: "14px" }}>
            You have been successfully logged-in into the site.
          </Box>
        ),
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
        description: (
          <Box fontSize={{ base: "12px", md: "14px" }}>
            Please fix the errors and try again.
          </Box>
        ),
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
      p={{ base: 0, md: 6 }}
    >
      {isMobile ? (
        ""
      ) : (
        <Box
          flex="1"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="white"
        >
          <LazyImage src={FoodieImage} alt="foodie" maxW="70%" />
        </Box>
      )}
      <Box
        flex="1"
        bg="white"
        p={{ base: 6, md: 10 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading
          fontWeight="500"
          fontSize={{ base: "24px", md: "28px" }}
          mb={8}
          textAlign="center"
        >
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
                  error: errors["email"] || "",
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
                  error: errors["password"] || "",
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
            height={8}
            fontSize={{ base: "14px", md: "16px" }}
          >
            LOGIN
          </ChakraButton>
        </form>

        <Link
          color="blue.500"
          fontWeight="semibold"
          onClick={() => onClick("register")}
          fontSize={{ base: "12px", md: "14px" }}
          textAlign={"center"}
          mt={6}
          mb={4}
          alignSelf="center"
        >
          Create your account
        </Link>
      </Box>
    </Flex>
  );
}

export default LoginPage;
