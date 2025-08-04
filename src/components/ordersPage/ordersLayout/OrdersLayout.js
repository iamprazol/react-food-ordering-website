import React, { useState, useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

// Components
import { useApp } from "../../../context/AppContext";
import OrdersTab from "../ordersTab/OrdersTab";

const OrdersLayout = () => {
  const {
    state: { orders },
  } = useApp();

  return (
    <Tabs variant="unstyled" justifyContent={"space-between"} w="100%">
      <TabList>
        <Tab
          _selected={{ color: "white", bg: "brand.400" }}
          width="100%"
          fontSize={"14px"}
          fontWeight={"500"}
          p="15px 20px"
          borderTopLeftRadius={"4px"}
          borderBottomLeftRadius={"4px"}
          bgColor={"white"}
          boxShadow={"md"}
        >
          All Orders
        </Tab>
        <Tab
          _selected={{ color: "white", bg: "brand.400" }}
          width="100%"
          fontSize={"14px"}
          fontWeight={"500"}
          p="15px 20px"
          bgColor={"white"}
          boxShadow={"md"}
        >
          Active
        </Tab>
        <Tab
          _selected={{ color: "white", bg: "brand.400" }}
          width="100%"
          fontSize={"14px"}
          fontWeight={"500"}
          p="15px 20px"
          bgColor={"white"}
          boxShadow={"md"}
        >
          Delivered
        </Tab>
        <Tab
          _selected={{ color: "white", bg: "brand.400" }}
          width="100%"
          fontSize={"14px"}
          fontWeight={"500"}
          p="15px 20px"
          bgColor={"white"}
          boxShadow={"md"}
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
