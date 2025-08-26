import { Box, Heading, Text } from "@chakra-ui/react";

// Components
import TopLayout from "../../components/common/topLayout/TopLayout";
import OrdersLayout from "../../features/orders/components/OrdersLayout";

const OrderHeader = () => {
  return (
    <>
      <Box
        as="section"
        px={{ base: 20, md: 40 }}
        bg="gray.50"
        textAlign="left"
        borderTop="1px solid #E7E7E7"
      >
        <Box px={{ base: 2, md: 8 }} paddingTop={{ base: 4, md: 12 }}>
          <Heading
            fontSize={{ base: "20px", md: "30px", lg: "40px" }}
            mb={4}
            fontWeight="400"
            lineHeight="1.2"
            color={"#4a4a4a"}
          >
            My Orders
          </Heading>
          <Text fontSize={"16px"} color="#666">
            Track your food orders and reorder your favorites
          </Text>
        </Box>
      </Box>
      <Box as="section" py={10} px={{ base: 4, md: 8 }} bg="#f7f7f9">
        <Box maxW="7xl" mx="auto" px={14} py={4}>
          <OrdersLayout />
        </Box>
      </Box>
    </>
  );
};
const OrdersPage = () => {
  return <TopLayout element={<OrderHeader />}></TopLayout>;
};

export default OrdersPage;
