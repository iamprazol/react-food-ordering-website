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

const PaymentOptions = () => {
  const {
    state: { orders, paymentIntent },
    dispatch,
  } = useUserData();
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
          fontSize={"14px"}
          fontWeight={"500"}
          borderTopLeftRadius={"4px"}
          borderBottomLeftRadius={"4px"}
          bgColor={"white"}
          boxShadow={"md"}
        >
          Cash on Delivery
        </Tab>
        <Tab
          _selected={{ color: "white", bg: "brand.400" }}
          width="100%"
          fontSize={"14px"}
          fontWeight={"500"}
          bgColor={"white"}
          boxShadow={"md"}
        >
          Stripe
        </Tab>
      </TabList>
      <TabPanels width="100%">
        <TabPanel p="20px 0px" width="100% !important" fontSize={"15px"}>
          <Text>Have the cash ready when you receive your order.</Text>
        </TabPanel>
        <TabPanel p="20px 0px" width="100% !important" mt={4}>
          <StripeWrapper />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default PaymentOptions;
