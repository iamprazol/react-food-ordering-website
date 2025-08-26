import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";

const UserDataContext = createContext(null);
const initial = {
  orders: [],
  address: [],
  favourites: { restaurants: [], foods: [] },
  paymentIntent: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ORDERS":
      return { ...state, orders: action.payload || [] };
    case "SET_ADDRESS":
      return { ...state, address: action.payload || [] };
    case "SET_FAVOURITES":
      return {
        ...state,
        favourites: action.payload || { restaurants: [], food: [] },
      };
    case "SET_PAYMENT_INTENT":
      return { ...state, paymentIntent: action.payload };
    default:
      return state;
  }
}

export function UserDataProvider({ children }) {
  const [state, dispatch] = useReducer(
    reducer,
    (() => {
      try {
        return (
          JSON.parse(localStorage.getItem("userData") || "null") || initial
        );
      } catch {
        return initial;
      }
    })()
  );

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}
export const useUserData = () => useContext(UserDataContext);
