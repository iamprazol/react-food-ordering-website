// Import Libraries.
import React from "react";
import { Routes, Route } from "react-router-dom";

// Import Components.
import HomePage from "./home/homePage/HomePage";
import PageNotFound from "./pageNotFound/PageNotFound";
import RestaurantLayout from "./restaurantPage/restaurantLayout/RestaurantLayout";
import CheckoutPage from "./checkoutPage/CheckoutPage";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/restaurant/:restaurantId" element={<RestaurantLayout />} />
      <Route element={<PageNotFound />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

export default App;
