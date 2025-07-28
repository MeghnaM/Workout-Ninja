import * as React from "react";
import { useState } from "react";
import {
  StyledWebsiteHeading,
  StyledWebsiteSubheading,
} from "./StyledComponentsLibrary";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

export default function AuthPage() {
  const [signupView, setSignupView] = useState<boolean>(true);
  const backgroundImage = "./assets/nature-pink-green.jpg";
  return (
    <div
      style={{
        border: "5px solid #ffbdb6",
        padding: 20,
        borderRadius: 20,
      }}
    >
      <div
        className="p-8"
        style={{
          backgroundColor: "#ffbdb6",
          width: 600,
          borderRadius: 20,
          padding: 50,
        }}
      >
        <StyledWebsiteHeading variant="h2" color="primary">
          Workout Ninja
        </StyledWebsiteHeading>
        <StyledWebsiteSubheading color="secondary">
          Workout Ninja makes achieving your fitness goals fun!
        </StyledWebsiteSubheading>
        <StyledWebsiteSubheading
          color="primary"
          style={{
            marginTop: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {signupView ? (
            <SignupForm setSignupView={setSignupView} />
          ) : (
            <LoginForm setSignupView={setSignupView} />
          )}
        </StyledWebsiteSubheading>
      </div>
    </div>
  );
}
