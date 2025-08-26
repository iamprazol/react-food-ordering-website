import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Box,
  Text,
  chakra,
  SimpleGrid,
} from "@chakra-ui/react";

// Components
import { useApp } from "../../../context/AppContext";
import Cards from "../../restaurants/components/restaurant-list/cards/Cards";
import FoodCard from "../../food/FoodCard";

const MyFavourites = () => {
  const {
    state: { favourites },
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
          Restaurants
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
          Foods
        </Tab>
      </TabList>
      <TabPanels width="100%">
        <TabPanel p="20px 0px" width="100% !important">
          <SimpleGrid columns={2} spacing={6}>
            {favourites.restaurants.map((restaurant, idx) => (
              <Cards
                key={idx}
                id={restaurant.restaurant_id}
                name={restaurant.restaurant_name}
                description={restaurant.restaurant_description}
                image={restaurant.restaurant_picture}
                address={restaurant.restaurant_address}
                delivery_hours={restaurant.restaurant_delivery_hours}
                minimum_order={restaurant.restaurant_minimum_order}
                discount={restaurant.restaurant_discount}
              />
            ))}
          </SimpleGrid>
        </TabPanel>
        <TabPanel p="20px 0px" width="100% !important">
          <SimpleGrid columns={1} spacing={6}>
            {favourites.foods.map((food, idx) => (
              <Flex
                key={idx}
                justify="space-between"
                p={3}
                borderBottomWidth="1px"
                cursor="pointer"
              >
                <FoodCard currentFood={food} context="myAccount" />
              </Flex>
            ))}
          </SimpleGrid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MyFavourites;
