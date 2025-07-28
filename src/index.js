// Import Libraries.
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ Added

// Import SCSS.
import "./index.scss";

// Import Components.
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";
import { AuthProvider } from "./context/auth-context";

// ✅ Create the React Query client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster...
serviceWorker.unregister();
