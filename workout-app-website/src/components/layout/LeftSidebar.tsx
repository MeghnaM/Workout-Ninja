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
    <div
      style={{
        width: "15%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography style={{ fontFamily: "Lato" }}>
        Welcome, {user.displayName}
      </Typography>
      <Button style={{ fontFamily: "Lato" }} onClick={handleDashboardClick}>
        Dashboard
      </Button>
      <Button style={{ fontFamily: "Lato" }} onClick={handleProfileClick}>
        Profile
      </Button>
    </div>
  );
}

export default LeftSidebar;
