import React from "react";
import { StyledWebsiteHeading } from "../styles/StyledComponentsLibrary";
import { useAuth } from "../auth/AuthContext";

function Header() {
  const { user } = useAuth();
  if (!user) {
    return;
  }
  return (
    <StyledWebsiteHeading
      style={{ display: "flex", alignSelf: "center", padding: "2%" }}
      variant="h2"
      color="primary"
    >
      Good Morning, {user.displayName}
    </StyledWebsiteHeading>
  );
}

export default Header;
