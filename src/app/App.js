// Import Libraries.
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("../pages/home/HomePage"));
const PageNotFound = lazy(() => import("../pages/not-found/PageNotFound"));
const RestaurantLayout = lazy(() =>
  import("../pages/restaurantLayout/RestaurantLayout")
);
const CheckoutPage = lazy(() => import("../pages/checkout/CheckoutPage"));
const OrdersPage = lazy(() => import("../pages/orders/OrdersPage"));
const MyAccount = lazy(() => import("../pages/account/MyAccount"));

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route
          path="/restaurant/:restaurantId"
          element={<RestaurantLayout />}
        />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/my-account" element={<MyAccount index={0} />} />
        <Route path="/my-account/address" element={<MyAccount index={2} />} />
        <Route
          path="/my-account/favourites"
          element={<MyAccount index={3} />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
