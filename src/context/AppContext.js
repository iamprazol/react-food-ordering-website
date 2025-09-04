import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";
import { useBreakpointValue } from "@chakra-ui/react";

const AppContext = createContext(null);

const initial = { isMobile: false };

function reducer(state, action) {
  switch (action.type) {
    case "SET_MOBILE_DEVICE":
      return { ...state, isMobile: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const bpIsMobile = useBreakpointValue({ base: true, md: false });

  const [state, dispatch] = useReducer(reducer, initial, (init) => {
    try {
      const saved = localStorage.getItem("isMobile");
      if (saved != null) return { isMobile: JSON.parse(saved) };
    } catch {}
    return init;
  });

  useEffect(() => {
    if (typeof bpIsMobile === "boolean") {
      dispatch({ type: "SET_MOBILE_DEVICE", payload: bpIsMobile });
    }
  }, [bpIsMobile]);

  useEffect(() => {
    try {
      localStorage.setItem("isMobile", JSON.stringify(state.isMobile));
    } catch {}
  }, [state.isMobile]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
