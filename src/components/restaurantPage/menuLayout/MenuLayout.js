import React, { useState, useEffect } from "react";
import CategorySection from "../categorySection/CategorySection";
import MenuSection from "../menuSection/MenuSection";

function MenuLayout(props) {
  const { restaurantId } = props;
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const { REACT_APP_API_URL } = process.env;

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/categoryinrestaurant/${restaurantId}`)
      .then((res) => res.json())
      .then((data) => {
        let categoryArray = data.data.map((category) => {
          return category.category;
        });

        setCategories(categoryArray);
        setMenuItems(data.data);
      });
  }, [REACT_APP_API_URL, restaurantId]);

  return (
    <section class="rfow-restaurant-menu-container">
      <CategorySection categories={categories} />
      <MenuSection menuItems={menuItems} />
    </section>
  );
}

export default MenuLayout;
