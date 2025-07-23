//import { firebaseConfig } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

// TODO
// Typescript
// Form to sign up new user, or log in with email and password
// App opens to this page, once user logs in then they see their workout ninja profile
// Page has heading and form

const ariaLabel = { "aria-label": "description" };

export default function SignUp() {
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
          <Input placeholder="Email" inputProps={ariaLabel} />
          <Input placeholder="Password" inputProps={ariaLabel} />
          <Button
            variant="contained"
            style={{
              fontWeight: "bold",
              marginLeft: 10,
              width: 100,
              alignSelf: "center",
            }}
          >
            Sign Up
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
          <Typography>Already have an account?</Typography>
          <Button
            variant="contained"
            style={{ fontWeight: "bold", marginLeft: 10 }}
          >
            Log In
          </Button>
        </div>
      </div>

      {/* <TextField
        type="string"
        placeholder="Exercise Name"
        variant="outlined"
        sx={{ marginRight: 2 }}
        value={newExercise}
        onChange={(e) => setNewExercise(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        className="bg-indigo-500"
        onClick={onAddNewExercise}
      >
        Add
      </Button> */}
    </form>
  );
}
