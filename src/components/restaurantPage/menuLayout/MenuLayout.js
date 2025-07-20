import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import CategorySection from "../categorySection/CategorySection";
import MenuSection from "../menuSection/MenuSection";

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
    <Box
      as="section"
      py={10}
      px={{ base: 4, md: 8 }}
      maxW="7xl"
      mx="auto"
      bg="gray.50"
    >
      <CategorySection categories={categories} />
      <MenuSection menuItems={menuItems} />
    </Box>
  );
}

export default MenuLayout;
