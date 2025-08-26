export const CART_QUERY_KEY = ["cart-items"];

export const getInitialCartItems = () => {
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
};
