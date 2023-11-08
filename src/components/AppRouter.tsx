import React from "react";
import Login from "../pages/Login/Login";
import Event from "../pages/Event/Event";
import { Link, Route, Routes } from "react-router-dom";
import PrivetRoutes from "../router/PrivetRoutes";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration/Registration";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PrivetRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/event" element={<Event />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
};

export default AppRouter;
