import React from "react";
import LeftSidebar from "./LeftSidebar";
import Dashboard from "../dashboard/Dashboard";
import ProfilePage from "../profile/ProfilePage";
import Header from "./Header";
import { Typography } from "@mui/material";
import { Routes, Route } from "react-router-dom";

// TODO Make sure that once we have navigated here we cannot navigate back
// to the auth pages - I think we can keep a history object and use that

// Props - current user firebase info and mongodb info

function HomePage() {
  return (
    <div
      className="app-container"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <LeftSidebar />
      <main
        className="main-content"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default HomePage;
