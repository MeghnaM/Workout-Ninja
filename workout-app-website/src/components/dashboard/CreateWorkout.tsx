// import React, { useState, useEffect, useCallback } from "react";
// import {
//   StyledBox,
//   StyledSectionSubheading,
//   StyledListItemText,
// } from "../styles/StyledComponentsLibrary";
// import { Button, Typography } from "@mui/material";
// import { ThemeProvider } from "@mui/material/styles";
// import { theme } from "../styles/StyledComponentsLibrary";
// import { FixedSizeList as List } from "react-window";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
// import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
// import TextField from "@mui/material/TextField";
// import { create } from "domain";
// import {
//   StyledIconButton,
//   StyledSectionHeading,
// } from "../../components/styles/StyledComponentsLibrary";

// interface ToastProps {
//   message: string;
//   type?: "success" | "error" | "warning" | "info";
//   onClose: () => void;
// }

// interface ExerciseData {
//   [index: number]: {
//     sets: number;
//     reps: number;
//   };
// }

// // Modal that contains -
// // Workout name input field
// // List of exercises to choose from
// // Save workout button
// export default function CreateWorkout(props) {
//   const { setAddNewWorkoutModal, exerciseList, onCreateNewWorkout } = props;
//   const [selectedExercises, setSelectedExercises] = useState<Set<number>>(
//     new Set()
//   );
//   const [exerciseData, setExerciseData] = useState<ExerciseData>({});
//   const [workoutName, setWorkoutName] = useState<string>("");
//   const [toast, setToast] = useState<string | null>(null);

//   const onCancelClick = () => {
//     setAddNewWorkoutModal(false);
//   };

//   const showToast = (message: string, type?: string) => {
//     setToast(message);
//     setTimeout(() => setToast(null), 2000);
//   };

//   const Toast: React.FC<ToastProps> = ({ message, type = "info", onClose }) => {
//     return <div className={`toast toast-${type}`}>{message}</div>;
//   };

//   const setsOrRepsMissing = (): Boolean => {
//     if (selectedExercises.size !== Object.keys(exerciseData).length) {
//       return true;
//     }
//     for (const index of Array.from(selectedExercises)) {
//       const data = exerciseData[index];

//       // If no data exists, or sets/reps are missing/zero
//       if (
//         !data ||
//         !data.sets ||
//         !data.reps ||
//         data.sets <= 0 ||
//         data.reps <= 0
//       ) {
//         console.log(`Missing data for selected exercise ${index}:`, data);
//         return true;
//       }
//     }
//     // for (const index in Object.keys(exerciseData)) {
//     //   if (exerciseData[index].sets === 0 || exerciseData[index].reps === 0) {
//     //     return false;
//     //   }
//     // }
//     return false;
//   };

//   // Verify that name is not empty
//   // Send a call to the DB with the selected exercises + user
//   // How is New Workout setting "selected" on exercises?
//   // Because I think dashboard is making the call to the DB
//   const onCreateWorkoutClick = (e) => {
//     if (workoutName.length === 0) {
//       showToast("Workout name is required.", "error");
//     } else if (selectedExercises.size === 0) {
//       showToast("Please select at least one exercise.", "error");
//     } else if (setsOrRepsMissing()) {
//       showToast("Please make sure all selected exercises have sets and reps.");
//     } else {
//       console.log("Workout can be added to db.");
//       const exerciseIds = Array.from(selectedExercises).map(
//         (index) => exerciseList[index]._id
//       );
//       const exerciseDataForBackend = Array.from(selectedExercises).map(
//         (index) => {
//           console.log(
//             "Here is the exercise information - ",
//             exerciseList[index].ex._id
//           );
//           const exId = exerciseList[index].ex._id;
//           const numberOfSets = exerciseData[index]?.sets || 3;
//           const repsPerSet = exerciseData[index]?.reps || 10;
//           const sets = Array.from({ length: numberOfSets }).map(() => ({
//             reps: repsPerSet,
//             weight: 0,
//           }));
//           return { exerciseId: exId, sets: sets, completed: false };
//         }
//       );
//       console.log(
//         "Here is the exercise data on the frontend - ",
//         exerciseDataForBackend
//       );
//       onCreateNewWorkout(e, workoutName, exerciseIds, exerciseDataForBackend);
//     }
//   };

//   const handleSetsChange = (index, value) => {
//     setExerciseData({
//       ...exerciseData,
//       [index]: {
//         sets: value,
//         reps: exerciseData[index]?.reps || 0,
//       },
//     });
//   };

//   const handleRepsChange = (index, value) => {
//     setExerciseData({
//       ...exerciseData,
//       [index]: {
//         reps: value,
//         sets: exerciseData[index]?.sets || 0,
//       },
//     });
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
//           height: 600,
//           minWidth: 500,
//         }}
//       >
//         <StyledSectionHeading
//           style={{
//             fontSize: 20,
//             fontWeight: "bold",
//             fontFamily: "Lato, sans-serif",
//           }}
//         >
//           Create New Workout
//         </StyledSectionHeading>
//         <TextField
//           id="workout-name"
//           label="Workout Name"
//           variant="outlined"
//           onChange={(e) => setWorkoutName(e.target.value)}
//           style={{ marginBottom: 20, marginLeft: 20 }}
//         />

//         <div
//           style={{
//             height: 300,
//             width: 450,
//             overflowY: "auto",
//             border: "1px solid #ccc",
//             borderRadius: "4px",
//             padding: 10,
//           }}
//         >
//           {exerciseList.map((exercise, index) => {
//             return (
//               <div key={exercise._id || index}>
//                 <ListItem component="div" disablePadding>
//                   <ListItemButton
//                     onClick={() => {
//                       setSelectedExercises((exercises) => {
//                         const selected = new Set(exercises);
//                         if (selectedExercises.has(index)) {
//                           selected.delete(index);
//                         } else {
//                           selected.add(index);
//                         }
//                         return selected;
//                       });
//                     }}
//                   >
//                     <ListItemIcon sx={{ color: theme.palette.primary.main }}>
//                       {selectedExercises.has(index) ? (
//                         <RadioButtonCheckedIcon />
//                       ) : (
//                         <RadioButtonUncheckedIcon />
//                       )}
//                     </ListItemIcon>

//                     <StyledListItemText
//                       sx={{ color: theme.palette.primary.main }}
//                       primary={exerciseList[index].ex.exercise}
//                     />
//                   </ListItemButton>

//                   <TextField
//                     label="sets"
//                     variant="outlined"
//                     value={exerciseData[index]?.sets || ""}
//                     onChange={(e) => handleSetsChange(index, e.target.value)}
//                   />

//                   <TextField
//                     label="reps"
//                     variant="filled"
//                     value={exerciseData[index]?.reps || ""}
//                     onChange={(e) => handleRepsChange(index, e.target.value)}
//                   />
//                 </ListItem>
//               </div>
//             );
//           })}
//         </div>

//         <StyledIconButton
//           onClick={(e) => onCreateWorkoutClick(e)}
//           style={{ margin: 10 }}
//         >
//           Create
//         </StyledIconButton>
//         <StyledIconButton onClick={onCancelClick} style={{ margin: 10 }}>
//           Cancel
//         </StyledIconButton>
//         <div style={{ margin: 15 }}>
//           {toast && <Toast message={toast} onClose={() => setToast(null)} />}
//         </div>
//       </StyledBox>
//     </ThemeProvider>
//   );
// }

// {
//   /* <List
//           height={300}
//           width={400}
//           itemSize={100}
//           itemCount={exerciseList.length}
//           overscanCount={5}
//         >
//           {exerciseRow}
//         </List> */
// }

// // const exerciseRow = React.forwardRef<HTMLDivElement, any>((props, ref) => {
// //   const { index, style } = props;

// //   const handleExerciseClick = () => {
// //     setSelectedExercises((exercises) => {
// //       const selected = new Set(exercises);
// //       if (selectedExercises.has(index)) {
// //         selected.delete(index);
// //       } else {
// //         selected.add(index);
// //       }
// //       return selected;
// //     });
// //   };

// //   return (
// //     <div ref={ref} style={style}>
// //       <ListItem key={index} component="div" disablePadding>
// //         <ListItemButton onClick={handleExerciseClick}>
// //           <ListItemIcon sx={{ color: theme.palette.primary.main }}>
// //             {selectedExercises.has(index) ? (
// //               <RadioButtonCheckedIcon />
// //             ) : (
// //               <RadioButtonUncheckedIcon />
// //             )}
// //           </ListItemIcon>
// //           <StyledListItemText
// //             sx={{ color: theme.palette.primary.main }}
// //             primary={exerciseList[index].ex.exercise}
// //           />
// //         </ListItemButton>
// //         <TextField
// //           id="sets"
// //           label="sets"
// //           variant="filled"
// //           value={exerciseData[index]?.sets}
// //           onChange={(e) => handleSetsChange(index, e.target.value)}
// //         />
// //         <TextField
// //           id="reps"
// //           label="reps"
// //           variant="filled"
// //           value={exerciseData[index]?.reps}
// //           onChange={(e) => handleRepsChange(index, e.target.value)}
// //         />
// //       </ListItem>
// //     </div>
// //   );
// // });

import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Paper,
  Snackbar,
  Alert,
  TextField,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import {
  StyledBox,
  StyledSectionHeading,
  StyledListItemText,
} from "../styles/StyledComponentsLibrary";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../styles/StyledComponentsLibrary";

type ExerciseRow = { ex: { _id: string; exercise: string } };

interface ExerciseDataById {
  [id: string]: { sets: number; reps: number };
}

interface Props {
  setAddNewWorkoutModal: (open: boolean) => void;
  exerciseList: ExerciseRow[]; // [{ ex: { _id, exercise }, selected }]
  onCreateNewWorkout: (
    e: React.FormEvent,
    newWorkoutName: string,
    newWorkoutExercises: string[], // ids
    newWorkoutExerciseData: Array<{
      exerciseId: string;
      sets: { reps: number; weight: number }[];
      completed: boolean;
    }>
  ) => void;
}

export default function CreateWorkout({
  setAddNewWorkoutModal,
  exerciseList = [],
  onCreateNewWorkout,
}: Props) {
  // ID-based selection so filtering doesn't break state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [exerciseData, setExerciseData] = useState<ExerciseDataById>({});
  const [workoutName, setWorkoutName] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [snack, setSnack] = useState<{
    msg: string;
    sev?: "success" | "error" | "warning" | "info";
  } | null>(null);

  const onCancelClick = () => setAddNewWorkoutModal(false);
  const showToast = (
    msg: string,
    sev: "success" | "error" | "warning" | "info" = "info"
  ) => setSnack({ msg, sev });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return exerciseList;
    return exerciseList.filter((row) =>
      row?.ex?.exercise?.toLowerCase().includes(q)
    );
  }, [exerciseList, query]);

  const toggleExercise = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSetsChange = (id: string, value: string) => {
    const n = Math.max(1, Math.min(20, Number(value) || 0));
    setExerciseData((prev) => ({
      ...prev,
      [id]: { sets: n, reps: prev[id]?.reps ?? 0 },
    }));
  };

  const handleRepsChange = (id: string, value: string) => {
    const n = Math.max(1, Math.min(50, Number(value) || 0));
    setExerciseData((prev) => ({
      ...prev,
      [id]: { reps: n, sets: prev[id]?.sets ?? 0 },
    }));
  };

  const setsOrRepsMissing = (): boolean => {
    if (selectedIds.size === 0) return true;
    for (const id of Array.from(selectedIds)) {
      const d = exerciseData[id];
      if (!d || !d.sets || !d.reps || d.sets <= 0 || d.reps <= 0) return true;
    }
    return false;
  };

  const formValid =
    workoutName.trim().length > 0 &&
    selectedIds.size > 0 &&
    !setsOrRepsMissing();

  const onCreateWorkoutClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workoutName.trim())
      return showToast("Workout name is required.", "error");
    if (selectedIds.size === 0)
      return showToast("Please select at least one exercise.", "error");
    if (setsOrRepsMissing())
      return showToast(
        "Please make sure all selected exercises have sets and reps.",
        "error"
      );

    const ids = Array.from(selectedIds);
    const exerciseDataForBackend = ids.map((id) => {
      const numberOfSets = exerciseData[id]?.sets || 3;
      const repsPerSet = exerciseData[id]?.reps || 10;
      const sets = Array.from({ length: numberOfSets }).map(() => ({
        reps: repsPerSet,
        weight: 0,
      }));
      return { exerciseId: id, sets, completed: false };
    });

    onCreateNewWorkout(e, workoutName.trim(), ids, exerciseDataForBackend);
    showToast("Workout created", "success");
  };

  return (
    <ThemeProvider theme={theme}>
      {/* IMPORTANT: inside a Dialog, DO NOT absolutely-position this box.
         Use static/relative so the Dialog Paper can size properly. */}
      <StyledBox
        style={{
          position: "static", // <-- fix the "sliver" issue
          transform: "none", // <-- fix the "sliver" issue
          top: "auto",
          left: "auto",
          height: "auto",
          minWidth: 560,
          maxWidth: "min(100vw - 48px, 880px)",
          margin: 0,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3,
            border: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <StyledSectionHeading variant="h5" sx={{ flexGrow: 1 }}>
              Create New Workout
            </StyledSectionHeading>
            <IconButton onClick={onCancelClick}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select exercises and set default <strong>sets × reps</strong> for
            each.
          </Typography>

          {/* Workout name */}
          <TextField
            label="Workout name"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            error={workoutName.trim().length === 0}
            helperText={workoutName.trim().length === 0 ? "Required" : " "}
          />

          {/* Search */}
          <TextField
            label="Search exercises"
            placeholder="Type to filter (e.g., squat)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            size="small"
            sx={{ mb: 1.5 }}
          />

          {/* List header */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 120px 120px",
              gap: 1,
              px: 1,
              mb: 1,
              color: "text.secondary",
              fontSize: 12,
            }}
          >
            <span>Exercise</span>
            <span>Sets</span>
            <span>Reps</span>
          </Box>

          {/* Exercise list */}
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 2,
              maxHeight: 360,
              overflowY: "auto",
              mb: 2,
            }}
          >
            {filtered.map((row, idx) => {
              const id = row?.ex?._id;
              const name = row?.ex?.exercise || "Exercise";
              const selected = selectedIds.has(id);
              const rowData = exerciseData[id] || { sets: 0, reps: 0 };
              const rowError = selected && (!rowData.sets || !rowData.reps);

              return (
                <Box key={id || idx}>
                  <ListItem
                    disablePadding
                    sx={{
                      px: 1,
                      py: 0.5,
                      alignItems: "center",
                      bgcolor: selected ? "action.hover" : "transparent",
                    }}
                  >
                    {/* select + name */}
                    <ListItemButton
                      onClick={() => toggleExercise(id)}
                      sx={{ flex: 1, pr: 1, borderRadius: 1 }}
                    >
                      <ListItemIcon
                        sx={{ minWidth: 36, color: "secondary.main" }}
                      >
                        <Checkbox
                          edge="start"
                          checked={selected}
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<RadioButtonCheckedIcon />}
                          tabIndex={-1}
                          disableRipple
                          color="secondary"
                        />
                      </ListItemIcon>
                      <StyledListItemText
                        primary={name}
                        sx={{ color: "primary.main", mr: 1 }}
                      />
                    </ListItemButton>

                    {/* sets */}
                    <TextField
                      label="Sets"
                      type="number"
                      size="small"
                      inputProps={{ min: 1, max: 20, step: 1 }}
                      value={rowData.sets || ""}
                      onChange={(e) => handleSetsChange(id, e.target.value)}
                      sx={{ width: 110, mr: 1 }}
                      error={rowError && !rowData.sets}
                    />

                    {/* reps */}
                    <TextField
                      label="Reps"
                      type="number"
                      size="small"
                      inputProps={{ min: 1, max: 50, step: 1 }}
                      value={rowData.reps || ""}
                      onChange={(e) => handleRepsChange(id, e.target.value)}
                      sx={{ width: 110, mr: 1 }}
                      error={rowError && !rowData.reps}
                    />
                  </ListItem>

                  <Divider />
                </Box>
              );
            })}

            {filtered.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                No matches. Try a different search.
              </Typography>
            )}
          </Paper>

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {selectedIds.size} selected
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="text" onClick={onCancelClick}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={onCreateWorkoutClick}
                disabled={!formValid}
                sx={{ fontWeight: 800, borderRadius: 2 }}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Snackbar */}
        <Snackbar
          open={Boolean(snack)}
          autoHideDuration={2000}
          onClose={() => setSnack(null)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity={snack?.sev || "info"}
            variant="filled"
            onClose={() => setSnack(null)}
            sx={{ width: "100%" }}
          >
            {snack?.msg}
          </Alert>
        </Snackbar>
      </StyledBox>
    </ThemeProvider>
  );
}
