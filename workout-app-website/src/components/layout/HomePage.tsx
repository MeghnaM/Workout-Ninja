import React from "react";
import LeftSidebar from "./LeftSidebar";
import Dashboard from "../dashboard/Dashboard";
import ProfilePage from "../profile/ProfilePage";
import Header from "./Header";
import { Typography } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import backgroundImage from "../../assets/gradient.jpg";

// Props - current user firebase info and mongodb info

function HomePage() {
  return (
    <div
      className="app-container"
      style={{
        display: "flex",
        flexDirection: "row",
        // backgroundImage: `url(${backgroundImage})`,
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        height: "100%",
        overflow: "auto",
      }}
    >
      <LeftSidebar />
      <main
        className="main-content"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
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
