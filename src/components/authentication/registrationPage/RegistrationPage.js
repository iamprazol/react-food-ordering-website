import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions";

import {
  Box,
  SimpleGrid,
  Heading,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";

import InputHandler from "../../common/inputHandler/InputHandler";

import {
  MdEmail,
  MdLock,
  MdOutlinePerson,
  MdContactPhone,
} from "react-icons/md";

import Buttons from "../../common/buttons/Buttons";

const ConnectedRegistrationPage = (props) => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    c_password: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const { register, error } = props;

  const toast = useToast();

  // Show errors from props if any
  useEffect(() => {
    if (error && Object.keys(error).length > 0) {
      setErrors(error);
      toast({
        title: "Registration Error",
        description: "Please fix the errors and try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setErrors({});
    register(userData);
  };

  return (
    <Box p={20} bg="white" className="rfow-popup__register">
      <Heading as="h1" size="xl" mb={8} textAlign="center">
        Member Register
      </Heading>

      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
          <Flex
            align="start"
            spacing={2}
            className={`rfow-field`}
            alignItems={"center"}
          >
            <InputHandler
              fieldSetting={{
                type: "text",
                value: userData.first_name,
                required: false,
                placeholder: "First Name",
                id: "user_first_name",
                name: "first_name",
                error: errors.first_name || "",
                icon: <MdOutlinePerson />,
              }}
              onChange={handleInputChange}
            />
          </Flex>

          <Flex
            align="start"
            spacing={2}
            className={`rfow-field`}
            alignItems={"center"}
          >
            <InputHandler
              fieldSetting={{
                type: "text",
                value: userData.last_name,
                required: false,
                placeholder: "Last Name",
                id: `user_last_name`,
                name: "last_name",
                error: errors.last_name || "",
                icon: <MdOutlinePerson />,
              }}
              onChange={handleInputChange}
            />
          </Flex>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
          <Flex
            align="start"
            spacing={2}
            className={`rfow-field`}
            alignItems={"center"}
          >
            <InputHandler
              fieldSetting={{
                type: "email",
                value: userData.email,
                required: false,
                placeholder: "Email",
                id: `user_email`,
                name: "email",
                error: errors.email || "",
                icon: <MdEmail />,
              }}
              onChange={handleInputChange}
            />
          </Flex>

          <Flex
            align="start"
            spacing={2}
            className={`rfow-field`}
            alignItems={"center"}
          >
            <InputHandler
              fieldSetting={{
                type: "text",
                value: userData.phone,
                required: false,
                placeholder: "Phone Number",
                id: `user_phone_number`,
                name: "phone",
                error: errors.phone || "",
                icon: <MdContactPhone />,
              }}
              onChange={handleInputChange}
            />
          </Flex>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
          <Flex
            align="start"
            spacing={2}
            className={`rfow-field`}
            alignItems={"center"}
          >
            <InputHandler
              fieldSetting={{
                type: "password",
                value: userData.password,
                required: false,
                placeholder: "Password",
                id: `user_password`,
                name: "password",
                error: errors.password || "",
                icon: <MdLock />,
              }}
              onChange={handleInputChange}
            />
          </Flex>

          <Flex
            align="start"
            spacing={2}
            className={`rfow-field`}
            alignItems={"center"}
          >
            <InputHandler
              fieldSetting={{
                type: "password",
                value: userData.c_password,
                required: false,
                placeholder: "Confirm Password",
                id: `user_confirm_password`,
                name: "c_password",
                error: errors.c_password || "",
                icon: <MdLock />,
              }}
              onChange={handleInputChange}
            />
          </Flex>
        </SimpleGrid>

        <Buttons
          type="submit"
          variant="primary"
          title="Register"
          size="large"
          isDisabled={submitted && Object.keys(errors).length > 0}
          onClick={handleSubmit}
          width="full"
        />
      </form>
    </Box>
  );
};

function mapState(state) {
  const { registering, error } = state.registration;

  return { registering, error };
}

const actionCreators = {
  register: userActions.register,
};

const RegistrationPage = connect(
  mapState,
  actionCreators
)(ConnectedRegistrationPage);

export default RegistrationPage;
