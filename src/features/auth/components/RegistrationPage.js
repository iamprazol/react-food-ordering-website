import React, { useState } from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  Flex,
  useToast,
  Button as ChakraButton,
} from "@chakra-ui/react";

import InputHandler from "../../../widgets/inputHandler/InputHandler";
import { MdEmail, MdLock, MdContactPhone } from "react-icons/md";

import { UserIcon } from "../../../widgets/icon/Icon";

import { useRegisterUser } from "../hooks/useRegisterUser";

const RegistrationPage = () => {
  const toast = useToast();

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    c_password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const { mutate: register, isPending } = useRegisterUser(
    () => {
      toast({
        title: "Registration Successful",
        description: (
          <Box fontSize={{ base: "12px", md: "14px" }}>
            You have been successfully registered into the site.
          </Box>
        ),
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setErrors({});
    },
    (error) => {
      setErrors(error.data || {});

      toast({
        title: "Registration Error",
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
    register(userData);
  };

  const inputFields = [
    {
      name: "first_name",
      placeholder: "First Name",
      icon: <UserIcon />,
    },
    {
      name: "last_name",
      placeholder: "Last Name",
      icon: <UserIcon />,
    },
    {
      name: "email",
      placeholder: "Email",
      type: "email",
      icon: <MdEmail />,
    },
    {
      name: "phone",
      placeholder: "Phone Number",
      type: "text",
      icon: <MdContactPhone />,
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
      icon: <MdLock />,
    },
    {
      name: "c_password",
      placeholder: "Confirm Password",
      type: "password",
      icon: <MdLock />,
    },
  ];

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      maxW="900px"
      mx="auto"
      borderRadius="md"
      overflow="hidden"
      p={{ base: 0, md: 6 }}
    >
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
          Member Register
        </Heading>
        <form onSubmit={handleSubmit}>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 4, md: 6 }}
            mb={8}
          >
            {inputFields.map((field, idx) => (
              <Flex key={idx} direction="column" className="rfow-field" mb={2}>
                <InputHandler
                  fieldSetting={{
                    type: field.type || "text",
                    value: userData[field.name],
                    required: false,
                    placeholder: field.placeholder,
                    id: `user_${field.name}`,
                    name: field.name,
                    error: errors[field.name] || "",
                    icon: field.icon,
                  }}
                  onChange={handleInputChange}
                />
              </Flex>
            ))}
          </SimpleGrid>
          <Flex justifyContent={"center"} mt={10}>
            <ChakraButton
              type="submit"
              colorScheme="blue"
              bgColor="brand.500"
              borderColor="brand.500"
              _hover={{ bgColor: "brand.600" }}
              loadingText="Submitting"
              isLoading={isPending}
              width="100%"
              height={8}
              fontSize={{ base: "14px", md: "16px" }}
            >
              Submit
            </ChakraButton>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default RegistrationPage;
