import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";

const CartContext = createContext(null);
const initial = { cart: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const item = action.payload;
      const idx = state.cart.findIndex((i) => i.food_id === item.food_id);
      if (idx !== -1) {
        const existing = state.cart[idx];
        const newQty = existing.quantity + item.quantity;
        const updated = {
          ...existing,
          quantity: newQty,
          price: newQty * (item.price / item.quantity),
          special_instructions: `${existing.special_instructions || ""}, ${
            item.special_instructions || ""
          }`.replace(/^, |, $/g, ""),
        };
        const next = [...state.cart];
        next[idx] = updated;
        return { cart: next };
      }
      return { cart: [...state.cart, item] };
    }
    case "REMOVE_FROM_CART": {
      const id = action.payload;
      return {
        cart: state.cart.filter((i) =>
          i.food_id === undefined ? i.id !== id : i.food_id !== id
        ),
      };
    }
    case "CLEAR_CART":
      return initial;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    reducer,
    (() => {
      try {
        const parsed = JSON.parse(localStorage.getItem("cart") || "null");
        return parsed && Array.isArray(parsed.cart) ? parsed : initial;
      } catch {
        return initial;
      }
    })()
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const summary = useMemo(() => {
    const subtotal = state.cart.reduce((s, it) => s + (it.price || 0), 0);
    const tax = subtotal * 0.13;
    const total = subtotal + tax;
    const count = state.cart.reduce((s, it) => s + (it.quantity || 0), 0);
    return { subtotal, tax, total, count };
  }, [state.cart]);

  const value = useMemo(() => ({ state, summary, dispatch }), [state, summary]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export const useCartContext = () => useContext(CartContext);
