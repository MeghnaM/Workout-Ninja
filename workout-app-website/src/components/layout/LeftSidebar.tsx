import React from "react";
import HomePage from "../pages/Dashboard";
import ProfilePage from "../pages/ProfilePage";

// TODO Make these into links. Make sure we can't navigate back to
// auth pages.
// TODO What does left sidebar need to display the user's name?
function LeftSidebar() {
  return (
    <div style={{ width: "250px", background: "#f5f5f5", height: "100vh" }}>
      <ul>
        <li>Home</li>
        <li>Profile</li>
      </ul>
    </div>
  );
}

export default LeftSidebar;
