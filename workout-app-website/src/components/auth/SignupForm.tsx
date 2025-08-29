//

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
import {
  createUserWithEmailAndPassword,
  deleteUser,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  submit?: string;
}

interface Props {
  setSignupView: (signupView: boolean) => void;
}

export default function SignUpForm({ setSignupView }: Props) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [errors, setErrors] = useState<FormErrors>({});
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";

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
      // clear specific error + submit error while typing
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
      if (errors.submit) setErrors((prev) => ({ ...prev, submit: "" }));
    };

  const onCreateNewUser = async (firebaseUser: { uid: string }) => {
    const user = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      firebaseUid: firebaseUser.uid,
    };

    const result = await fetch(`${apiUrl}/create-new-user`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });

    const resultText = await result.text();
    if (resultText === "Something went wrong") {
      setErrors((prev) => ({
        ...prev,
        submit: "The following error occurred: Unable to create user in DB.",
      }));
      try {
        await deleteUser(firebaseUser as any);
      } catch (_) {}
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, submit: "" }));
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(userCredential.user, {
        displayName: formData.firstName,
      });

      const ok = await onCreateNewUser(userCredential.user);
      if (!ok) return;

      setRegistrationSuccessful(true);
      setTimeout(() => navigate("/home", { replace: true }), 600);
    } catch (err: any) {
      let submitError = "Registration failed.";
      if (err?.code === "auth/email-already-in-use") {
        submitError =
          "User with this email already exists. Please log in or try a different email.";
      } else if (err?.message) {
        submitError = `The following error occurred: ${err.message}`;
      }
      setErrors((prev) => ({ ...prev, submit: submitError }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAlertClose = () => {
    setRegistrationSuccessful(false);
    setFormData({ firstName: "", lastName: "", email: "", password: "" });
  };

  const toLogin = () => setSignupView(false);

  return (
    <Box
      sx={{
        // minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        borderRadius: 10,
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
              Create your Workout Ninja account
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="text.secondary">
              Serious training, simple tracking. Sign up to start building and
              logging workouts.
            </Typography>
          }
          sx={{ pb: 0, mt: 1 }}
        />

        <CardContent sx={{ pt: 3 }}>
          {errors.submit && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.submit}
            </Alert>
          )}
          {registrationSuccessful && (
            <Alert
              onClose={handleAlertClose}
              variant="filled"
              severity="success"
              sx={{ mb: 2 }}
            >
              Your account has been created — welcome to Workout Ninja!
            </Alert>
          )}

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First name"
                  value={formData.firstName}
                  onChange={handleChange("firstName")}
                  autoComplete="given-name"
                  fullWidth
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName || " "}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last name"
                  value={formData.lastName}
                  onChange={handleChange("lastName")}
                  autoComplete="family-name"
                  fullWidth
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName || " "}
                />
              </Grid>
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
                  autoComplete="new-password"
                  fullWidth
                  error={Boolean(errors.password)}
                  helperText={errors.password || "Minimum 8 characters"}
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
                  color="secondary" // orange
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ py: 1.1, fontWeight: 800, borderRadius: 2 }}
                >
                  {isSubmitting ? "Creating account…" : "Sign Up"}
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Already have an account?{" "}
                  <Link component="button" onClick={toLogin} underline="hover">
                    Log in
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Optional: demo + GitHub quick links */}
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
