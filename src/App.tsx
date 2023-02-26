import React from "react";
import "./App.css";
import { theme } from "./style/theme";
import { ThemeProvider } from "styled-components";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { Header } from "./Header/Header";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
