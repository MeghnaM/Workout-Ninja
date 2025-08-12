import { Button, Typography } from "@mui/material";
import Input from "@mui/material/Input";
import React from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Typography>Please log in!</Typography>;
  }

  const onLogoutClick = () => {
    signOut();
    navigate("/", { replace: true });
    return;
  };

  return (
    <div>
      <Typography>Name</Typography>
      <Typography>{user.displayName}</Typography>
      <Typography>Email</Typography>
      <Typography>{user.email}</Typography>
      <Button onClick={onLogoutClick}>Logout</Button>
    </div>
  );
}

export default ProfilePage;
