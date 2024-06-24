"use client";
import { croissant, inter } from "@/app/ui/fonts";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [inter.style.fontFamily, croissant.style.fontFamily].join(","),
  },
  palette: {
    mode: "light",
    background: {
      default: "#FFFFFF", // Soft White
    },
    primary: {
      light: "#B2C29A", // Light Olive Green
      main: "#6B8E23", // Olive Green
      dark: "#4A5E16", // Dark Olive Green
      contrastText: "#FFFFFF", // White text
    },
    secondary: {
      light: "#FAF9F3", // Light Warm Beige
      main: "#F5F5DC", // Warm Beige
      dark: "#A69C74", // Dark Warm Beige
      contrastText: "#000000", // Black text
    },
    grey: {
      50: "#FAFAFA", // Lightest grey, close to white
      100: "#F5F5F5", // Very light grey
      200: "#EEEEEE", // Light grey
      300: "#E0E0E0", // Light grey, a bit darker
      400: "#BDBDBD", // Medium grey
      500: "#9E9E9E", // Standard grey
      600: "#757575", // Darker grey
      700: "#616161", // Even darker grey
      800: "#424242", // Very dark grey
      900: "#212121", // Almost black grey
    },
  },
});

export default theme;
