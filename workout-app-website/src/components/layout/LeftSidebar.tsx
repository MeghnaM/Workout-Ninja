import React from "react";
import HomePage from "../dashboard/Dashboard";
import ProfilePage from "../profile/ProfilePage";
import { Button, Typography } from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import IconButton from "@mui/material/IconButton";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  StyledIconButton,
  StyledSectionHeading,
} from "../../components/styles/StyledComponentsLibrary";

function LeftSidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Typography>Please log in!</Typography>;
  }

  const handleDashboardClick = () => navigate("/dashboard");
  const handleProfileClick = () => navigate("/profile");

  // Selected logic - pass in a selected prop to say which one
  // is selected. And in the styled component background check if
  // it is selected and if it is then show a different background color
  // selected = true, and have 2 state variables one for dashboard selected
  // and one for profile selected, and the state changes on click,
  // before navigate

  return (
    <div
      style={{
        // width: "15%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        // height: "100vh",
        padding: 20,
        // width: 260,
        // flex: "0 0 260px",
        alignSelf: "stretch", // ensures it stretches full height of the shell
        overflowY: "auto",
      }}
    >
      <StyledSectionHeading
        style={{
          fontFamily: "Lato",
          fontWeight: "bold",
          fontSize: 50,
          fontVariant: "small-caps",
        }}
      >
        Workout Ninja
      </StyledSectionHeading>
      <StyledIconButton aria-label="dashboard" onClick={handleDashboardClick}>
        <HomeOutlinedIcon />
        <Typography
          style={{
            fontFamily: "Lato",
            fontWeight: "bold",
            fontSize: 20,
            fontVariant: "small-caps",
          }}
        >
          Dashboard
        </Typography>
      </StyledIconButton>
      <StyledIconButton aria-label="profile" onClick={handleProfileClick}>
        <PersonOutlineOutlinedIcon />
        <Typography
          style={{
            fontFamily: "Lato",
            fontWeight: "bold",
            fontSize: 20,
            fontVariant: "small-caps",
          }}
        >
          Profile
        </Typography>
      </StyledIconButton>
      {/* <Button
        style={{ fontFamily: "Lato", fontWeight: "bold" }}
        onClick={handleDashboardClick}
      >
        Dashboard
      </Button> */}
      {/* <Button
        style={{ fontFamily: "Lato", fontWeight: "bold" }}
        onClick={handleProfileClick}
      >
        Profile
      </Button> */}
    </div>
  );
}

export default LeftSidebar;
