import React, { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import CategorySection from "../categorySection/CategorySection";
import MenuSection from "../menuSection/MenuSection";
import Cart from "../../common/cart/cart";
function MenuLayout({ restaurantId }) {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const { REACT_APP_API_URL } = process.env;

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/categoryinrestaurant/${restaurantId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          const categoryArray = data.data.map((category) => category.category);
          setCategories(categoryArray);
          setMenuItems(data.data);
        } else {
          setCategories([]);
          setMenuItems([]);
        }
      });
  }, [REACT_APP_API_URL, restaurantId]);

  return (
    <Flex direction="row" p={4} gap={4}>
      <Flex
        as="section"
        py={10}
        px={{ base: 4, md: 8 }}
        flex={"0 0 60%"}
        ml="100px"
        gap="50px"
      >
        <CategorySection categories={categories} />
        <MenuSection menuItems={menuItems} />
      </Flex>
      <Box
        py={6}
        width="30%"
        position="sticky"
        top="10"
        maxH="100vh"
        overflowY="auto"
      >
        <Cart />
      </Box>
    </Flex>
  );
}

export default MenuLayout;
