// Import Libraries.
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";

// Import SCSS.
import "./index.scss";

// Import Components.
import App from "./app/App";
import theme from "./shared/styles/theme";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { UserDataProvider } from "./context/UserDataContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import { AppProvider } from "./context/AppContext";

const queryClient = new QueryClient();

export default function AppProviders({ children }) {
  return (
    <AppProvider>
      <AuthProvider>
        <UserDataProvider>
          <CartProvider>
            <NotificationsProvider>{children}</NotificationsProvider>
          </CartProvider>
        </UserDataProvider>
      </AuthProvider>
    </AppProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <AppProviders>
          <Router>
            <App />
          </Router>
        </AppProviders>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
