// Import Libraries.
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ Added

// Import SCSS.
import "./index.scss";

// Import Components.
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";
import theme from "./shared/styles/theme";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { UserDataProvider } from "./context/UserDataContext";
import { NotificationsProvider } from "./context/NotificationsContext";

const queryClient = new QueryClient();

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <UserDataProvider>
        <CartProvider>
          <NotificationsProvider>{children}</NotificationsProvider>
        </CartProvider>
      </UserDataProvider>
    </AuthProvider>
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

// If you want your app to work offline and load faster...
serviceWorker.unregister();
