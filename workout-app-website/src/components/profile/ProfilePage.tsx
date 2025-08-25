import { Button, Typography } from "@mui/material";
import Input from "@mui/material/Input";
import React from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  StyledSectionHeading,
  StyledSectionSubheading,
  StyledIconButton,
} from "../styles/StyledComponentsLibrary";
import { colors } from "../styles/colors";

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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <StyledSectionHeading
          style={{
            fontWeight: "bold",
            fontSize: 20,
            fontVariant: "small-caps",
          }}
        >
          Name:
        </StyledSectionHeading>
        <StyledSectionSubheading
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: colors["orange-vivid-500"],
          }}
        >
          {user.displayName}
        </StyledSectionSubheading>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <StyledSectionHeading
          style={{
            fontWeight: "bold",
            fontSize: 20,
            fontVariant: "small-caps",
          }}
        >
          Email:
        </StyledSectionHeading>
        <StyledSectionSubheading
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: colors["orange-vivid-500"],
          }}
        >
          {user.email}
        </StyledSectionSubheading>
      </div>

      <StyledIconButton onClick={onLogoutClick} style={{ margin: 20 }}>
        Logout
      </StyledIconButton>
    </div>
  );
}

export default ProfilePage;
