import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";

const NotificationsContext = createContext(null);
const initial = { notifications: [] };

function reducer(state, action) {
  switch (action.type) {
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
    case "CLEAR_NOTIFICATIONS":
      return initial;
    default:
      return state;
  }
}

export function NotificationsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}
export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used inside a NotificationsProvider"
    );
  }
  return context;
};
