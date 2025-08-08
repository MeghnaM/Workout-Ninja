import { useState, useEffect, forwardRef, useRef } from "react";
import Button from "@mui/material/Button";
import { FixedSizeList as List } from "react-window";
import TextField from "@mui/material/TextField";
import ExerciseInList from "./ExerciseInList";
// import NewWorkout from "./NewWorkout";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import DoWorkout from "./DoWorkout";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { DialogTitle, Modal } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  StyledBox,
  StyledListItemText,
  StyledSectionSubheading,
  StyledSectionHeading,
  theme,
} from "../styles/StyledComponentsLibrary";
import { ThemeProvider } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import LineGraph from "./LineGraph";
import backgroundImage from "../../assets/gradient.jpg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreateWorkout from "./CreateWorkout";

interface WorkoutDialogProps {
  index: number;
  style: React.CSSProperties;
  [key: string]: any; // For otherProps
}

interface WorkoutState {
  exercises?: any[]; // or your specific exercise type
  workoutName?: string;
  status?: string;
  // add other properties as needed
}

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

export default function Dashboard() {
  const [newExercise, setNewExercise] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [workoutObject, setWorkoutObject] = useState({});
  const [showWorkout, setShowWorkout] = useState(false);
  const [workoutList, setWorkoutList] = useState([]);
  const [ongoingWorkout, setOngoingWorkout] = useState([]);
  const [showOngoingWorkout, setShowOngoingWorkout] = useState(false);
  const [addExerciseDropdown, setAddExerciseDropdown] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertClosed, setAlertClosed] = useState(true);
  const [showCopyWorkoutDialog, setShowCopyWorkoutDialog] = useState(false);
  const [completedWorkout, setCompletedWorkout] = useState<WorkoutState>({});
  const [toast, setToast] = useState<string | null>(null);
  const [createNewWorkoutModal, setCreateNewWorkoutModal] =
    useState<boolean>(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  const Toast: React.FC<ToastProps> = ({ message, type = "info", onClose }) => {
    return <div className={`toast toast-${type}`}>{message}</div>;
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  // development api url format = http://localhost:4000/get-workouts
  useEffect(() => {
    // console.log("Use effect is getting called");
    // console.log("apiUrl", apiUrl);
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

    // console.log(`Workout List: ${workoutList}`);
    getExercises();
    getWorkouts();
  }, [newExercise, workoutObject, alertClosed]);

  // const getExerciseById = async (id) => {
  //   let result = await fetch(`${apiUrl}/get-exercise-by-id`)
  //     .then((response) => response.json())
  //     .then((data) =>
  //       setExercisesInOngoingWorkout({
  //         ...exercisesInOngoingWorkout,
  //         data,
  //       })
  //     )
  //     .catch((error) => console.error(error));
  // };

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
    const resultText: string = await result.text();
    console.log(resultText);
    if (result) {
      showToast("Success!");
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

  const onCreateNewWorkout = async (
    e,
    newWorkoutName,
    newWorkoutExercises,
    newWorkoutExerciseData
  ) => {
    e.preventDefault();
    console.log("Create new workout was clicked!");

    try {
      const newWorkout = {
        workoutName: newWorkoutName,
        status: "Not Started",
        exercises: newWorkoutExercises,
        exerciseData: newWorkoutExerciseData,
        dateCreated: today(),
        dateOfWorkout: tomorrow(),
      };

      const result = await fetch(`${apiUrl}/create-new-workout`, {
        method: "POST",
        body: JSON.stringify(newWorkout),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const contentType = result.headers.get("content-type");
      let responseData;
      if (contentType && contentType.includes("application/json")) {
        responseData = await result.json();
      } else {
        responseData = await result.text();
      }

      if (!result.ok) {
        const errorMessage =
          responseData.error ||
          responseData.message ||
          responseData ||
          "Unknown error";
        throw new Error(`${errorMessage}`);
      }

      // Success
      console.log("Workout created: ", responseData);
      setWorkoutObject(responseData);
      // Close the modal
      setCreateNewWorkoutModal(false);
      // Show success toast
    } catch (error) {
      console.error("Create workout error:", error);
      showToast(`Error: ${error.message}`);
    } finally {
      // TODO close the create workout modal
    }

    // setShowWorkout(!showWorkout);
  };

  const onAddNewWorkout = async (e) => {
    e.preventDefault();
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
      const resultText: string = await result.text();
      if (resultText !== "Something went wrong") {
        const resultObject = JSON.parse(resultText);
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
    const resultText: string = await result.text();
    if (resultText !== "Something went wrong") {
      const resultObject = JSON.parse(resultText);
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
    const resultText: string = await result.text();
    console.log("Saved workout from DB -");
    console.log(resultText);
    if (resultText !== "Something went wrong") {
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
    const resultText = await result.text();
    console.log(resultText);
    if (resultText !== "Delete request failed") {
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
    console.log("Button to do workout was clicked");
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
      // onCreateNewWorkout(e);
    }
    setShowCopyWorkoutDialog(false);
  };

  const WorkoutDialogInExerciseListForwardRef = forwardRef<
    HTMLButtonElement,
    WorkoutDialogProps
  >((props, ref) => {
    const { index, style, ...otherProps } = props;
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton
          component="button"
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

  const WorkoutListForwardRef = forwardRef<
    HTMLButtonElement,
    WorkoutDialogProps
  >((props, ref) => {
    const { index, style, ...otherProps } = props;
    return (
      <ThemeProvider theme={theme}>
        <ListItem style={style} key={index} component="div" disablePadding>
          <ListItemButton
            component="button"
            ref={ref}
            onClick={() => startWorkout(index)}
            {...otherProps}
          >
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={workoutList[index].status === "Completed"}
              style={{ fontSize: "small" }}
              color="secondary"
            />
            {/* {workoutList[index].status == "Completed" && } */}
            <StyledListItemText primary={workoutList[index].workoutName} />
            <StyledListItemText
              primary={workoutList[index].dateOfWorkout.slice(0, -14)}
            />
          </ListItemButton>
          {/* <IconButton
            sx={{ color: theme.palette.secondary.main, paddingRight: 3 }}
            onClick={() => deleteWorkoutInDB(workoutList[index]._id)}
          >
            <CloseIcon />
          </IconButton> */}

          <Dialog open={showCopyWorkoutDialog}>
            <DialogTitle>
              {"Workout is complete. Create a copy of this workout?"}
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={(e) => {
                  const buttonText = (e.currentTarget as HTMLButtonElement)
                    .textContent;
                  handleCopyWorkoutDialogAction(e, buttonText);
                }}
                autoFocus
              >
                Yes
              </Button>
              <Button
                onClick={(e) => {
                  const buttonText = (e.currentTarget as HTMLButtonElement)
                    .textContent;
                  handleCopyWorkoutDialogAction(e, buttonText);
                }}
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
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="grid grid-flow-col gap-4">
        <StyledBox>
          <div className="headingRow">
            <StyledSectionHeading variant="h4">Exercises</StyledSectionHeading>
            {/* <Dropdown>
              <StyledMenuButton onClick={onAddExerciseButtonClick}>
                <AddIcon />
              </StyledMenuButton>
              <Menu slots={{ listbox: Listbox }}>
                <StyledMenuItem onClick={onAddExerciseToNewWorkout}>
                  Add Exercises to New Workout
                </StyledMenuItem>
                <StyledMenuItem onClick={onAddExerciseToExistingWorkout}>
                  Add Exercises to Existing Workout
                </StyledMenuItem>
              </Menu>
            </Dropdown> */}
          </div>
          <form action="">
            <div className="pb-8">
              <TextField
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
              </Button>
              {toast && (
                <Toast message={toast} onClose={() => setToast(null)} />
              )}
            </div>
          </form>
          {/* <Dialog open={dialogOpen}>
            <DialogActions>
              <StyledBox>
                <DialogTitle>
                  <StyledSectionSubheading variant="h5">
                    Workouts
                  </StyledSectionSubheading>
                  <IconButton
                    aria-label="close"
                    onClick={handleDialogClose}
                    sx={(theme) => ({
                      position: "absolute",
                      right: 8,
                      top: 8,
                      color: theme.palette.grey[500],
                    })}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                <List
                  height={300}
                  width={400}
                  itemSize={46}
                  itemCount={workoutList.length}
                  overscanCount={5}
                >
                  {renderWorkoutInExerciseListDialog}
                </List>
              </StyledBox>
            </DialogActions>
          </Dialog> */}
          <List
            height={200}
            width={380}
            itemSize={46}
            itemCount={exerciseList.length}
            overscanCount={5}
          >
            {renderExercise}
          </List>
        </StyledBox>
        <div>
          <StyledBox>
            <div className="headingRow">
              <StyledSectionHeading variant="h4">Workouts</StyledSectionHeading>
              <Button
                type="submit"
                variant="contained"
                className="bg-indigo-500"
                onClick={() => setCreateNewWorkoutModal(true)}
              >
                Add New
              </Button>
            </div>
            <div className="grid grid-flow-col gap-4">
              <StyledSectionSubheading>Status</StyledSectionSubheading>
              <StyledSectionSubheading>Name</StyledSectionSubheading>
              <StyledSectionSubheading>Date</StyledSectionSubheading>
              {/* <StyledSectionSubheading>Delete</StyledSectionSubheading> */}
            </div>
            <Modal open={createNewWorkoutModal}>
              <CreateWorkout
                setAddNewWorkoutModal={setCreateNewWorkoutModal}
                exerciseList={exerciseList}
                onCreateNewWorkout={onCreateNewWorkout}
              />
            </Modal>
            <List
              height={300}
              width={400}
              itemSize={46}
              itemCount={workoutList.length}
              workoutListForwardRef={WorkoutListForwardRef}
              overscanCount={5}
            >
              {renderWorkout}
            </List>
          </StyledBox>
        </div>
      </div>
      <LineGraph width={800} height={500} />
      {/* {workoutObject && showWorkout && (
        <NewWorkout
          workoutObj={workoutObject}
          saveWorkoutInDB={saveWorkoutInDB}
          deleteWorkoutInDB={deleteWorkoutInDB}
        />
      )} */}
      {/* {ongoingWorkout && showOngoingWorkout && (
        <DoWorkout
          ongoingWorkout={ongoingWorkout}
          setOngoingWorkout={setOngoingWorkout}
          saveWorkoutInDB={saveWorkoutInDB}
          setShowOngoingWorkout={setShowOngoingWorkout}
        />
      )} */}
    </div>
  );
}
