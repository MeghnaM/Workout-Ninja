//import { firebaseConfig } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import { auth } from "./firebase";

// TODO
// Typescript
// Form to sign up new user, or log in with email and password
// App opens to this page, once user logs in then they see their workout ninja profile
// Page has heading and form

const ariaLabel = { "aria-label": "description" };

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  submit?: string;
}

interface Props {
  setSignupView: (signupView: boolean) => void;
}

export default function LoginForm(props: Props) {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length == 0;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      email: value,
    }));
    // Clear error when user starts typing
    if (errors.email) {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
    if (errors.submit) {
      setErrors((prev) => ({
        ...prev,
        submit: "",
      }));
    }
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      password: value,
    }));

    // Clear error when user starts typing
    if (errors.password) {
      setErrors((prev) => ({
        ...prev,
        password: "",
      }));
    }
    if (errors.submit) {
      setErrors((prev) => ({
        ...prev,
        submit: "",
      }));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    // Clear any previous submit errors
    setErrors((prev) => ({ ...prev, submit: "" }));

    console.log("errors", errors);
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("Form data:", formData);
    } catch (error) {
      var submitError = "";
      if (error.code) {
        switch (error.code) {
          case "auth/invalid-credential":
            submitError =
              "User with this email/password does not exist. Please try a different email/password or sign up.";
            break;
          default:
            submitError = `Login failed. The following error occurred: ${error.message}`;
        }
      }
      console.error("Log In failed:", error);
      setErrors((prev) => ({
        ...prev,
        submit: submitError,
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUpClick = () => props.setSignupView(true);

  return (
    <form action="">
      <div className="pb-8">
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1 } }}
          noValidate
          autoComplete="off"
          style={{
            margin: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Input
            type="email"
            id="email"
            value={formData.email}
            placeholder="Email"
            inputProps={ariaLabel}
            onChange={handleEmailChange}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
          <Input
            placeholder="Password"
            inputProps={ariaLabel}
            type="password"
            id="password"
            value={formData.password}
            onChange={handlePasswordChange}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}
          <Button
            variant="contained"
            style={{
              fontWeight: "bold",
              marginLeft: 10,
              width: 100,
              alignSelf: "center",
              backgroundColor: isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "primary",
            }}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging In .." : "Log In"}
          </Button>
        </Box>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Typography>Don't have an account?</Typography>
          <Button
            variant="contained"
            style={{ fontWeight: "bold", marginLeft: 10 }}
            onClick={handleSignUpClick}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </form>
  );
}
