import { extendTheme } from "@chakra-ui/react";

// 1. Define custom breakpoints
const breakpoints = {
  sm: "30em", // 480px
  md: "48em", // 768px
  lg: "62em", // 992px
  xl: "80em", // 1280px
  "2xl": "96em", // 1536px
};

// 2. Extend the theme
const theme = extendTheme({
  breakpoints,
  colors: {
    brand: {
      50: "#ffe5ea",
      100: "#fcb3bc",
      200: "#f98094",
      300: "#f64e6b",
      400: "#f41b43",
      500: "#ff0018", // Primary
      600: "#cc0013",
      700: "#99000e",
      800: "#660009",
      900: "#330004",
    },
    text: {
      light: "#ffffff",
      muted: "#aaaaaa",
    },
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

export default theme;
