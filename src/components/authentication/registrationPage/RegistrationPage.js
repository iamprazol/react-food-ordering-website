import React, { useState } from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  Flex,
  useToast,
  Text,
  Spinner,
  Button as ChakraButton,
} from "@chakra-ui/react";

import InputHandler from "../../common/inputHandler/InputHandler";
import Buttons from "../../common/buttons/Buttons";
import {
  MdEmail,
  MdLock,
  MdOutlinePerson,
  MdContactPhone,
} from "react-icons/md";

import { useRegisterUser } from "../../../hooks/useRegisterUser/useRegisterUser"; // new

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
        description: "You have been successfully registered into the site.",
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
    register(userData);
  };

  const inputFields = [
    {
      name: "first_name",
      placeholder: "First Name",
      icon: <MdOutlinePerson />,
    },
    {
      name: "last_name",
      placeholder: "Last Name",
      icon: <MdOutlinePerson />,
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
    <Box p={14} bg="white" maxW="800px" mx="auto" borderRadius="md">
      <Heading fontWeight="500" size="xl" mb={10} textAlign="center">
        Member Register
      </Heading>

      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
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
            px={16}
            bgColor="brand.500"
            borderColor="brand.500"
            _hover={{ bgColor: "brand.600" }}
            isLoading={isPending}
            loadingText="Submitting"
          >
            Submit
          </ChakraButton>
        </Flex>
      </form>
    </Box>
  );
};

export default RegistrationPage;
