import React from "react";
import CategorySection from "../categorySection/CategorySection";
import MenuSection from "../menuSection/MenuSection";

function MenuLayout() {
  return (
    <section class="rfow-restaurant-menu-container">
      <CategorySection />
      <MenuSection />
    </section>
  );
}

export default MenuLayout;
