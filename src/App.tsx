import React from "react";
import "./App.css";
import { theme } from "./style";
import { ThemeProvider } from "styled-components";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Header/Header";
import { Menu } from "./Menu/Menu";
import MainPage from "./GTD/Main";
import { Authentication } from "./Authentication";
import { useAutoLogin } from "./Authentication/Authentication.hook";
import ProtectedRoute from "./Authentication/ProtectedRoute";
import { Spinner } from "./common/Spinner/Spinner";
import { Modals } from "./GTD/Modals/Modals";

function App() {
  const { isLoading, isUninitialized, accessToken } = useAutoLogin();


  return (
    <ThemeProvider theme={theme}>
      {((!isLoading && !isUninitialized) || accessToken) ?
        <>
          <Header />
          <Menu />
          <Routes>
            <Route path="/*" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
            <Route path="/auth/*" element={<Authentication />} />
          </Routes>
          <Modals />
        </>
        : <Spinner />}
    </ThemeProvider>
  );
}

export default App;
