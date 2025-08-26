import { useCartContext } from "../../../context/CartContext";

export const useCart = () => {
  const { state, dispatch } = useCartContext();

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
