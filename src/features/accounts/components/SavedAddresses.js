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
import { useApp } from "../../../context/AppContext";
import InputHandler from "../../../components/common/inputHandler/InputHandler";

const SavedAddresses = () => {
  const {
    state: { token, address },
    dispatch,
  } = useApp();

  const [savedAddresses, setSavedAddresses] = useState({
    id: address.id,
    address: address.address,
    address_title: address.address_title,
    address_contact: address.address_contact,
    address_alternate_contact: address.address_alternate_contact,
    address_details: address.address_details,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleInputChange = (data) => {
    const { name, value } = data;
    setSavedAddresses((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    updateAddress();
  };

  const updateAddress = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/update-address`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(savedAddresses),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      toast({
        title: "Address Update failed",
        description: "Your Address update has failed. Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      dispatch({
        type: "SET_ADDRESS",
        payload: { ...address, ...savedAddresses },
      });

      toast({
        title: "Address Updated",
        description: "Your Address has been updated successfully.",
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
        <form onSubmit={handleSubmit}>
          <VStack spacing={10} flex="1" align="stretch">
            <HStack spacing={6}>
              <FormControl>
                <FormLabel fontSize="0.75rem" color="#9B9B9B">
                  ADDRESS TITLE
                </FormLabel>
                <InputHandler
                  fieldSetting={{
                    type: "text",
                    value: savedAddresses.address_title
                      ? savedAddresses.address_title
                      : "",
                    required: false,
                    id: `rfoa_user_address_title`,
                    name: "address_title",
                  }}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="0.75rem" color="#9B9B9B">
                  ADDRESS
                </FormLabel>
                <InputHandler
                  fieldSetting={{
                    type: "text",
                    value: savedAddresses.address ? savedAddresses.address : "",
                    required: false,
                    placeholder: "Doe",
                    id: `rfoa_user_address`,
                    name: "address",
                  }}
                  onChange={handleInputChange}
                />
              </FormControl>
            </HStack>

            <HStack spacing={6}>
              <FormControl>
                <FormLabel fontSize="0.75rem" color="#9B9B9B">
                  ADDRESS CONTACT
                </FormLabel>
                <InputHandler
                  fieldSetting={{
                    type: "text",
                    value: savedAddresses.address_contact
                      ? savedAddresses.address_contact
                      : "",
                    required: false,
                    placeholder: "+97798090890",
                    id: `rfoa_user_address_contact`,
                    name: "address_contact",
                  }}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="0.75rem" color="#9B9B9B">
                  ADDRESS ALTERNATE CONTACT
                </FormLabel>
                <InputHandler
                  fieldSetting={{
                    type: "text",
                    value: savedAddresses.address_alternate_contact
                      ? savedAddresses.address_alternate_contact
                      : "",
                    required: false,
                    placeholder: "",
                    id: `rfoa_user_address_alternate_contact`,
                    name: "address_alternate_contact",
                  }}
                  onChange={handleInputChange}
                />
              </FormControl>
            </HStack>
            <HStack spacing={6}>
              <FormControl>
                <FormLabel fontSize="0.75rem" color="#9B9B9B">
                  ADDRESS DETAILS
                </FormLabel>
                <InputHandler
                  fieldSetting={{
                    type: "textarea",
                    value: savedAddresses.address_details
                      ? savedAddresses.address_details
                      : "",
                    required: false,
                    placeholder: "Just aside from the landmark.",
                    id: `rfoa_user_address_details`,
                    name: "address_details",
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

export default SavedAddresses;
