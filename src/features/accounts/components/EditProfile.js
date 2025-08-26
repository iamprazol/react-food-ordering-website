import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Avatar,
  VStack,
  HStack,
  Button as ChakraButton,
  useToast,
} from "@chakra-ui/react";
import InputHandler from "../../../widgets/inputHandler/InputHandler";
import { useAuth } from "../../../context/AuthContext";

const EditProfile = () => {
  const {
    state: { user, token },
    dispatch,
  } = useAuth();

  const [userData, setUserData] = useState({
    picture: user.picture,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => {}, [user]);

  const handleInputChange = (data) => {
    const { name, value } = data;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    profileEdit();
  };

  const profileEdit = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/update-profile`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      toast({
        title: "Profile Update failed",
        description: "Your profile update has failed. Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      dispatch({ type: "SET_USER", payload: { ...user, ...userData } });

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }

    setIsSubmitting(false);
    return data;
  };

  return (
    <Box mx="20px">
      <Flex direction="column" gap={10}>
        <VStack align="left">
          <FormLabel fontSize="0.75rem" color="#9B9B9B">
            PROFILE PICTURE
          </FormLabel>
          <Avatar size="xl" name="Prajjwal Poudel" src={userData.picture} />
        </VStack>

        <form onSubmit={handleSubmit}>
          <VStack spacing={10} flex="1" align="stretch">
            <HStack spacing={6}>
              <FormControl>
                <FormLabel fontSize="0.75rem" color="#9B9B9B">
                  FIRSTNAME
                </FormLabel>
                <InputHandler
                  fieldSetting={{
                    type: "text",
                    value: userData.first_name ? userData.first_name : "",
                    required: false,
                    placeholder: "John",
                    id: `rfoa_user_first_name`,
                    name: "first_name",
                  }}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="0.75rem" color="#9B9B9B">
                  LASTNAME
                </FormLabel>
                <InputHandler
                  fieldSetting={{
                    type: "text",
                    value: userData.last_name ? userData.last_name : "",
                    required: false,
                    placeholder: "Doe",
                    id: `rfoa_user_last_name`,
                    name: "last_name",
                  }}
                  onChange={handleInputChange}
                />
              </FormControl>
            </HStack>

            <HStack spacing={6}>
              <FormControl>
                <FormLabel fontSize="0.75rem" color="#9B9B9B">
                  PHONE NUMBER
                </FormLabel>
                <InputHandler
                  fieldSetting={{
                    type: "text",
                    value: userData.phone ? userData.phone : "",
                    required: false,
                    placeholder: "+977984560436",
                    id: `rfoa_user_phone`,
                    name: "phone",
                  }}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl isReadOnly>
                <FormLabel fontSize="0.75rem" color="#9B9B9B">
                  EMAIL
                </FormLabel>
                <InputHandler
                  fieldSetting={{
                    type: "email",
                    value: userData.email ? userData.email : "",
                    required: false,
                    placeholder: "abc@gmail.com",
                    id: `rfoa_user_email`,
                    name: "email",
                  }}
                  onChange={handleInputChange}
                />
              </FormControl>
            </HStack>

            <HStack spacing={4} justify="flex-start">
              <ChakraButton
                type="submit"
                colorScheme="blue"
                bgColor="brand.500"
                borderColor="brand.500"
                _hover={{ bgColor: "brand.600" }}
                loadingText="Saving"
                isLoading={isSubmitting}
                width="100%"
              >
                Save
              </ChakraButton>
            </HStack>
          </VStack>
        </form>
      </Flex>
    </Box>
  );
};

export default EditProfile;
