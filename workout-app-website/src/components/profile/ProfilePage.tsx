import { Typography } from "@mui/material";
import Input from "@mui/material/Input";
import React from "react";
import { useAuth } from "../auth/AuthContext";

function ProfilePage() {
  const { user, signOut } = useAuth();
  if (!user) {
    return <Typography>Please log in!</Typography>;
  }
  return (
    <div>
      <Typography>Name</Typography>
      <Typography>{user.displayName}</Typography>
      <Typography>Email</Typography>
      <Typography>{user.email}</Typography>
    </div>
  );
}

export default ProfilePage;
