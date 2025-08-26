import {
  Box,
  Flex,
  chakra,
  Heading,
  Text,
  Badge,
  Progress,
} from "@chakra-ui/react";

// Components
import EmptyCartImage from "../../../shared/assets/images/cart-empty.png";

const LazyImage = chakra("img", { baseStyle: { loading: "lazy" } });

// Import Components.
function OrdersTab({ myOrders }) {
  myOrders = myOrders.sort((a, b) => b.id - a.id);

  const getOrderStatus = (myOrder) => {
    const status = myOrder.status;

    if (status === "CREATED" || status === "SENT_TO_RESTAURANT") {
      return {
        bgColor: "#cce5ff",
        color: "#0066cc",
        text: "Order Placed",
      };
    } else if (status === "ACCEPTED") {
      return {
        bgColor: "#cce5ff",
        color: "#0066cc",
        text: "Order Accepted",
      };
    } else if (status === "REJECTED") {
      return {
        bgColor: "#f8d7da",
        color: "#721c24",
        text: "Order Rejected",
      };
    } else if (status === "READY") {
      return {
        bgColor: "#cce5ff",
        color: "#0066cc",
        text: "Order Ready",
      };
    } else if (status === "PICKED_UP") {
      return {
        bgColor: "#cce5ff",
        color: "#0066cc",
        text: "Order Picked Up",
      };
    } else if (status === "ON_THE_WAY") {
      return {
        bgColor: "#cce5ff",
        color: "#0066cc",
        text: "On The Way",
      };
    } else if (status === "CANCELLED") {
      return {
        bgColor: "#f8d7da",
        color: "#721c24",
        text: "Cancelled",
      };
    } else {
      return {
        bgColor: "#e8f5e8",
        color: "#2d7738",
        text: "Delivered",
      };
    }
  };

  const formatDate = (createdAt) => {
    const kathmanduOptions = {
      timeZone: "Asia/Kathmandu",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    const date = new Date(createdAt.date); // createdAt.date is like "2025-08-02 09:40:03.000000"

    const formatter = new Intl.DateTimeFormat("en-US", kathmanduOptions);
    const parts = formatter.formatToParts(date);

    const getPart = (type) => parts.find((p) => p.type === type)?.value;

    const day = parseInt(getPart("day"));
    const month = getPart("month");
    const year = getPart("year");
    const hour = getPart("hour");
    const minute = getPart("minute");
    const dayPeriod = getPart("dayPeriod");

    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return `${getOrdinal(
      day
    )} ${month}, ${year} at ${hour}:${minute} ${dayPeriod}`;
  };

  const parseOrderedItems = (order) => {
    const orderDetails = JSON.parse(order.details);
    let detail = "";

    orderDetails.map((item, idx) => {
      detail += item.quantity + "x " + item.food_name;

      if (idx !== orderDetails.length - 1) {
        detail += ", ";
      }
    });
    return detail;
  };

  function getDeliveryProgress(myOrder) {
    if (
      myOrder.status === "CREATED" ||
      myOrder.status === "SENT_TO_RESTAURANT"
    ) {
      return 20;
    } else if (myOrder.status === "ACCEPTED") {
      return 40;
    } else if (myOrder.status === "READY") {
      return 60;
    } else if (myOrder.status === "PICKED_UP") {
      return 70;
    } else if (myOrder.status === "ON_THE_WAY") {
      return 80;
    } else {
      return 100;
    }
  }

  return (
    <Flex direction={"column"} gap={5}>
      {myOrders.length > 0 ? (
        myOrders.map((myOrder, idx) => {
          return (
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              bg="white"
              boxShadow="md"
              key={idx}
            >
              <Flex
                justifyContent={"space-between"}
                p="20px"
                borderBottom="1px solid #f0f0f0"
              >
                <Flex direction={"column"}>
                  <Heading
                    fontSize={"18px"}
                    fontWeight={"600"}
                    mb="5px"
                    color={"#333"}
                  >
                    {" "}
                    Order #{myOrder.id}
                  </Heading>
                  <Text color="#666" fontSize={"14px"}>
                    Placed on {formatDate(myOrder.created_at)}{" "}
                  </Text>
                </Flex>
                <Badge
                  bgColor={getOrderStatus(myOrder).bgColor}
                  color={getOrderStatus(myOrder).color}
                  fontSize="12px"
                  fontWeight={"500"}
                  px={3}
                  py={1}
                  borderRadius="xl"
                  height="50%"
                >
                  {getOrderStatus(myOrder).text}
                </Badge>
              </Flex>
              <Flex
                direction={"column"}
                className="order-content"
                p="20px"
                gap={5}
              >
                <Flex className="restaurant-info" gap="15px" align={"center"}>
                  <Box position="relative">
                    <LazyImage
                      src={myOrder.restaurant_image}
                      alt={myOrder.restaurant_name}
                      objectFit="cover"
                      h="60px"
                      w="60px"
                      borderRadius="8px"
                    />
                  </Box>
                  <Flex direction="column">
                    <Text
                      fontSize={"16px"}
                      fontWeight={"600"}
                      color="#333"
                      marginBottom={"5px"}
                    >
                      {myOrder.restaurant_name}
                    </Text>
                    <Text fontSize={"14px"} color="#666">
                      {myOrder.restaurant_address}
                    </Text>
                  </Flex>
                </Flex>
                <Progress
                  value={getDeliveryProgress(myOrder)}
                  size="xs"
                  colorScheme="pink"
                />
                <Flex className="restaurant-info" gap="15px" align={"center"}>
                  <Text fontSize={"14px"} color="#666">
                    {parseOrderedItems(myOrder)}
                  </Text>
                </Flex>
                <Flex className="order-footer" gap="15px" align={"center"}>
                  <Text fontSize={"18px"} fontWeight={"600"} color="#333">
                    Rs. {myOrder.total_price}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          );
        })
      ) : (
        <Flex
          direction={"column"}
          alignItems="center"
          justifyContent="center"
          p={6}
        >
          <LazyImage src={EmptyCartImage} alt="Empty Cart" width="25%" />
          <Text fontSize="lg" color="gray.500" mt={4}>
            Your orders page is empty.
          </Text>
          <Text fontSize="lg" color="gray.500" mt={4}>
            Add item to your cart and checkout to get started.
          </Text>
        </Flex>
      )}
    </Flex>
  );
}

export default OrdersTab;
