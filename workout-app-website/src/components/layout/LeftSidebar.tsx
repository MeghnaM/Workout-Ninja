import React from "react";
import HomePage from "../dashboard/Dashboard";
import ProfilePage from "../profile/ProfilePage";
import { Typography } from "@mui/material";
import { useAuth } from "../auth/AuthContext";

// TODO Make these into links. Make sure we can't navigate back to
// auth pages.
// TODO What does left sidebar need to display the user's name?
function LeftSidebar() {
  const { user, signOut } = useAuth();

  if (!user) {
    return <Typography>Please log in!</Typography>;
  }

  return (
    <div style={{ width: "250px", background: "#f5f5f5", height: "100vh" }}>
      <ul>
        <Typography>Welcome, {user.displayName}</Typography>
        <li>Dashboard</li>
        <li>Profile</li>
      </ul>
    </div>
  );
}

export default LeftSidebar;
