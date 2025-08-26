// Import Libraries.
import React from "react";
import { Routes, Route } from "react-router-dom";

// Import Components.
import HomePage from "../pages/home/homePage/HomePage";
import PageNotFound from "../pages/not-found/PageNotFound";
import RestaurantLayout from "../pages/restaurantLayout/RestaurantLayout";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import OrdersPage from "../pages/orders/OrdersPage";
import MyAccount from "../pages/account/MyAccount";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/restaurant/:restaurantId" element={<RestaurantLayout />} />
      <Route element={<PageNotFound />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/my-account" element={<MyAccount index={0} />} />
      <Route path="/my-account/address" element={<MyAccount index={2} />} />
      <Route path="/my-account/favourites" element={<MyAccount index={3} />} />
    </Routes>
  );
}

export default App;
