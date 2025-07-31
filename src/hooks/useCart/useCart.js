import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CART_QUERY_KEY, getInitialCartItems } from "./cartQuery";
import { useEffect } from "react";
export const useCart = () => {
  const queryClient = useQueryClient();

  const { data: cartItems = [] } = useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: () => getInitialCartItems(),
    staleTime: Infinity,
    initialData: () => getInitialCartItems(),
  });

  const setCartItems = (newItems) => {
    localStorage.setItem("cart", JSON.stringify(newItems));
    queryClient.setQueryData(CART_QUERY_KEY, newItems);
  };

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.food_id === item.food_id
    );

    if (existingItemIndex !== -1) {
      const existingItem = cartItems[existingItemIndex];
      const newQuantity = existingItem.quantity + item.quantity;

      const updatedItem = {
        ...existingItem,
        quantity: newQuantity,
        price: newQuantity * (item.price / item.quantity),
        special_instructions: `${existingItem.special_instructions || ""}, ${
          item.special_instructions || ""
        }`.trim(),
      };

      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex] = updatedItem;
      setCartItems(updatedCart);
    } else {
      const updatedCart = [...cartItems, item];
      setCartItems(updatedCart);
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };
};
