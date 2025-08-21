import React from "react";
import { StyledWebsiteHeading } from "../styles/StyledComponentsLibrary";

function Header() {
  return (
    <StyledWebsiteHeading
      style={{ display: "flex", alignSelf: "center", padding: "2%" }}
      variant="h2"
      color="primary"
    >
      Workout Ninja
    </StyledWebsiteHeading>
  );
}

export default Header;
