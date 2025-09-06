import React, { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import CategorySection from "./category-section/CategorySection";
import MenuSection from "./menu-section/MenuSection";
import Cart from "../../../../carts/components/cart";
import { useApp } from "../../../../../context/AppContext";

function MenuLayout({ restaurantId }) {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const { REACT_APP_API_URL } = process.env;
  const {
    state: { isMobile },
  } = useApp();

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
    <Flex direction="row" p={{ base: 0, md: 4 }} gap={{ base: 0, md: 4 }}>
      <Flex
        as="section"
        py={{ base: 0, md: 10 }}
        px={{ base: 0, md: 8 }}
        flex={{ base: 1, md: "0 0 60%" }}
        ml={{ base: 0, md: "100px" }}
        gap={{ base: 0, md: "50px" }}
      >
        {!isMobile && <CategorySection categories={categories} />}
        <MenuSection menuItems={menuItems} />
      </Flex>
      {!isMobile && (
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
      )}
    </Flex>
  );
}

export default MenuLayout;
