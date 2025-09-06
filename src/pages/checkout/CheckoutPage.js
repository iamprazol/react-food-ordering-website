import {
  Box,
  Flex,
  Heading,
  Text,
  Textarea,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

// Components
import Cart from "../../features/carts/components/cart";
import TopLayout from "../../shared/ui/TopLayout";
import PaymentOptions from "../../features/checkout/components/PaymentOption";
import { useAuth } from "../../context/AuthContext";
import { useUserData } from "../../context/UserDataContext";

const CheckoutBody = () => {
  const {
    state: { user },
  } = useAuth();
  const {
    state: { address },
  } = useUserData();

  const isLoading = !address || !user;

  return (
    <Flex direction="column" justifyContent="left">
      <Box
        as="section"
        px={{ base: 20, md: 40 }}
        bg="gray.50"
        textAlign="left"
        borderBottom="1px solid #E7E7E7"
        borderTop="1px solid #E7E7E7"
        bgColor="#FAFAFA"
      >
        <Box px={{ base: 2, md: 8 }} paddingTop={{ base: 4, md: 12 }}>
          <Heading
            fontSize={{ base: "20px", md: "30px", lg: "40px" }}
            mb={4}
            fontWeight="400"
            lineHeight="1.2"
            color="#4a4a4a"
          >
            Checkout
          </Heading>
        </Box>
      </Box>

      <Box as="section" py={10} px={{ base: 4, md: 8 }} bg="#f7f7f9">
        <Box maxW="6xl" mx="auto" px={14} py={4} border="1px solid #E7E7E7">
          <Heading
            fontSize={{ base: "18px", md: "20px" }}
            color="#2d2c2c"
            fontWeight={600}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            ORDER DETAILS
          </Heading>
        </Box>

        <Box
          maxW="6xl"
          mx="auto"
          px={{ base: 4, md: 14 }}
          py={4}
          border="1px solid #E7E7E7"
          borderTop="none"
          fontWeight="500"
          bgColor="white"
        >
          {isLoading ? (
            <Flex gap={8}>
              <Box flex="0 0 60%">
                <Skeleton height="120px" mb={4} />
                <Skeleton height="120px" mb={4} />
                <Skeleton height="120px" mb={4} />
              </Box>
              <Box flex="1">
                <Skeleton height="300px" />
              </Box>
            </Flex>
          ) : (
            <Flex direction={{ base: "column", md: "row" }}>
              <Flex direction="column" gap={8} flex="0 0 60%">
                <Box>
                  <Text
                    fontSize={{ base: "14px", md: "16px" }}
                    mb={2}
                    textAlign={{ base: "center", md: "left" }}
                  >
                    DELIVERY ADDRESS
                  </Text>
                  <Box
                    bgColor="#FAFAFA"
                    border="1px solid #E7E7E7"
                    p={{ base: 4, md: 8 }}
                    color="#4A4A4A"
                    fontWeight="400"
                    fontSize={{ base: "12px", md: "14px" }}
                    width={{ base: "100%", md: "90%" }}
                  >
                    <Text>{address?.address_title?.toUpperCase()}</Text>
                    <Text>{user.first_name + " " + user.last_name}</Text>
                    <Text>{address.address_details}</Text>
                    <Text>Phone: {address.address_contact}</Text>
                    <Text>
                      Alternate Phone: {address.address_alternate_contact}
                    </Text>
                  </Box>
                </Box>

                <Box>
                  <Text
                    fontSize={{ base: "14px", md: "16px" }}
                    mb={2}
                    textAlign={{ base: "center", md: "left" }}
                  >
                    PAYMENT OPTIONS
                  </Text>
                  <Box
                    bgColor="#FAFAFA"
                    border="1px solid #E7E7E7"
                    p={{ base: 4, md: 8 }}
                    color="#4A4A4A"
                    fontWeight="400"
                    fontSize={{ base: "12px", md: "14px" }}
                    width={{ base: "100%", md: "90%" }}
                  >
                    <PaymentOptions />
                  </Box>
                </Box>

                <Box>
                  <Text
                    fontSize={{ base: "14px", md: "16px" }}
                    mb={2}
                    textAlign={{ base: "center", md: "left" }}
                  >
                    SPECIAL INSTRUCTIONS
                  </Text>
                  <Box
                    bgColor="#FAFAFA"
                    border="1px solid #E7E7E7"
                    p={{ base: 4, md: 8 }}
                    color="#4A4A4A"
                    fontWeight="400"
                    fontSize={{ base: "12px", md: "14px" }}
                    width={{ base: "100%", md: "90%" }}
                  >
                    <Textarea
                      fontSize={{ base: "12px", md: "14px" }}
                      placeholder="Please mention if there are special instruction for the delivery person. (eg. Beware of Dogs)"
                      id="order_special_instructions"
                      bgColor="white"
                    />
                  </Box>
                </Box>
              </Flex>

              <Cart
                position="relative"
                restaurantCharge={50}
                cartType="checkout"
              />
            </Flex>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

const CheckoutPage = () => {
  return <TopLayout element={<CheckoutBody />} />;
};

export default CheckoutPage;
