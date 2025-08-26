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
import { useApp } from "../../context/AppContext";
import Cart from "../../features/carts/components/cart";
import TopLayout from "../../components/common/topLayout/TopLayout";
import PaymentOptions from "../../components/checkoutPage/paymentOption/PaymentOption";

const CheckoutBody = () => {
  const {
    state: { address, user },
  } = useApp();

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
            fontSize="20px"
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
          px={14}
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
            <Flex>
              <Flex direction="column" gap={8} flex="0 0 60%">
                <Box>
                  <Text fontSize="16px" mb={2}>
                    DELIVERY ADDRESS
                  </Text>
                  <Box
                    bgColor="#FAFAFA"
                    border="1px solid #E7E7E7"
                    p={8}
                    color="#4A4A4A"
                    fontWeight="400"
                    fontSize="0.875rem"
                    width="90%"
                  >
                    <Text>{address.address_title.toUpperCase()}</Text>
                    <Text>{user.first_name + " " + user.last_name}</Text>
                    <Text>{address.address_details}</Text>
                    <Text>Phone: {address.address_contact}</Text>
                    <Text>
                      Alternate Phone: {address.address_alternate_contact}
                    </Text>
                  </Box>
                </Box>

                <Box>
                  <Text fontSize="16px" mb={2}>
                    PAYMENT OPTIONS
                  </Text>
                  <Box
                    bgColor="#FAFAFA"
                    border="1px solid #E7E7E7"
                    p={8}
                    color="#4A4A4A"
                    fontWeight="400"
                    fontSize="0.875rem"
                    width="90%"
                  >
                    <PaymentOptions />
                  </Box>
                </Box>

                <Box>
                  <Text fontSize="16px" mb={2}>
                    SPECIAL INSTRUCTIONS
                  </Text>
                  <Box
                    bgColor="#FAFAFA"
                    border="1px solid #E7E7E7"
                    p={8}
                    color="#4A4A4A"
                    fontWeight="400"
                    fontSize="0.875rem"
                    width="90%"
                  >
                    <Textarea
                      placeholder="Please mention if there are special instruction for the delivery person. (eg. Beware of Dogs)"
                      id="order_special_instructions"
                      fontSize="sm"
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
