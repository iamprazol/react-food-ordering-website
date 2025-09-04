import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";

const AuthContext = createContext(null);
const initial = { token: null, user: null };

function reducer(state, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return initial;
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(
    reducer,
    (() => {
      try {
        return JSON.parse(localStorage.getItem("auth") || "null") || initial;
      } catch {
        return initial;
      }
    })()
  );

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(state));
  }, [state]);

  const login = (token, user) => {
    dispatch({ type: "SET_TOKEN", payload: token });
    dispatch({ type: "SET_USER", payload: user });
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("auth");
  };

  const value = useMemo(() => ({ state, dispatch, login, logout }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
