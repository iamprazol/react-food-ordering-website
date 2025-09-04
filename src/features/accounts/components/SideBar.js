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
import { RiUserFollowLine } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa";
import OrdersLayout from "../../orders/components/OrdersLayout";
import EditProfile from "./EditProfile";
import SavedAddresses from "./SavedAddresses";
import { GiSelfLove } from "react-icons/gi";
import MyFavourites from "./MyFavourites";
import IconContainer from "../../../widgets/icon-container/IconContainer";

const sideBar = ({ index }) => {
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
    {
      icon: <GiSelfLove size={40} />,
      text: "My Favourites",
      slug: "favourites",
      element: <MyFavourites />,
    },
  ];

  console.log(index);

  return (
    <Box py={6} width="100%">
      <Box mb={4} pb={2} display="flex" alignItems="center" gap={2}>
        <Tabs
          display="flex"
          direction="column"
          width="100%"
          defaultIndex={index}
        >
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
