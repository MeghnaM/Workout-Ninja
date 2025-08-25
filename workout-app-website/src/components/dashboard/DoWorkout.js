import React, { useCallback, memo } from "react";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { FixedSizeList as List } from "react-window";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { DialogTitle, Typography } from "@mui/material";
import {
  StyledBox,
  StyledSectionHeading,
} from "../styles/StyledComponentsLibrary";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../styles/StyledComponentsLibrary";
import { flexDirection } from "@mui/system";

// interface ToastProps {
//   message: string;
//   type?: "success" | "error" | "warning" | "info";
//   onClose: () => void;
// }

function DoWorkout(props) {
  const {
    ongoingWorkout,
    setOngoingWorkout,
    saveWorkoutInDB,
    setShowOngoingWorkout,
    setDoWorkoutModal,
  } = props;

  const [toast, setToast] = useState("");
  console.log("=== DOWORKOUT DEBUG ===");
  console.log("Full ongoingWorkout:", JSON.stringify(ongoingWorkout, null, 2));
  console.log("exerciseData array:", ongoingWorkout.exerciseData);

  if (ongoingWorkout.exerciseData && ongoingWorkout.exerciseData.length > 0) {
    ongoingWorkout.exerciseData.forEach((ex, index) => {
      console.log(`Exercise ${index}:`, ex);
      console.log(`exerciseId type:`, typeof ex.exerciseId);
      console.log(`exerciseId value:`, ex.exerciseId);
    });
  }
  const exercisesAndData = ongoingWorkout.exerciseData.map((ex) => {
    return {
      id: ex.exerciseId._id,
      exerciseId: ex.exerciseId,
      exerciseName: ex.exerciseId.exercise,
      completed: ex.completed,
      sets: ex.sets,
    };
  });
  const [workoutExerciseData, setWorkoutExerciseData] =
    useState(exercisesAndData);
  const [workoutName, setWorkoutName] = useState(ongoingWorkout.workoutName);
  const [workoutDate, setWorkoutDate] = useState(
    ongoingWorkout.dateOfWorkout.slice(0, -14)
  );

  useEffect(() => {
    console.log(workoutExerciseData);
  }, [workoutExerciseData]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  // const Toast: React.FC<ToastProps> = ({ message, type = "info", onClose }) => {
  //   return <div className={`toast toast-${type}`}>{message}</div>;
  // };

  const Toast = ({ message, type = "info", onClose }) => {
    return <div className={`toast toast-${type}`}>{message}</div>;
  };

  // Create a new object with the updated workoutName, workoutDate
  // and the completed list of exercises along with sets, reps and weight
  // Save that object in the DB and set show workout to be false
  const onCompleteWorkout = (e) => {
    e.preventDefault();
    console.log("Complete workout was clicked");

    // Check form validity
    if (formIsValid) {
      // Create a new workout object with the exercises and data,
      // as well as the new workout name and date
      const completedWorkout = {
        ...ongoingWorkout,
        dateOfWorkout: workoutDate,
        exerciseData: workoutExerciseData,
        status: "Completed",
      };

      // Call saveWorkoutInDB with the completed workout
      setOngoingWorkout(completedWorkout);
      saveWorkoutInDB(completedWorkout, completedWorkout._id);
    } else {
      showToast(
        "Please make sure the workout has a name and a date, and that every completed exercise has the sets, reps and weight fields filled out."
      );
    }
  };

  const updateExerciseWeights = useCallback(
    (exerciseIndex, setIndex, field, value) => {
      setWorkoutExerciseData((prevData) => {
        const newData = [...prevData];
        newData[exerciseIndex] = {
          ...newData[exerciseIndex],
          sets: newData[exerciseIndex].sets.map((set, index) =>
            index === setIndex ? { ...set, [field]: value } : set
          ),
        };
        return newData;
      });
    },
    []
  );

  const updateExerciseCompleted = useCallback((exerciseIndex, value) => {
    setWorkoutExerciseData((prevData) => {
      const newData = [...prevData];
      newData[exerciseIndex] = {
        ...newData[exerciseIndex],
        completed: value,
      };
      return newData;
    });
  }, []);

  const onClose = (e) => {
    e.preventDefault();
    setDoWorkoutModal(false);
    console.log("Close without saving");
    // setCloseAlert(true);
  };

  // Handles clicks on buttons within the close dialog
  const closeDialog = (choice) => {
    console.log(choice);
    if (choice === "Yes") {
      // Set show ongoing workout to false
      // Don't save workout to the DB
      setShowOngoingWorkout(false);
    }
    // If choice is No, then we don't need to do anything
    // and simply close the alert
    // setCloseAlert(false);
  };

  const displayExercise = useCallback(
    (props) => {
      const { index } = props;
      // sets = number of fields, each field = reps (non-editable), weight (editable)
      return (
        <ListItem key={index} component="div" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={workoutExerciseData[index].completed}
                onChange={(e) =>
                  updateExerciseCompleted(
                    index,
                    !workoutExerciseData[index].completed
                  )
                }
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText
              sx={{ color: theme.palette.primary.main, width: 100 }}
              primary={workoutExerciseData[index].exerciseName}
            />
            {/* <TextField
            label="Sets"
            defaultValue={exerciseData[index].sets}
            sx={{ maxWidth: 200 }}
            onChange={(e) =>
              updateExerciseData(exerciseData[index].id, "sets", e.target.value)
            }
          /> */}
            {/* <TextField
            label="Reps"
            defaultValue={exerciseData[index].reps}
            sx={{ maxWidth: 200 }}
            onChange={(e) =>
              updateExerciseData(exerciseData[index].id, "reps", e.target.value)
            }
          /> */}
            {(workoutExerciseData[index]?.sets || []).map((set, setIndex) => (
              <div
                key={setIndex}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Typography>{set.reps}</Typography>
                <TextField
                  label="Weight"
                  value={set.weight || ""}
                  sx={{ maxWidth: 65 }}
                  onChange={(e) =>
                    updateExerciseWeights(
                      index,
                      setIndex,
                      "weight",
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
          </ListItemButton>
        </ListItem>
      );
    },
    [
      workoutExerciseData,
      updateExerciseCompleted,
      updateExerciseWeights,
      theme.palette.primary.main,
    ]
  );

  const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
  const formIsValid = () => {
    let valid = false;
    // Form is valid if workout has a name and the date is in the correct format
    if (workoutName.length > 0 && regex.test(workoutDate)) {
      // And if for every checked off exercise, sets, reps and weight is populated
      workoutExerciseData.map((exercise) => {
        if (
          exercise.completed &&
          exercise.sets.length > 0 &&
          exercise.reps.length > 0 &&
          exercise.weight.length > 0
        ) {
          valid = true;
        }
      });
    }
    return valid;
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledBox
        style={{
          // these styles are just for positioning the modal in the center of the page
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",

          height: 500,
        }}
      >
        <StyledSectionHeading variant="h5">{workoutName}</StyledSectionHeading>
        <form onSubmit={onCompleteWorkout}>
          <div className="workoutDisplayRow">
            {/* <TextField
              required
              id="outlined-required"
              label="Workout Name"
              error={workoutName.length === 0}
              helperText={
                workoutName.length === 0 ? "Field cannot be empty" : ""
              }
              defaultValue={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
            /> */}

            <TextField
              required
              id="outlined-required"
              label="Workout Date"
              // error={!regex.test(workoutDate)}
              // helperText={
              //   !regex.test(workoutDate) ? "Date format - YYYY-MM-DD" : ""
              // }
              placeholder="YYYY-MM-DD"
              defaultValue={workoutDate}
              onChange={(e) => setWorkoutDate(e.target.value)}
            />
          </div>

          <div style={{ height: 300, overflow: "auto" }}>
            {workoutExerciseData.map((exercise, index) =>
              displayExercise({ index, key: index, style: {} })
            )}
          </div>

          <div className="workoutDisplayRow">
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
            <Button type="submit" variant="contained">
              Complete Workout
            </Button>
          </div>
        </form>
      </StyledBox>
    </ThemeProvider>
  );
}

export default DoWorkout;
