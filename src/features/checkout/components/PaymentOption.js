import { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";

// Components
import StripeWrapper from "./stripe-element/StripeWrapper";
import { useUserData } from "../../../context/UserDataContext";
import { useApp } from "../../../context/AppContext";

const PaymentOptions = () => {
  const {
    state: { orders, paymentIntent },
    dispatch,
  } = useUserData();
  const {
    state: { isMobile },
  } = useApp();
  const [paymentDetails, setPaymentDetails] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);

  const handleInputChange = (data) => {
    const { name, value } = data;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (index) => {
    setActiveIndex(index);

    if (index === 0) {
      dispatch({
        type: "SET_PAYMENT_INTENT",
        payload: {
          paymentMode: "cod",
          paymentMethodId: null,
        },
      });
    } else if (index === 1) {
      dispatch({
        type: "SET_PAYMENT_INTENT",
        payload: {
          paymentMode: "stripe",
          paymentMethodId: null,
        },
      });
    }
  };

  return (
    <Tabs
      variant="unstyled"
      justifyContent={"space-between"}
      w="100%"
      onChange={handleTabChange}
    >
      <TabList>
        <Tab
          _selected={{ color: "white", bg: "brand.400" }}
          width="100%"
          fontSize={{ base: "12px", md: "14px" }}
          fontWeight={"500"}
          borderTopLeftRadius={"4px"}
          borderBottomLeftRadius={"4px"}
          bgColor={"white"}
          boxShadow={"md"}
        >
          {isMobile ? "COD" : "Cash on Delivery"}
        </Tab>
        <Tab
          _selected={{ color: "white", bg: "brand.400" }}
          width="100%"
          fontSize={{ base: "12px", md: "14px" }}
          fontWeight={"500"}
          bgColor={"white"}
          boxShadow={"md"}
        >
          Stripe
        </Tab>
      </TabList>
      <TabPanels width="100%">
        <TabPanel
          width="100% !important"
          fontSize={{ base: "12px", md: "14px" }}
        >
          <Text p={{ md: "10px" }}>
            Have the cash ready when you receive your order.
          </Text>
        </TabPanel>
        <TabPanel
          width="100% !important"
          fontSize={{ base: "12px", md: "14px" }}
        >
          <StripeWrapper />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default PaymentOptions;
