// Import Libraries.
import React from "react";
import { Routes, Route } from "react-router-dom";

// Import Components.
import HomePage from "./home/homePage/HomePage";
import PageNotFound from "./pageNotFound/PageNotFound";
import RestaurantLayout from "./restaurantPage/restaurantLayout/RestaurantLayout";
import CheckoutPage from "./checkoutPage/CheckoutPage";
import OrdersPage from "./ordersPage/OrdersPage";
import MyAccount from "./myAccount/MyAccount";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/restaurant/:restaurantId" element={<RestaurantLayout />} />
      <Route element={<PageNotFound />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/my-account" element={<MyAccount />} />
    </Routes>
  );
}

export default App;
