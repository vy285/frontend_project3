import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import Signup from "../pages/Auth/Signup";
import Chat from "../pages/Chat/Chat";
import Home from "../pages/Home/Home";
import NavIcons from "../components/NavIcons/NavIcons";
import Search from "../pages/Search/Search";
import Profile from "../pages/Profile/Profile";
import Referral from "../pages/Referral/Referral";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Auth />
          </>
        }
      />
      <Route
        path="/signup"
        element={
          <>
            <Signup />
          </>
        }
      />

      <Route
        path="/home"
        element={
          <>
            <NavIcons />
            <Home />
          </>
        }
      />

      <Route
        path="/search"
        element={
          <>
            <NavIcons />
            <Search />
          </>
        }
      />

      <Route
        path="/profile"
        element={
          <>
            <NavIcons />
            <Profile />
          </>
        }
      />
      <Route
        path="/referral"
        element={
          <>
            <NavIcons />
            <Referral />
          </>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
