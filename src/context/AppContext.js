// app-context.js
import React, { createContext, useReducer, useEffect, useContext } from "react";

const initialState = {
  token: null,
  user: null,
  cart: [],
  orders: [],
  address: [],
  favourites: [],
  notifications: [],
  paymentIntent: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...initialState };
    case "ADD_TO_CART": {
      const item = action.payload;
      const existingIndex = state.cart.findIndex(
        (cartItem) => cartItem.food_id === item.food_id
      );

      let updatedCart;
      if (existingIndex !== -1) {
        const existingItem = state.cart[existingIndex];
        const newQuantity = existingItem.quantity + item.quantity;

        const updatedItem = {
          ...existingItem,
          quantity: newQuantity,
          price: newQuantity * (item.price / item.quantity),
          special_instructions: `${existingItem.special_instructions || ""}, ${
            item.special_instructions || ""
          }`.trim(),
        };

        updatedCart = [...state.cart];
        updatedCart[existingIndex] = updatedItem;
      } else {
        updatedCart = [...state.cart, item];
      }

      return { ...state, cart: updatedCart };
    }
    case "REMOVE_FROM_CART":
      const updatedCart = state.cart.filter((item) => {
        return item.id !== action.payload;
      });

      return {
        ...state,
        cart: updatedCart,
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "SET_ORDERS":
      return { ...state, orders: action.payload };
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    case "SET_FAVOURITES":
      return { ...state, favourites: action.payload };
    case "SET_NOTIFICATIONS":
      const keyOf = (notification) =>
        notification?.id ??
        notification?.uuid ??
        notification?._id ??
        notification?.created_at?.date;
      const dedupe = (arr) =>
        Array.from(
          new Map(
            arr.map((notification) => [keyOf(notification), notification])
          ).values()
        );
      const byCreatedDesc = (a, b) =>
        (b?.created_at?.date || "").localeCompare(a?.created_at?.date || "");

      const incoming = Array.isArray(action.payload) ? action.payload : [];
      const next = dedupe([...(state.notifications || []), ...incoming]).sort(
        byCreatedDesc
      );
      return { ...state, notifications: next };

    case "SET_PAYMENT_INTENT":
      return { ...state, paymentIntent: action.payload };
    default:
      return state;
  }
};

const getInitialState = () => {
  const localData = localStorage.getItem("appState");
  return localData ? JSON.parse(localData) : initialState;
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  const login = (token, user, address, orders, favourites) => {
    dispatch({ type: "SET_TOKEN", payload: token });
    dispatch({ type: "SET_USER", payload: user });
    dispatch({ type: "SET_ADDRESS", payload: address });
    dispatch({ type: "SET_ORDERS", payload: orders });
    dispatch({ type: "SET_FAVOURITES", payload: favourites });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("appState");
  };

  return (
    <AppContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
