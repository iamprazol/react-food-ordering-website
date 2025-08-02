import { useApp } from "../../context/AppContext";

export const useCart = () => {
  const { state, dispatch } = useApp();

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (food_id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: food_id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return {
    cartItems: state.cart,
    addToCart,
    removeFromCart,
    clearCart,
  };
};
