import React from "react";
import HomePage from "../dashboard/Dashboard";
import ProfilePage from "../profile/ProfilePage";
import { Button, Typography } from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

// TODO Make these into links. Make sure we can't navigate back to
// auth pages.
function LeftSidebar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Typography>Please log in!</Typography>;
  }

  const handleDashboardClick = () => navigate("/dashboard");

  const handleProfileClick = () => navigate("/profile");

  return (
    <div style={{ width: "250px", background: "#f5f5f5", height: "100vh" }}>
      <ul>
        <Typography>Welcome, {user.displayName}</Typography>
        <Button onClick={handleDashboardClick}>Dashboard</Button>
        <Button onClick={handleProfileClick}>Profile</Button>
      </ul>
    </div>
  );
}

export default LeftSidebar;
