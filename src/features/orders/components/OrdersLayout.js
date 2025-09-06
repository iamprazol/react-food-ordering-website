import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

// Components
import OrdersTab from "./OrdersTab";
import { useUserData } from "../../../context/UserDataContext";

const OrdersLayout = () => {
  const {
    state: { orders },
  } = useUserData();

  return (
    <Tabs
      variant="unstyled"
      justifyContent={"space-between"}
      px={{ base: 0, md: 16 }}
    >
      <TabList flexDirection={{ base: "column", md: "row" }}>
        <Tab
          _selected={{ color: "white", bg: "brand.400" }}
          fontSize={{ base: "12px", md: "14px" }}
          fontWeight={"500"}
          p="15px 20px"
          borderTopLeftRadius={"4px"}
          borderBottomLeftRadius={"4px"}
          borderTopRightRadius={{ base: "4px", md: 0 }}
          borderBottomRightRadius={{ base: "4px", md: 0 }}
          bgColor={"white"}
          boxShadow={"md"}
          borderBottom="1px solid #e1e1e1"
          w="100%"
        >
          All Orders
        </Tab>
        <Tab
          _selected={{ color: "white", bg: "brand.400" }}
          fontSize={{ base: "12px", md: "14px" }}
          fontWeight={"500"}
          p="15px 20px"
          borderTopLeftRadius={"4px"}
          borderBottomLeftRadius={"4px"}
          borderTopRightRadius={{ base: "4px", md: 0 }}
          borderBottomRightRadius={{ base: "4px", md: 0 }}
          bgColor={"white"}
          boxShadow={"md"}
          borderBottom="1px solid #e1e1e1"
          w="100%"
        >
          Active
        </Tab>
        <Tab
          _selected={{ color: "white", bg: "brand.400" }}
          fontSize={{ base: "12px", md: "14px" }}
          fontWeight={"500"}
          p="15px 20px"
          borderTopLeftRadius={"4px"}
          borderBottomLeftRadius={"4px"}
          borderTopRightRadius={{ base: "4px", md: 0 }}
          borderBottomRightRadius={{ base: "4px", md: 0 }}
          bgColor={"white"}
          boxShadow={"md"}
          borderBottom="1px solid #e1e1e1"
          w="100%"
        >
          Delivered
        </Tab>
        <Tab
          _selected={{ color: "white", bg: "brand.400" }}
          fontSize={{ base: "12px", md: "14px" }}
          fontWeight={"500"}
          p="15px 20px"
          borderTopLeftRadius={"4px"}
          borderBottomLeftRadius={"4px"}
          borderTopRightRadius={{ base: "4px", md: 0 }}
          borderBottomRightRadius={{ base: "4px", md: 0 }}
          bgColor={"white"}
          boxShadow={"md"}
          borderBottom="1px solid #e1e1e1"
          w="100%"
        >
          Cancelled
        </Tab>
      </TabList>
      <TabPanels width="100%">
        <TabPanel p="20px 0px" width="100% !important">
          <OrdersTab myOrders={orders} />
        </TabPanel>
        <TabPanel p="20px 0px" width="100% !important">
          <OrdersTab
            myOrders={orders.filter((order) => order.delivered === 0)}
          />
        </TabPanel>
        <TabPanel p="20px 0px" width="100% !important">
          <OrdersTab
            myOrders={orders.filter((order) => order.delivered === 1)}
          />
        </TabPanel>
        <TabPanel p="20px 0px" width="100% !important">
          <OrdersTab
            myOrders={orders.filter((order) => order.delivered === -1)}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default OrdersLayout;
