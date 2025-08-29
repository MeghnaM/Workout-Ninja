// import React, { useCallback, memo } from "react";
// import TextField from "@mui/material/TextField";
// import { useState, useEffect } from "react";
// import Button from "@mui/material/Button";
// import { FixedSizeList as List } from "react-window";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import Checkbox from "@mui/material/Checkbox";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import { DialogTitle, Typography } from "@mui/material";
// import {
//   StyledBox,
//   StyledSectionHeading,
// } from "../styles/StyledComponentsLibrary";
// import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
// import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
// import { ThemeProvider } from "@mui/material/styles";
// import { theme } from "../styles/StyledComponentsLibrary";
// import { flexDirection } from "@mui/system";

// // interface ToastProps {
// //   message: string;
// //   type?: "success" | "error" | "warning" | "info";
// //   onClose: () => void;
// // }

// function DoWorkout(props) {
//   const {
//     ongoingWorkout,
//     setOngoingWorkout,
//     saveWorkoutInDB,
//     setShowOngoingWorkout,
//     setDoWorkoutModal,
//   } = props;

//   const [toast, setToast] = useState("");
//   console.log("=== DOWORKOUT DEBUG ===");
//   console.log("Full ongoingWorkout:", JSON.stringify(ongoingWorkout, null, 2));
//   console.log("exerciseData array:", ongoingWorkout.exerciseData);

//   if (ongoingWorkout.exerciseData && ongoingWorkout.exerciseData.length > 0) {
//     ongoingWorkout.exerciseData.forEach((ex, index) => {
//       console.log(`Exercise ${index}:`, ex);
//       console.log(`exerciseId type:`, typeof ex.exerciseId);
//       console.log(`exerciseId value:`, ex.exerciseId);
//     });
//   }
//   const exercisesAndData = ongoingWorkout.exerciseData.map((ex) => {
//     return {
//       id: ex.exerciseId._id,
//       exerciseId: ex.exerciseId,
//       exerciseName: ex.exerciseId.exercise,
//       completed: ex.completed,
//       sets: ex.sets,
//     };
//   });
//   const [workoutExerciseData, setWorkoutExerciseData] =
//     useState(exercisesAndData);
//   const [workoutName, setWorkoutName] = useState(ongoingWorkout.workoutName);
//   const [workoutDate, setWorkoutDate] = useState(
//     ongoingWorkout.dateOfWorkout.slice(0, -14)
//   );

//   useEffect(() => {
//     console.log(workoutExerciseData);
//   }, [workoutExerciseData]);

//   const showToast = (message) => {
//     setToast(message);
//     setTimeout(() => setToast(null), 2000);
//   };

//   // const Toast: React.FC<ToastProps> = ({ message, type = "info", onClose }) => {
//   //   return <div className={`toast toast-${type}`}>{message}</div>;
//   // };

//   const Toast = ({ message, type = "info", onClose }) => {
//     return <div className={`toast toast-${type}`}>{message}</div>;
//   };

//   // Create a new object with the updated workoutName, workoutDate
//   // and the completed list of exercises along with sets, reps and weight
//   // Save that object in the DB and set show workout to be false
//   const onCompleteWorkout = (e) => {
//     e.preventDefault();
//     console.log("Complete workout was clicked");

//     // Check form validity
//     if (formIsValid) {
//       // Create a new workout object with the exercises and data,
//       // as well as the new workout name and date
//       const completedWorkout = {
//         ...ongoingWorkout,
//         dateOfWorkout: workoutDate,
//         exerciseData: workoutExerciseData,
//         status: "Completed",
//       };

//       // Call saveWorkoutInDB with the completed workout
//       setOngoingWorkout(completedWorkout);
//       saveWorkoutInDB(completedWorkout, completedWorkout._id);
//     } else {
//       showToast(
//         "Please make sure the workout has a name and a date, and that every completed exercise has the sets, reps and weight fields filled out."
//       );
//     }
//   };

//   const updateExerciseWeights = useCallback(
//     (exerciseIndex, setIndex, field, value) => {
//       setWorkoutExerciseData((prevData) => {
//         const newData = [...prevData];
//         newData[exerciseIndex] = {
//           ...newData[exerciseIndex],
//           sets: newData[exerciseIndex].sets.map((set, index) =>
//             index === setIndex ? { ...set, [field]: value } : set
//           ),
//         };
//         return newData;
//       });
//     },
//     []
//   );

//   const updateExerciseCompleted = useCallback((exerciseIndex, value) => {
//     setWorkoutExerciseData((prevData) => {
//       const newData = [...prevData];
//       newData[exerciseIndex] = {
//         ...newData[exerciseIndex],
//         completed: value,
//       };
//       return newData;
//     });
//   }, []);

//   const onClose = (e) => {
//     e.preventDefault();
//     setDoWorkoutModal(false);
//     console.log("Close without saving");
//     // setCloseAlert(true);
//   };

//   // Handles clicks on buttons within the close dialog
//   const closeDialog = (choice) => {
//     console.log(choice);
//     if (choice === "Yes") {
//       // Set show ongoing workout to false
//       // Don't save workout to the DB
//       setShowOngoingWorkout(false);
//     }
//     // If choice is No, then we don't need to do anything
//     // and simply close the alert
//     // setCloseAlert(false);
//   };

//   const displayExercise = useCallback(
//     (props) => {
//       const { index } = props;
//       // sets = number of fields, each field = reps (non-editable), weight (editable)
//       return (
//         <ListItem
//           key={index}
//           component="div"
//           disablePadding
//           style={{ padding: 20 }}
//         >
//           <ListItemIcon>
//             <Checkbox
//               icon={<RadioButtonUncheckedIcon />}
//               checkedIcon={<RadioButtonCheckedIcon />}
//               checked={workoutExerciseData[index].completed}
//               onChange={(e) =>
//                 updateExerciseCompleted(
//                   index,
//                   !workoutExerciseData[index].completed
//                 )
//               }
//               fontSize="small"
//             />
//           </ListItemIcon>
//           <ListItemText
//             sx={{ color: theme.palette.primary.main, width: 100 }}
//             primary={workoutExerciseData[index].exerciseName}
//           />
//           {/* <TextField
//             label="Sets"
//             defaultValue={exerciseData[index].sets}
//             sx={{ maxWidth: 200 }}
//             onChange={(e) =>
//               updateExerciseData(exerciseData[index].id, "sets", e.target.value)
//             }
//           /> */}
//           {/* <TextField
//             label="Reps"
//             defaultValue={exerciseData[index].reps}
//             sx={{ maxWidth: 200 }}
//             onChange={(e) =>
//               updateExerciseData(exerciseData[index].id, "reps", e.target.value)
//             }
//           /> */}
//           {(workoutExerciseData[index]?.sets || []).map((set, setIndex) => (
//             <div
//               key={setIndex}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 padding: 10,
//               }}
//             >
//               <Typography style={{ paddingBottom: 10 }}>
//                 {set.reps} Reps
//               </Typography>
//               <TextField
//                 label="Weight"
//                 value={set.weight || ""}
//                 sx={{ maxWidth: 65 }}
//                 onChange={(e) =>
//                   updateExerciseWeights(
//                     index,
//                     setIndex,
//                     "weight",
//                     e.target.value
//                   )
//                 }
//               />
//             </div>
//           ))}
//         </ListItem>
//       );
//     },
//     [
//       workoutExerciseData,
//       updateExerciseCompleted,
//       updateExerciseWeights,
//       theme.palette.primary.main,
//     ]
//   );

//   const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
//   const formIsValid = () => {
//     let valid = false;
//     // Form is valid if workout has a name and the date is in the correct format
//     if (workoutName.length > 0 && regex.test(workoutDate)) {
//       // And if for every checked off exercise, sets, reps and weight is populated
//       workoutExerciseData.map((exercise) => {
//         if (
//           exercise.completed &&
//           exercise.sets.length > 0 &&
//           exercise.reps.length > 0 &&
//           exercise.weight.length > 0
//         ) {
//           valid = true;
//         }
//       });
//     }
//     return valid;
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <StyledBox
//         style={{
//           // these styles are just for positioning the modal in the center of the page
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           height: 500,
//           width: 500,
//         }}
//       >
//         <StyledSectionHeading variant="h5">{workoutName}</StyledSectionHeading>
//         <form onSubmit={onCompleteWorkout}>
//           <div className="workoutDisplayRow">
//             {/* <TextField
//               required
//               id="outlined-required"
//               label="Workout Name"
//               error={workoutName.length === 0}
//               helperText={
//                 workoutName.length === 0 ? "Field cannot be empty" : ""
//               }
//               defaultValue={workoutName}
//               onChange={(e) => setWorkoutName(e.target.value)}
//             /> */}

//             <TextField
//               required
//               id="outlined-required"
//               label="Workout Date"
//               // error={!regex.test(workoutDate)}
//               // helperText={
//               //   !regex.test(workoutDate) ? "Date format - YYYY-MM-DD" : ""
//               // }
//               placeholder="YYYY-MM-DD"
//               defaultValue={workoutDate}
//               onChange={(e) => setWorkoutDate(e.target.value)}
//             />
//           </div>

//           <div style={{ height: 300, overflow: "auto" }}>
//             {workoutExerciseData.map((exercise, index) =>
//               displayExercise({ index, key: index, style: {} })
//             )}
//           </div>

//           <div className="workoutDisplayRow">
//             <Button variant="contained" onClick={onClose}>
//               Close
//             </Button>
//             <Button type="submit" variant="contained">
//               Complete Workout
//             </Button>
//           </div>
//         </form>
//       </StyledBox>
//     </ThemeProvider>
//   );
// }

// export default DoWorkout;

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Snackbar,
  Alert,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

// type SetEntry = { reps: number | string; weight?: number | string };
// type ExerciseRow = {
//   id: string;
//   exerciseId: any;
//   exerciseName: string;
//   completed: boolean;
//   sets: SetEntry[];
// };

// interface Props {
//   ongoingWorkout: any;
//   setOngoingWorkout: (w: any) => void;
//   saveWorkoutInDB: (workout: any, id: string) => Promise<void> | void;
//   setShowOngoingWorkout: (v: boolean) => void;
//   setDoWorkoutModal: (v: boolean) => void;
// }

function formatDateForInput(d) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isValidISODate(yyyyMmDd) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(yyyyMmDd)) return false;
  const d = new Date(yyyyMmDd);
  return !isNaN(d.getTime());
}

const DoWorkout = ({
  ongoingWorkout,
  setOngoingWorkout,
  saveWorkoutInDB,
  setShowOngoingWorkout,
  setDoWorkoutModal,
}) => {
  // Initialize rows from incoming workout
  const initialRows = useMemo(() => {
    const src = ongoingWorkout?.exerciseData ?? [];
    return src.map((ex) => ({
      id: ex.exerciseId?._id ?? String(Math.random()),
      exerciseId: ex.exerciseId,
      exerciseName: ex.exerciseId?.exercise ?? "Exercise",
      completed: Boolean(ex.completed),
      // copy sets; ensure weight property exists so it's controlled
      sets: (ex.sets || []).map((s) => ({
        reps: s.reps,
        weight: s.weight ?? "",
      })),
    }));
  }, [ongoingWorkout]);

  const [rows, setRows] = useState(initialRows);
  const [workoutName, setWorkoutName] = useState(
    ongoingWorkout?.workoutName || ""
  );
  const [workoutDate, setWorkoutDate] = useState(
    formatDateForInput(ongoingWorkout?.dateOfWorkout)
  );

  const [snack, setSnack] = useState(null);

  useEffect(() => {
    setRows(initialRows);
    setWorkoutName(ongoingWorkout?.workoutName || "");
    setWorkoutDate(formatDateForInput(ongoingWorkout?.dateOfWorkout));
  }, [initialRows, ongoingWorkout]);

  const updateWeight = useCallback((rowIndex, setIndex, weight) => {
    setRows((prev) => {
      const next = [...prev];
      const sets = [...next[rowIndex].sets];
      sets[setIndex] = { ...sets[setIndex], weight };
      next[rowIndex] = { ...next[rowIndex], sets };
      return next;
    });
  }, []);

  const toggleCompleted = useCallback((rowIndex) => {
    setRows((prev) => {
      const next = [...prev];
      next[rowIndex] = {
        ...next[rowIndex],
        completed: !next[rowIndex].completed,
      };
      return next;
    });
  }, []);

  // Validation: name, date; for each completed exercise, every set needs a number in weight
  const formIsValid = useMemo(() => {
    if (!workoutName.trim()) return false;
    if (!isValidISODate(workoutDate)) return false;
    for (const r of rows) {
      if (r.completed) {
        for (const s of r.sets) {
          const n = parseFloat(String(s.weight));
          if (!isFinite(n)) return false;
        }
      }
    }
    return true;
  }, [workoutName, workoutDate, rows]);

  const onCompleteWorkout = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      setSnack({
        msg: "Please enter a workout name, a valid date, and weights for all completed sets.",
        sev: "error",
      });
      return;
    }

    // Build payload back into the same shape your API expects
    const exerciseData = rows.map((r) => ({
      exerciseId: r.exerciseId,
      completed: r.completed,
      sets: r.sets.map((s) => ({
        reps: s.reps,
        weight: s.weight === "" ? undefined : Number(s.weight),
      })),
    }));

    const completedWorkout = {
      ...ongoingWorkout,
      workoutName: workoutName.trim(),
      dateOfWorkout: new Date(workoutDate).toISOString(),
      exerciseData,
      status: "Completed",
    };

    setOngoingWorkout(completedWorkout);
    saveWorkoutInDB(completedWorkout, completedWorkout._id);
    setSnack({ msg: "Workout saved", sev: "success" });
  };

  const onCloseWithoutSaving = () => {
    setDoWorkoutModal(false);
    setShowOngoingWorkout(false);
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 3 },
        width: { xs: "100%", sm: 720 },
        maxWidth: "100%",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography
          variant="h5"
          fontWeight={900}
          color="primary"
          sx={{ flexGrow: 1 }}
        >
          Complete workout
        </Typography>
        <IconButton onClick={onCloseWithoutSaving} aria-label="Close">
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Mark finished lifts and enter weights for each set.
      </Typography>

      {/* Workout meta */}
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, mb: 2 }}>
        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={8}>
            <TextField
              label="Workout name"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Date"
              type="date"
              value={workoutDate}
              onChange={(e) => setWorkoutDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={Boolean(workoutDate) && !isValidISODate(workoutDate)}
              helperText={
                Boolean(workoutDate) && !isValidISODate(workoutDate)
                  ? "Use YYYY-MM-DD"
                  : " "
              }
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Exercises */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 3,
          mb: 2,
          maxHeight: { xs: 380, sm: 420 },
          overflow: "auto",
        }}
      >
        {rows.map((row, i) => (
          <Box key={row.id || i} sx={{ mb: 1.5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1,
              }}
            >
              <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={row.completed}
                onChange={() => toggleCompleted(i)}
                color="secondary"
              />
              <Typography variant="subtitle1" fontWeight={800} color="primary">
                {row.exerciseName}
              </Typography>
            </Box>

            <Grid container spacing={1.5}>
              {(row.sets || []).map((s, si) => (
                <Grid item xs={12} sm={6} md={4} key={si}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.25,
                      borderRadius: 2,
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ minWidth: 56 }}
                    >
                      {s.reps} reps
                    </Typography>
                    <TextField
                      label="Weight"
                      type="number"
                      inputProps={{ step: "0.5", min: "0" }}
                      value={s.weight ?? ""}
                      onChange={(e) => updateWeight(i, si, e.target.value)}
                      size="small"
                      sx={{ flex: 1 }}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {i < rows.length - 1 && <Divider sx={{ mt: 1.5 }} />}
          </Box>
        ))}

        {rows.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No exercises found for this workout.
          </Typography>
        )}
      </Paper>

      {/* Actions */}
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          justifyContent: "flex-end",
          position: { xs: "static", sm: "static" },
        }}
      >
        <Button variant="outlined" onClick={onCloseWithoutSaving}>
          Close
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={onCompleteWorkout}
          disabled={!formIsValid}
          sx={{ fontWeight: 800 }}
        >
          Complete Workout
        </Button>
      </Box>

      <Snackbar
        open={Boolean(snack)}
        autoHideDuration={2500}
        onClose={() => setSnack(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack(null)}
          severity={snack?.sev || "info"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack?.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DoWorkout;
