import React from "react";
import {
  Box,
  Heading,
  UnorderedList,
  ListItem,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { Link } from "react-scroll";
import { MdWhatshot } from "react-icons/md";
import IconContainer from "../../common/iconContainer/IconContainer";
import { RiUserFollowLine } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa";
import OrdersLayout from "../../ordersPage/ordersLayout/OrdersLayout";
import EditProfile from "../editProfile/EditProfile";
import SavedAddresses from "../savedAddresses/SavedAddresses";

const sideBar = () => {
  const myAccountItems = [
    {
      icon: <RiUserFollowLine size={40} />,
      text: "My Account",
      slug: "my-account",
      element: <EditProfile />,
    },
    {
      icon: <IoFastFoodOutline size={40} />,
      text: "Orders",
      slug: "orders",
      element: <OrdersLayout />,
    },
    {
      icon: <FaRegAddressCard size={40} />,
      text: "Saved Addresses",
      slug: "addresses",
      element: <SavedAddresses />,
    },
  ];
  return (
    <Box py={6} width="100%">
      <Box mb={4} pb={2} display="flex" alignItems="center" gap={2}>
        <Tabs display="flex" direction="column" width="100%">
          <TabList
            display="flex"
            flexDir="column"
            gap={2}
            width="400px"
            border="none"
          >
            {myAccountItems.map((items, idx) => (
              <Tab
                display={"flex"}
                gap={4}
                w="100%"
                justifyContent={"flex-start"}
                borderBottom={"none"}
                key={idx}
                _selected={{ color: "brand.500" }}
              >
                <IconContainer icon={items.icon} fontSizeClass="icon--small" />
                {items.text}
              </Tab>
            ))}
          </TabList>
          <TabPanels width="100%" borderLeft={"1px solid #E7E7E7"}>
            {myAccountItems.map((items, idx) => (
              <TabPanel
                display={"flex"}
                gap={4}
                w="100%"
                justifyContent={"flex-start"}
                borderBottom={"none"}
                key={idx}
                _selected={{ color: "brand.500" }}
              >
                {items.element}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default sideBar;
