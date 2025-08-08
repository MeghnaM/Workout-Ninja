import React, { useState, useEffect } from "react";
import {
  StyledBox,
  StyledSectionSubheading,
  StyledListItemText,
} from "../styles/StyledComponentsLibrary";
import { Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../styles/StyledComponentsLibrary";
import { FixedSizeList as List } from "react-window";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TextField from "@mui/material/TextField";
import { create } from "domain";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

interface ExerciseData {
  [index: number]: {
    sets: number;
    reps: number;
  };
}

// Modal that contains -
// Workout name input field
// List of exercises to choose from
// Save workout button
export default function CreateWorkout(props) {
  const { setAddNewWorkoutModal, exerciseList, onCreateNewWorkout } = props;
  const [selectedExercises, setSelectedExercises] = useState<Set<number>>(
    new Set()
  );
  const [exerciseData, setExerciseData] = useState<ExerciseData>({});
  const [workoutName, setWorkoutName] = useState<string>("");
  const [toast, setToast] = useState<string | null>(null);

  const onCancelClick = () => {
    setAddNewWorkoutModal(false);
  };

  const showToast = (message: string, type?: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const Toast: React.FC<ToastProps> = ({ message, type = "info", onClose }) => {
    return <div className={`toast toast-${type}`}>{message}</div>;
  };

  // Verify that name is not empty
  // Send a call to the DB with the selected exercises + user
  // How is New Workout setting "selected" on exercises?
  // Because I think dashboard is making the call to the DB
  const onCreateWorkoutClick = (e) => {
    if (workoutName.length === 0) {
      showToast("Workout name is required.", "error");
    } else if (selectedExercises.size === 0) {
      showToast("Please select at least one exercise.", "error");
    } else {
      console.log("Workout can be added to db.");
      const exerciseIds = Array.from(selectedExercises).map(
        (index) => exerciseList[index]._id
      );
      const exerciseData = Array.from(selectedExercises).map((index) => {
        const exId = exerciseList[index]._id;
        // sets = list of length reps, where each element in the list is an object
        // reps = reps, weight = 0
        // what's the data that's tracking in the frontend? just sets and reps, just sets and reps
        // for that index. ok and what do we send to the backend? a list of id, sets and reps
        // so a list of ids, sets is a list of length reps where each element is 2 objects - reps and weight
        const sets = Array.from(exerciseData).map((ex) => {
          return { reps: ex[index].reps, weight: 0 };
        });
        return { exerciseId: exId, sets: sets };
      });
      onCreateNewWorkout(e, workoutName, exerciseIds, exerciseData);
    }
  };

  const exerciseRow = React.forwardRef<HTMLDivElement, any>((props, ref) => {
    const { index, style } = props;

    const handleSetsChange = (e, index) => {
      setExerciseData({
        ...exerciseData,
        [index]: {
          sets: e.target.value,
          reps: exerciseData[index]?.reps || 0,
        },
      });
    };

    const handleRepsChange = (e, index) => {
      setExerciseData({
        ...exerciseData,
        [index]: {
          reps: e.target.value,
          sets: exerciseData[index]?.sets || 0,
        },
      });
    };

    const handleExerciseClick = () => {
      setSelectedExercises((exercises) => {
        const selected = new Set(exercises);
        if (selectedExercises.has(index)) {
          selected.delete(index);
        } else {
          selected.add(index);
        }
        return selected;
      });
    };

    return (
      <div ref={ref} style={style}>
        <ListItem key={index} component="div" disablePadding>
          <ListItemButton onClick={handleExerciseClick}>
            <ListItemIcon sx={{ color: theme.palette.primary.main }}>
              {selectedExercises.has(index) ? (
                <RadioButtonCheckedIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )}
            </ListItemIcon>
            <StyledListItemText
              sx={{ color: theme.palette.primary.main }}
              primary={exerciseList[index].ex.exercise}
            />
          </ListItemButton>
          <TextField
            id="sets"
            label="sets"
            variant="filled"
            value={exerciseData[index]?.sets}
            onChange={handleSetsChange}
          />
          <TextField
            id="reps"
            label="reps"
            variant="filled"
            value={exerciseData[index]?.reps}
            onChange={handleRepsChange}
          />
        </ListItem>
      </div>
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <StyledBox>
        <TextField
          id="workout-name"
          label="Workout Name"
          variant="outlined"
          onChange={(e) => setWorkoutName(e.target.value)}
        />
        <List
          height={200}
          width={400}
          itemSize={46}
          itemCount={exerciseList.length}
          overscanCount={5}
        >
          {exerciseRow}
        </List>
        <Button onClick={(e) => onCreateWorkoutClick(e)}>Create</Button>
        <Button onClick={onCancelClick}>Cancel</Button>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </StyledBox>
    </ThemeProvider>
  );
}
