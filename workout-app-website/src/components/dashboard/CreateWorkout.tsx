import React, { useState, useEffect, useCallback } from "react";
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

  const setsOrRepsMissing = (): Boolean => {
    if (selectedExercises.size !== Object.keys(exerciseData).length) {
      return true;
    }
    for (const index of Array.from(selectedExercises)) {
      const data = exerciseData[index];

      // If no data exists, or sets/reps are missing/zero
      if (
        !data ||
        !data.sets ||
        !data.reps ||
        data.sets <= 0 ||
        data.reps <= 0
      ) {
        console.log(`Missing data for selected exercise ${index}:`, data);
        return true;
      }
    }
    // for (const index in Object.keys(exerciseData)) {
    //   if (exerciseData[index].sets === 0 || exerciseData[index].reps === 0) {
    //     return false;
    //   }
    // }
    return false;
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
    } else if (setsOrRepsMissing()) {
      showToast("Please make sure all selected exercises have sets and reps.");
    } else {
      console.log("Workout can be added to db.");
      const exerciseIds = Array.from(selectedExercises).map(
        (index) => exerciseList[index]._id
      );
      const exerciseDataForBackend = Array.from(selectedExercises).map(
        (index) => {
          console.log(
            "Here is the exercise information - ",
            exerciseList[index].ex._id
          );
          const exId = exerciseList[index].ex._id;
          const numberOfSets = exerciseData[index]?.sets || 3;
          const repsPerSet = exerciseData[index]?.reps || 10;
          const sets = Array.from({ length: numberOfSets }).map(() => ({
            reps: repsPerSet,
            weight: 0,
          }));
          return { exerciseId: exId, sets: sets };
        }
      );
      console.log(
        "Here is the exercise data on the frontend - ",
        exerciseDataForBackend
      );
      onCreateNewWorkout(e, workoutName, exerciseIds, exerciseDataForBackend);
    }
  };

  const handleSetsChange = (index, value) => {
    setExerciseData({
      ...exerciseData,
      [index]: {
        sets: value,
        reps: exerciseData[index]?.reps || 0,
      },
    });
  };

  const handleRepsChange = (index, value) => {
    setExerciseData({
      ...exerciseData,
      [index]: {
        reps: value,
        sets: exerciseData[index]?.sets || 0,
      },
    });
  };

  // const exerciseRow = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  //   const { index, style } = props;

  //   const handleExerciseClick = () => {
  //     setSelectedExercises((exercises) => {
  //       const selected = new Set(exercises);
  //       if (selectedExercises.has(index)) {
  //         selected.delete(index);
  //       } else {
  //         selected.add(index);
  //       }
  //       return selected;
  //     });
  //   };

  //   return (
  //     <div ref={ref} style={style}>
  //       <ListItem key={index} component="div" disablePadding>
  //         <ListItemButton onClick={handleExerciseClick}>
  //           <ListItemIcon sx={{ color: theme.palette.primary.main }}>
  //             {selectedExercises.has(index) ? (
  //               <RadioButtonCheckedIcon />
  //             ) : (
  //               <RadioButtonUncheckedIcon />
  //             )}
  //           </ListItemIcon>
  //           <StyledListItemText
  //             sx={{ color: theme.palette.primary.main }}
  //             primary={exerciseList[index].ex.exercise}
  //           />
  //         </ListItemButton>
  //         <TextField
  //           id="sets"
  //           label="sets"
  //           variant="filled"
  //           value={exerciseData[index]?.sets}
  //           onChange={(e) => handleSetsChange(index, e.target.value)}
  //         />
  //         <TextField
  //           id="reps"
  //           label="reps"
  //           variant="filled"
  //           value={exerciseData[index]?.reps}
  //           onChange={(e) => handleRepsChange(index, e.target.value)}
  //         />
  //       </ListItem>
  //     </div>
  //   );
  // });

  return (
    <ThemeProvider theme={theme}>
      <StyledBox>
        <TextField
          id="workout-name"
          label="Workout Name"
          variant="outlined"
          onChange={(e) => setWorkoutName(e.target.value)}
        />

        <div
          style={{
            height: 200,
            width: 400,
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          {exerciseList.map((exercise, index) => {
            return (
              <div key={exercise._id || index}>
                <ListItem component="div" disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setSelectedExercises((exercises) => {
                        const selected = new Set(exercises);
                        if (selectedExercises.has(index)) {
                          selected.delete(index);
                        } else {
                          selected.add(index);
                        }
                        return selected;
                      });
                    }}
                  >
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
                    label="sets"
                    variant="filled"
                    value={exerciseData[index]?.sets || ""}
                    onChange={(e) => handleSetsChange(index, e.target.value)}
                  />
                  <TextField
                    label="reps"
                    variant="filled"
                    value={exerciseData[index]?.reps || ""}
                    onChange={(e) => handleRepsChange(index, e.target.value)}
                  />
                </ListItem>
              </div>
            );
          })}
        </div>

        {/* <List
          height={300}
          width={400}
          itemSize={100}
          itemCount={exerciseList.length}
          overscanCount={5}
        >
          {exerciseRow}
        </List> */}
        <Button onClick={(e) => onCreateWorkoutClick(e)}>Create</Button>
        <Button onClick={onCancelClick}>Cancel</Button>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </StyledBox>
    </ThemeProvider>
  );
}
