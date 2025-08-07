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
      <Route path="/my-account" element={<MyAccount index={0} />} />
      <Route path="/my-account/address" element={<MyAccount index={2} />} />
      <Route path="/my-account/favourites" element={<MyAccount index={3} />} />
    </Routes>
  );
}

export default App;
