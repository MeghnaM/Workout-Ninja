import * as React from "react";
import { useState } from "react";
import {
  StyledWebsiteHeading,
  StyledWebsiteSubheading,
} from "../styles/StyledComponentsLibrary";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import backgroundImage from "../../assets/nature-yellow-purple.jpg";
import { colors } from "../styles/colors";

export default function AuthPage() {
  const [signupView, setSignupView] = useState<boolean>(false);
  const pink = colors["pink-vivid-500"];
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <header className="App-header">
        <div
          style={{
            border: `5px solid ${pink}`,
            padding: 20,
            borderRadius: 20,
            boxShadow:
              "0 14px 28px rgba(0,0,0,0.12), 0 10px 10px rgba(0,0,0,0.08)",
          }}
        >
          <div
            className="p-8"
            style={{
              backgroundColor: colors["orange-vivid-100"],
              width: "xl",
              borderRadius: 20,
              padding: 50,
              boxShadow:
                "0 14px 28px rgba(0,0,0,0.12), 0 10px 10px rgba(0,0,0,0.08)",
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
      </header>
    </div>
  );
}
