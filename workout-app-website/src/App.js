import "./App.css";
import { useState, useEffect, forwardRef, useRef } from "react";
import Button from "@mui/material/Button";
import { FixedSizeList as List } from "react-window";
import TextField from "@mui/material/TextField";
import ExerciseInList from "./ExerciseInList";
import NewWorkout from "./NewWorkout";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DoWorkout from "./DoWorkout";
import AddIcon from "@mui/icons-material/Add";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { styled } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { DialogTitle } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  StyledBox,
  StyledMenuItem,
  StyledMenuButton,
  StyledListItemText,
  StyledSectionSubheading,
  StyledWebsiteHeading,
  StyledWebsiteSubheading,
  StyledSectionHeading,
  theme,
  Listbox,
} from "./StyledComponentsLibrary";
import { ThemeProvider } from "@mui/material/styles";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Checkbox from "@mui/material/Checkbox";
import LineGraph from "./LineGraph.tsx";

import backgroundImage from "./assets/nature-pink-green.jpg";
import AuthPage from "./AuthPage.tsx";

function App() {
  const [newExercise, setNewExercise] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [workoutObject, setWorkoutObject] = useState({});
  const [showWorkout, setShowWorkout] = useState(false);
  const [workoutList, setWorkoutList] = useState([]);
  const [ongoingWorkout, setOngoingWorkout] = useState([]);
  const [showOngoingWorkout, setShowOngoingWorkout] = useState(false);
  const [exercisesInOngoingWorkout, setExercisesInOngoingWorkout] = useState(
    []
  );
  const [addExerciseDropdown, setAddExerciseDropdown] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertClosed, setAlertClosed] = useState(true);
  const [showCopyWorkoutDialog, setShowCopyWorkoutDialog] = useState(false);
  const [completedWorkout, setCompletedWorkout] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;

  // development api url format = http://localhost:4000/get-workouts
  useEffect(() => {
    console.log("Use effect is getting called");
    console.log("apiUrl", apiUrl);
    async function getExercises() {
      await fetch(`${apiUrl}/get-exercises`)
        .then((response) => response.json())
        .then((data) => {
          // Map over the data that comes back from the db
          // Create an exercises list
          // If the exercise id is not already in the exerciseList,
          // then create a new exercise and set its selected value to be false
          // then add that that new exercise to the exercises list
          // then set the state variable to the exercises list
          const exercises = data.map((exercise) => {
            if (!exerciseList.includes(exercise)) {
              const newExercise = {
                ex: exercise,
                selected: false,
              };
              return newExercise;
            }
            return exercise;
          });
          setExerciseList(exercises);
        })
        .catch((error) => console.error(error));
    }

    async function getWorkouts() {
      await fetch(`${apiUrl}/get-workouts`)
        .then((response) => response.json())
        .then((data) => {
          setWorkoutList(data);
        })
        .catch((error) => console.error(error));
    }

    console.log(workoutList);
    getExercises();
    getWorkouts();
  }, [newExercise, workoutObject, alertClosed]);

  const getExerciseById = async (id) => {
    let result = await fetch(`${apiUrl}/get-exercise-by-id`)
      .then((response) => response.json())
      .then((data) =>
        setExercisesInOngoingWorkout({
          ...exercisesInOngoingWorkout,
          data,
        })
      )
      .catch((error) => console.error(error));
  };

  const renderExercise = (props) => {
    const { index, style } = props;
    return (
      <ExerciseInList
        index={index}
        style={style}
        exerciseList={exerciseList}
        renderWorkout={renderWorkout}
        workoutCount={workoutList.length}
        workoutList={workoutList}
        setExerciseList={setExerciseList}
      />
    );
  };

  // (`${apiUrl}/register`)
  const onAddNewExercise = async (e) => {
    e.preventDefault();
    let result = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: "post",
      body: JSON.stringify({ exercise: newExercise }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.text();
    console.log(result);
    if (result) {
      alert("Data saved succesfully!");
      setNewExercise("");
    }
  };

  const today = () => {
    return new Date().toDateString();
  };
  const tomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toDateString();
  };

  const onCreateNewWorkout = async (e) => {
    e.preventDefault();
    console.log("create new workout was clicked");
    console.log(completedWorkout);
    const clearedWorkout = {
      workoutName: "New Workout",
      status: "Not Started",
      exercises: completedWorkout.exercises,
      dateCreated: today(),
      dateOfWorkout: tomorrow(),
    };

    let result = await fetch(`${apiUrl}/create-new-workout`, {
      method: "post",
      body: JSON.stringify({ ...clearedWorkout }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.text();
    if (result !== "Something went wrong") {
      const resultObject = JSON.parse(result);
      console.log(resultObject);
      setWorkoutObject(resultObject);
      setShowWorkout(!showWorkout);
      alert("Data saved succesfully!");
    }
  };

  // When button is clicked, I want to take the list of
  // exercises whose checkbox has been checked off
  // and send those to the db using the api call
  // and then set all the selected booleans to false
  const onAddExerciseToNewWorkout = async (e) => {
    e.preventDefault();
    // Map over the selected exercises and just keep the exercise itself
    // since that's the format that the db expects
    const selectedExercises = exerciseList.filter(
      (exercise) => exercise.selected
    );
    const exercises = selectedExercises.map((ex) => ex.ex);

    if (exercises.length === 0) {
      alert("Please select some exercises first.");
    } else {
      let result = await fetch(`${apiUrl}/create-new-workout`, {
        method: "post",
        body: JSON.stringify({
          workoutName: "New Workout",
          status: "Not Started",
          exercises: exercises,
          dateCreated: today(),
          dateOfWorkout: tomorrow(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.text();
      if (result !== "Something went wrong") {
        const resultObject = JSON.parse(result);
        console.log(resultObject);
        setWorkoutObject(resultObject);
        setShowWorkout(!showWorkout);
        alert("Data saved succesfully!");

        // Once the data has been saved in the db,
        // set all the exercises to have selected boolean as false
        const updatedExerciseList = exerciseList.map((exercise) => {
          if (exercise.selected) return { ...exercise, selected: false };
          return exercise;
        });
        setExerciseList(updatedExerciseList);
      }
    }
  };
  //else {
  //   alert("Please save existing workout before creating a new one.")
  // }
  //

  const onWorkoutNameClick = async (e, index) => {
    e.preventDefault();
    console.log("Add to existing workout was clicked");
    setDialogOpen(false);

    // Map over the selected exercises and just keep the exercise itself
    // since that's the format that the db expects
    const selectedExercises = exerciseList.filter(
      (exercise) => exercise.selected
    );
    const exercises = selectedExercises.map((ex) => ex.ex);

    const workout = workoutList[index];
    console.log(workout);
    // Create a new list of exercises that includes the exercises
    // that were already part of this workout and the new ones I want to add
    const updatedExerciseList = [...exercises, ...workout.exercises];
    console.log(updatedExerciseList);

    // Make api call to update existing workout
    let result = await fetch(`${apiUrl}/update-existing-workout`, {
      method: "put",
      body: JSON.stringify({
        id: workout._id,
        workout: {
          workoutName: workout.workoutName,
          status: workout.status,
          exercises: updatedExerciseList,
          dateCreated: workout.dateCreated,
          dateOfWorkout: workout.dateOfWorkout,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.text();
    if (result !== "Something went wrong") {
      const resultObject = JSON.parse(result);
      console.log(resultObject);
      alert("Data saved succesfully!");
      setAlertClosed(!alertClosed);

      // Once the data has been saved in the db,
      // set all the exercises to have selected boolean as false
      const updatedExerciseList = exerciseList.map((exercise) => {
        if (exercise.selected) return { ...exercise, selected: false };
        return exercise;
      });
      setExerciseList(updatedExerciseList);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const onAddExerciseToExistingWorkout = async (e) => {
    e.preventDefault();
    console.log("Add exercise to existing workout was clicked");
    // Map over the selected exercises and just keep the exercise itself
    // since that's the format that the db expects
    const selectedExercises = exerciseList.filter(
      (exercise) => exercise.selected
    );
    const exercises = selectedExercises.map((ex) => ex.ex);

    if (exercises.length === 0) {
      alert("Please select some exercises first.");
    } else {
      console.log("In the else block");
      // Display dialog with list of workout
      setDialogOpen(true);
    }
  };

  // Takes a workout and an id
  // Calls update workout function from api
  // If func call is successful then returns success
  // else return an error - for now can be generic error
  // just an alert saying something went wrong
  const saveWorkoutInDB = async (workout, id) => {
    console.log("Save workout in db was called");
    console.log(workout);
    let result = await fetch(`${apiUrl}/update-existing-workout`, {
      method: "put",
      body: JSON.stringify({
        id: id,
        workout: workout,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.text();
    console.log("Saved workout from DB -");
    console.log(result);
    if (result !== "Something went wrong") {
      alert("Workout saved!");
      setWorkoutObject({});
      setShowWorkout(false);
      if (ongoingWorkout) setShowOngoingWorkout(false);
    } else {
      alert("Something went wrong");
    }
  };

  const deleteWorkoutInDB = async (id) => {
    let result = await fetch(`${apiUrl}/delete-workout`, {
      method: "delete",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.text();
    console.log(result);
    if (result !== "Delete request failed") {
      alert("Workout deleted successfully!");
      setWorkoutObject({});
      setShowWorkout(false);
    } else {
      alert("Something went wrong");
    }
  };

  const onAddExerciseButtonClick = () => {
    console.log("Show add exercise dropdown");
    setAddExerciseDropdown(!addExerciseDropdown);
  };

  const startWorkout = (index) => {
    console.log("Button to start workout was clicked");
    // If a workout is already in progress, then don't open another one
    // if (!showOngoingWorkout) {
    //   alert("Please close or complete the current workout before starting another one.")
    // }
    // If the workout is not yet completed, then the user should be able to start it
    if (workoutList[index].status !== "Completed") {
      setShowOngoingWorkout(true);
      setOngoingWorkout(workoutList[index]);
    }
    // Otherwise, show a popup that offers the option to duplicate the workout
    // Which creates a new workout in the database, with the same exercises,
    // but a new date, no sets and reps and weight, and status = not started
    else if (workoutList[index].status === "Completed") {
      setCompletedWorkout(workoutList[index]);
      setShowCopyWorkoutDialog(true);
    }
  };

  const handleCopyWorkoutDialogAction = (e, option) => {
    if (option === "Yes") {
      console.log("yes was clicked");
      onCreateNewWorkout(e);
    }
    setShowCopyWorkoutDialog(false);
  };

  const WorkoutDialogInExerciseListForwardRef = forwardRef((props, ref) => {
    const { index, style, ...otherProps } = props;
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton
          ref={ref}
          onClick={(e) => onWorkoutNameClick(e, index)}
          {...otherProps}
        >
          <StyledListItemText
            primary={
              workoutList[index].workoutName +
              " " +
              workoutList[index].dateOfWorkout.slice(0, -14)
            }
          />
        </ListItemButton>
      </ListItem>
    );
  });

  const exDialogRef = useRef(null);

  const renderWorkoutInExerciseListDialog = (props) => {
    const { index, style } = props;
    return (
      <WorkoutDialogInExerciseListForwardRef
        index={index}
        style={style}
        ref={exDialogRef}
      />
    );
  };

  const WorkoutListForwardRef = forwardRef((props, ref) => {
    const { index, style, ...otherProps } = props;
    return (
      <ThemeProvider theme={theme}>
        <ListItem style={style} key={index} component="div" disablePadding>
          <ListItemButton
            ref={ref}
            onClick={() => startWorkout(index)}
            {...otherProps}
          >
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
              checked={workoutList[index].status === "Completed"}
              fontSize="small"
              color="secondary"
            />
            <StyledListItemText primary={workoutList[index].workoutName} />
            <StyledListItemText
              primary={workoutList[index].dateOfWorkout.slice(0, -14)}
            />
          </ListItemButton>
          <IconButton
            sx={{ color: theme.palette.secondary.main, paddingRight: 3 }}
            onClick={() => deleteWorkoutInDB(workoutList[index]._id)}
          >
            <CloseIcon />
          </IconButton>

          <Dialog open={showCopyWorkoutDialog}>
            <DialogTitle>
              {"Workout is complete. Create a copy of this workout?"}
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={(e) =>
                  handleCopyWorkoutDialogAction(e, e.target.textContent)
                }
                autoFocus
              >
                Yes
              </Button>
              <Button
                onClick={(e) =>
                  handleCopyWorkoutDialogAction(e, e.target.textContent)
                }
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
        </ListItem>
      </ThemeProvider>
    );
  });

  const workoutsDialogRef = useRef(null);
  const renderWorkout = (props) => {
    const { index, style } = props;
    return (
      <WorkoutListForwardRef
        index={index}
        style={style}
        ref={workoutsDialogRef}
      />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <header className="App-header">
          <AuthPage />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;

// Subheading
/* <StyledWebsiteSubheading color="secondary">
              Progressive overload is the name of the game when it comes to building a leaner, healthier body. 
            </StyledWebsiteSubheading>
            <StyledWebsiteSubheading color="secondary">
              Start with where you are and slowly increase strength, range of motion, endurance and overall fitness. 
            </StyledWebsiteSubheading>
            <StyledWebsiteSubheading color="secondary">
              The best way to measure progress is to be able to track it, and that's where Workout Ninja comes in.
            </StyledWebsiteSubheading>
            <StyledWebsiteSubheading color="secondary">
              You can maintain a list of your favorite exercises, create new workouts, and track your progress over time.
            </StyledWebsiteSubheading> */
