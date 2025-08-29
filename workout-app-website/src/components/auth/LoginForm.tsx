// //import { firebaseConfig } from "./firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Box from "@mui/material/Box";
// import Input from "@mui/material/Input";
// import Button from "@mui/material/Button";
// import { Typography } from "@mui/material";
// import Alert from "@mui/material/Alert";
// import { auth } from "../../firebase";

// // TODO
// // Typescript
// // Form to sign up new user, or log in with email and password
// // App opens to this page, once user logs in then they see their workout ninja profile
// // Page has heading and form

// const ariaLabel = { "aria-label": "description" };

// interface FormData {
//   email: string;
//   password: string;
// }

// interface FormErrors {
//   email?: string;
//   password?: string;
//   submit?: string;
// }

// interface Props {
//   setSignupView: (signupView: boolean) => void;
// }

// export default function LoginForm(props: Props) {
//   const [formData, setFormData] = useState<FormData>({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};
//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters long";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length == 0;
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const value = e.target.value;
//     setFormData((prev) => ({
//       ...prev,
//       email: value,
//     }));
//     // Clear error when user starts typing
//     if (errors.email) {
//       setErrors((prev) => ({
//         ...prev,
//         email: "",
//       }));
//     }
//     if (errors.submit) {
//       setErrors((prev) => ({
//         ...prev,
//         submit: "",
//       }));
//     }
//   };

//   const handlePasswordChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ): void => {
//     const value = e.target.value;
//     setFormData((prev) => ({
//       ...prev,
//       password: value,
//     }));

//     // Clear error when user starts typing
//     if (errors.password) {
//       setErrors((prev) => ({
//         ...prev,
//         password: "",
//       }));
//     }
//     if (errors.submit) {
//       setErrors((prev) => ({
//         ...prev,
//         submit: "",
//       }));
//     }
//   };

//   const handleSubmit = async (): Promise<void> => {
//     // Clear any previous submit errors
//     setErrors((prev) => ({ ...prev, submit: "" }));

//     console.log("errors", errors);
//     if (!validateForm()) {
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       await signInWithEmailAndPassword(auth, formData.email, formData.password);
//       navigate("/dashboard", { replace: true });
//       console.log("navigate called");
//     } catch (error) {
//       var submitError = "";
//       if (error.code) {
//         switch (error.code) {
//           case "auth/invalid-credential":
//             submitError =
//               "User with this email/password does not exist. Please try a different email/password or sign up.";
//             break;
//           default:
//             submitError = `Login failed. The following error occurred: ${error.message}`;
//         }
//       }
//       console.error("Log In failed:", error);
//       setErrors((prev) => ({
//         ...prev,
//         submit: submitError,
//       }));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleSignUpClick = () => props.setSignupView(true);

//   return (
//     <form action="">
//       <div className="pb-8">
//         <Box
//           component="form"
//           sx={{ "& > :not(style)": { m: 1 } }}
//           noValidate
//           autoComplete="off"
//           style={{
//             margin: 10,
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <Input
//             type="email"
//             id="email"
//             value={formData.email}
//             placeholder="Email"
//             inputProps={ariaLabel}
//             onChange={handleEmailChange}
//           />
//           {errors.email && (
//             <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//           )}
//           <Input
//             placeholder="Password"
//             inputProps={ariaLabel}
//             type="password"
//             id="password"
//             value={formData.password}
//             onChange={handlePasswordChange}
//           />
//           {errors.password && (
//             <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//           )}
//           {errors.submit && (
//             <div className="p-3 bg-red-50 border border-red-200 rounded-md">
//               <p className="text-sm text-red-600">{errors.submit}</p>
//             </div>
//           )}
//           <Button
//             variant="contained"
//             style={{
//               fontWeight: "bold",
//               marginLeft: 10,
//               width: 100,
//               alignSelf: "center",
//               backgroundColor: isSubmitting
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "primary",
//             }}
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Logging In .." : "Log In"}
//           </Button>
//         </Box>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "center",
//             marginTop: 20,
//           }}
//         >
//           <Typography>Don't have an account?</Typography>
//           <Button
//             variant="contained"
//             style={{ fontWeight: "bold", marginLeft: 10 }}
//             onClick={handleSignUpClick}
//           >
//             Sign Up
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// }

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Alert,
  Typography,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

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

export default function LoginForm({ setSignupView }: Props) {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Please enter a valid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange =
    (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
      if (errors.submit) setErrors((prev) => ({ ...prev, submit: "" }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, submit: "" }));
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      let submitError = "Login failed.";
      if (err?.code) {
        switch (err.code) {
          case "auth/invalid-credential":
          case "auth/wrong-password":
          case "auth/user-not-found":
            submitError =
              "User with this email/password does not exist. Please try again or sign up.";
            break;
          default:
            submitError = `Login failed. The following error occurred: ${
              err.message || err.code
            }`;
        }
      }
      setErrors((prev) => ({ ...prev, submit: submitError }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        // minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        borderRadius: 5,
        boxShadow: "0 14px 28px rgba(0,0,0,0.12), 0 10px 10px rgba(0,0,0,0.08)",
        bgcolor: (t) => t.palette.background.default,
        px: 2,
        py: 6,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 520,
          borderRadius: 3,
          borderColor: (t) => t.palette.divider,
          overflow: "hidden",
        }}
      >
        <CardHeader
          title={
            <Typography variant="h4" fontWeight={900} color="primary">
              Workout Ninja
            </Typography>
          }
          subheader={
            <>
              <Typography variant="body2" color="text.secondary">
                Serious training, simple tracking.
              </Typography>
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ letterSpacing: 2, fontWeight: 800 }}
              >
                LOG IN
              </Typography>
            </>
          }
          sx={{ pb: 0, mt: 1 }}
        />

        <CardContent sx={{ pt: 3 }}>
          {errors.submit && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.submit}
            </Alert>
          )}

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={1.5}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  autoComplete="email"
                  fullWidth
                  error={Boolean(errors.email)}
                  helperText={errors.email || " "}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange("password")}
                  autoComplete="current-password"
                  fullWidth
                  error={Boolean(errors.password)}
                  helperText={errors.password || " "}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={() => setShowPassword((v) => !v)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 0.5 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary" // orange to match your theme
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ py: 1.1, fontWeight: 800, borderRadius: 2 }}
                >
                  {isSubmitting ? "Logging in…" : "Log In"}
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Don’t have an account?{" "}
                  <Link
                    component="button"
                    onClick={() => setSignupView(true)}
                    underline="hover"
                  >
                    Sign up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Optional: demo + GitHub quick links for consistency with signup */}
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "center",
              gap: 1.5,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              size="small"
              startIcon={<PlayArrowRoundedIcon />}
              href="/#demo"
            >
              Watch demo
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<GitHubIcon />}
              href="https://github.com/MeghnaM/Workout-Ninja"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
