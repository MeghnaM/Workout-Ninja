//import { firebaseConfig } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { paperClasses, Typography } from "@mui/material";
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

export default function SignUpForm(props: Props) {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const apiUrl = process.env.REACT_APP_API_URL;
  const [errors, setErrors] = useState<FormErrors>({});
  const [newUserFirebaseId, setNewUserFirebaseId] = useState<String>("");
  const [registrationSuccessful, setRegistrationSuccessful] =
    useState<boolean>(false);
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

  const onCreateNewUser = async (e: Event) => {
    e.preventDefault();
    console.log("Create new user was clicked.");
    const uid = newUserFirebaseId;
    const user = {
      email: formData.email,
      password: formData.password,
      firebaseUid: uid,
    };

    let result: Response = await fetch(`${apiUrl}/create-new-user`, {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resultText: string = await result.text();
    if (resultText !== "Something went wrong") {
      const resultObject = JSON.parse(resultText);
      console.log(resultObject);
      setNewUserFirebaseId("");
      alert("Data saved succesfully!");
    }
  };

  const handleSubmit = async (e: Event): Promise<void> => {
    // Clear any previous submit errors
    setErrors((prev) => ({ ...prev, submit: "" }));

    console.log("errors", errors);
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
        .then((userCredential) => {
          console.log("User UID:", userCredential.user.uid);
          setNewUserFirebaseId(userCredential.user.uid);
        })
        .catch((error) => {
          console.log("Error while creating user in Firebase:", error);
        });
      setRegistrationSuccessful(true);
      onCreateNewUser(e);
      console.log("Form data:", formData);
    } catch (error) {
      var submitError = "";
      if (error.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
            submitError =
              "User with this email already exists. Please log in or try a different email.";
            break;
          default:
            submitError = `The following error occurred: ${error.message}`;
        }
      }
      console.error("Registration failed:", error);
      setErrors((prev) => ({
        ...prev,
        submit: submitError,
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAlertClose = () => {
    setRegistrationSuccessful(false);
    setFormData({ email: "", password: "" });
  };

  const handleLoginButtonClick = () => props.setSignupView(false);

  return (
    <form action="">
      <div className="pb-8">
        <Typography>
          Create a new account to sign up for Workout Ninja
        </Typography>
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
            {isSubmitting ? "Signing Up .." : "Sign Up"}
          </Button>
        </Box>
        {registrationSuccessful && (
          <Alert
            onClose={handleAlertClose}
            variant="filled"
            severity="success"
            color="secondary"
          >
            Your account has been created, welcome to Workout Ninja!
          </Alert>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Typography>Already have an account?</Typography>
          <Button
            variant="contained"
            style={{ fontWeight: "bold", marginLeft: 10 }}
            onClick={handleLoginButtonClick}
          >
            Log In
          </Button>
        </div>
      </div>
    </form>
  );
}
