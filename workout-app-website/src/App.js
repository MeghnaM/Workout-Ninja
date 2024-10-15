import './App.css';
import { useState, useEffect, forwardRef, useRef } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { FixedSizeList as List } from 'react-window';
import TextField from '@mui/material/TextField';
import ExerciseInList from './ExerciseInList';
import NewWorkout from './NewWorkout';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DoWorkout from './DoWorkout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function App() {

  const [newExercise, setNewExercise] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [workoutObject, setWorkoutObject] = useState({});
  const [showWorkout, setShowWorkout] = useState(false);
  const [workoutList, setWorkoutList] = useState([]);
  const [ongoingWorkout, setOngoingWorkout] = useState([]);
  const [showOngoingWorkout, setShowOngoingWorkout] = useState(false);
  const [exercisesInOngoingWorkout, setExercisesInOngoingWorkout] = useState([]);
  const [addExerciseDropdown, setAddExerciseDropdown] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertClosed, setAlertClosed] = useState(true);
  const [showCopyWorkoutDialog, setShowCopyWorkoutDialog] = useState(false);
  const [completedWorkout, setCompletedWorkout] = useState([]);

  useEffect(() => {
    console.log("Use effect is getting called")
    async function getExercises() {
      await fetch('http://localhost:4000/get-exercises')
        .then(response => response.json())
        .then(data => { 
          // Map over the data that comes back from the db
          // Create an exercises list
          // If the exercise id is not already in the exerciseList,
          // then create a new exercise and set its selected value to be false
          // then add that that new exercise to the exercises list
          // then set the state variable to the exercises list
          const exercises = data.map(exercise => {
            if (!exerciseList.includes(exercise)) {
              const newExercise = {
                ex: exercise,
                selected: false
              }
              return newExercise
            }
            return exercise
          })
          setExerciseList(exercises) 
        })
        .catch(error => console.error(error));
    }

    async function getWorkouts() {
      await fetch('http://localhost:4000/get-workouts')
      .then(response => response.json())
      .then(data => { setWorkoutList(data) })
      .catch(error => console.error(error));
    }
 
    console.log(workoutList)
    getExercises();
    getWorkouts();
  }, [newExercise, workoutObject, alertClosed])

  const getExerciseById = async (id) => {
    let result = await fetch('http://localhost:4000/get-exercise-by-id')
    .then(response => response.json())
    .then(data => setExercisesInOngoingWorkout({
      ...exercisesInOngoingWorkout,
      data
    }))
    .catch(error => console.error(error));
  }

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
  }

  const onAddNewExercise = async (e) => {
    e.preventDefault();
    let result = await fetch(
      'http://localhost:4000/register', {
      method: "post",
      body: JSON.stringify({ exercise: newExercise }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    result = await result.text();
    console.log(result);
    if (result) {
      alert("Data saved succesfully");
      setNewExercise("");
    }
  }

  const today = () => {
    return new Date().toDateString()
  }
  const tomorrow = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toDateString()
  }

  const onCreateNewWorkout = async (e) => {
    e.preventDefault();
    console.log("create new workout was clicked")
    console.log(completedWorkout)
    const clearedWorkout = {
      workoutName: 'New Workout',
      status: 'Not Started',
      exercises: completedWorkout.exercises,
      dateCreated: today(),
      dateOfWorkout: tomorrow()
    }

    let result = await fetch(
      'http://localhost:4000/create-new-workout', {
      method: "post",
      body: JSON.stringify({...clearedWorkout}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  result = await result.text();
  if (result !== "Something went wrong") {
    const resultObject = JSON.parse(result)
    console.log(resultObject)
    setWorkoutObject(resultObject)
    setShowWorkout(!showWorkout)
    alert("Data saved succesfully");
  }
}

  // When button is clicked, I want to take the list of 
  // exercises whose checkbox has been checked off
  // and send those to the db using the api call
  // and then set all the selected booleans to false
  const onAddExerciseToNewWorkout = async (e) => {
    e.preventDefault();
    // Map over the selected exercises and just keep the exercise itself
    // since that's the format that the db expects
    const selectedExercises = exerciseList.filter(exercise => exercise.selected)
    const exercises = selectedExercises.map(ex => ex.ex)
    
    if (exercises.length === 0) {
      alert("Please select some exercises first.")
    } else {
        let result = await fetch(
          'http://localhost:4000/create-new-workout', {
          method: "post",
          body: JSON.stringify({
            workoutName: 'New Workout',
            status: 'Not Started',
            exercises: exercises,
            dateCreated: today(),
            dateOfWorkout: tomorrow()
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      result = await result.text();
      if (result !== "Something went wrong") {
        const resultObject = JSON.parse(result)
        console.log(resultObject)
        setWorkoutObject(resultObject)
        setShowWorkout(!showWorkout)
        alert("Data saved succesfully");
        
        // Once the data has been saved in the db,
        // set all the exercises to have selected boolean as false
        const updatedExerciseList = exerciseList.map(exercise => {
          if (exercise.selected) return {...exercise, selected: false}
          return exercise
        })
        setExerciseList(updatedExerciseList)
      }
    }
  }
  //else {
  //   alert("Please save existing workout before creating a new one.")
  // }
 //

 const onWorkoutNameClick = async (e, index) => {
  e.preventDefault();
  console.log("Add to existing workout was clicked")
  setDialogOpen(false)

  // Map over the selected exercises and just keep the exercise itself
  // since that's the format that the db expects
  const selectedExercises = exerciseList.filter(exercise => exercise.selected)
  const exercises = selectedExercises.map(ex => ex.ex)

  const workout = workoutList[index]
  console.log(workout)
  // Create a new list of exercises that includes the exercises 
  // that were already part of this workout and the new ones I want to add
  const updatedExerciseList = [...exercises, ...workout.exercises]
  console.log(updatedExerciseList)
   
  // Make api call to update existing workout
  let result = await fetch(
    'http://localhost:4000/update-existing-workout', {
    method: "put",
    body: JSON.stringify({
      id: workout._id,
      workout: {
      workoutName: workout.workoutName,
      status: workout.status,
      exercises: updatedExerciseList,
      dateCreated: workout.dateCreated,
      dateOfWorkout: workout.dateOfWorkout
      }
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
result = await result.text();
if (result !== "Something went wrong") {
  const resultObject = JSON.parse(result)
  console.log(resultObject)
  alert("Data saved succesfully");
  setAlertClosed(!alertClosed);
  
  // Once the data has been saved in the db,
  // set all the exercises to have selected boolean as false
  const updatedExerciseList = exerciseList.map(exercise => {
    if (exercise.selected) return {...exercise, selected: false}
    return exercise
  })
  setExerciseList(updatedExerciseList)
}
}

const handleDialogClose = () => {
  setDialogOpen(false)
}

  const onAddExerciseToExistingWorkout = async (e) => {
      e.preventDefault()
      console.log("Add exercise to existing workout was clicked")
      // Map over the selected exercises and just keep the exercise itself
      // since that's the format that the db expects
      const selectedExercises = exerciseList.filter(exercise => exercise.selected)
      const exercises = selectedExercises.map(ex => ex.ex)

      if (exercises.length === 0) {
        alert("Please select some exercises first.")
      } else {
        console.log("In the else block")
        // Display dialog with list of workout
        setDialogOpen(true)
    }
  }

  // Takes a workout and an id
  // Calls update workout function from api
  // If func call is successful then returns success
  // else return an error - for now can be generic error
  // just an alert saying something went wrong
  const saveWorkoutInDB = async (workout, id) => {
    console.log("Save workout in db was called")
      let result = await fetch(
        'http://localhost:4000/update-existing-workout', {
          method: "put",
          body: JSON.stringify({ 
            id: id, 
            workout: workout 
          }),
          headers: {
            'Content-Type': 'application/json'
          }
      })
      result = await result.text();
      console.log("Saved workout from DB -")
      console.log(result);
      if (result !== "Something went wrong") {
        alert("Workout saved!")
        setWorkoutObject({})
        setShowWorkout(false)
        if (ongoingWorkout) setShowOngoingWorkout(false)
      } else { 
        alert("Something went wrong") 
      }
}

const deleteWorkoutInDB = async (id) => {
  let result = await fetch(
    'http://localhost:4000/delete-workout', {
      method: "delete",
      body: JSON.stringify({
        id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  result = await result.text();
  console.log(result)
  if (result !== "Delete request failed") {
    alert("Workout deleted successfully")
    setWorkoutObject({})
    setShowWorkout(false)
  } else {
    alert("Something went wrong")
  }
}

const onAddExerciseButtonClick = () => {
  console.log("Show add exercise dropdown")
  setAddExerciseDropdown(!addExerciseDropdown)
}

const startWorkout = (index) => {
  console.log("Button to start workout was clicked")
  // If a workout is already in progress, then don't open another one
  // if (!showOngoingWorkout) {
  //   alert("Please close or complete the current workout before starting another one.")
  // }
  // If the workout is not yet completed, then the user should be able to start it
  if (workoutList[index].status !== "Completed") {
  setShowOngoingWorkout(true)
  setOngoingWorkout(workoutList[index])
  }
  // Otherwise, show a popup that offers the option to duplicate the workout
  // Which creates a new workout in the database, with the same exercises,
  // but a new date, no sets and reps and weight, and status = not started
  else if (workoutList[index].status === "Completed") {
    setCompletedWorkout(workoutList[index])
    setShowCopyWorkoutDialog(true)
  }
}

const handleCopyWorkoutDialogAction = (e, option) => {
  if (option === "Yes") {
    console.log("yes was clicked")
    onCreateNewWorkout(e)
  }
  setShowCopyWorkoutDialog(false);
}

const WorkoutDialogInExerciseListForwardRef = forwardRef((props, ref) => {
  const { index, style, ...otherProps } = props
  return (
  <ListItem
    style={style}
    key={index}
    component="div"
    disablePadding
  >
    <ListItemButton ref={ref} onClick={(e) => onWorkoutNameClick(e, index)} {...otherProps}>
      <ListItemText
        color="#a3b899"
        primary={workoutList[index].workoutName + " " + workoutList[index].dateOfWorkout.slice(0, -14)} />
    </ListItemButton>
  </ListItem>)
});

const exDialogRef = useRef(null); 

const renderWorkoutInExerciseListDialog = (props) => {
    const { index, style } = props;
    return (
      <WorkoutDialogInExerciseListForwardRef index={index} style={style} ref={exDialogRef} />
    );
  }

const WorkoutListForwardRef = forwardRef((props, ref) => {
  const { index, style, ...otherProps } = props
  return (
  <ListItem
    style={style}
    key={index}
    component="div"
    disablePadding
  >
    <ListItemButton ref={ref} onClick={() => startWorkout(index)} {...otherProps}>
      { workoutList[index].status === "Completed" &&
        <CheckCircleIcon/>
      }
      <ListItemText
        color="#a3b899"
        primary={workoutList[index].workoutName + " " + workoutList[index].dateOfWorkout.slice(0, -14)} />
        <IconButton onClick={() => deleteWorkoutInDB(workoutList[index]._id)}>
          <CloseIcon/>
        </IconButton>
    </ListItemButton>
    <Dialog open={showCopyWorkoutDialog}>
        <DialogTitle>{"Workout is complete. Create a copy of this workout?"}</DialogTitle>
        <DialogActions>
          <Button onClick={(e) => handleCopyWorkoutDialogAction(e, e.target.textContent)} autoFocus>Yes</Button>
          <Button onClick={(e) => handleCopyWorkoutDialogAction(e, e.target.textContent)}>No</Button>
        </DialogActions>
    </Dialog>
  </ListItem>
  )
});

const workoutsDialogRef = useRef(null); 
  const renderWorkout = (props) => {
    const { index, style } = props;
    return (
      <WorkoutListForwardRef index={index} style={style} ref={workoutsDialogRef} />
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Workout App</p>
        <form action="">
          <TextField type="string" placeholder="Exercise Name" variant="outlined"
            value={newExercise} onChange={(e) => setNewExercise(e.target.value)} />
          <Button type="submit" variant="contained"
            onClick={onAddNewExercise}>Add</Button>
        </form>
        
        <div className="exercisesAndWorkouts">
        <Box
          sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
            <div className='headingRow'>
            <p>Exercises</p>
            <Dropdown>
              <MenuButton onClick={onAddExerciseButtonClick}>
                <AddCircleIcon/>
              </MenuButton>
                <Menu slots={{ listbox: Listbox }}>
                    <MenuItem onClick={onAddExerciseToNewWorkout}>
                        Add Exercises to New Workout
                    </MenuItem>
                    <MenuItem onClick={onAddExerciseToExistingWorkout}>
                        Add Exercises to Existing Workout
                    </MenuItem>
                </Menu>
              </Dropdown>
            </div>

            <Dialog open={dialogOpen}>
              <DialogTitle>Workouts</DialogTitle>
            <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
                  <DialogActions>
                    <Box
                        sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
                        <List
                            height={400}
                            width={360}
                            itemSize={46}
                            itemCount={workoutList.length}
                            overscanCount={5}
                        >
                            {renderWorkoutInExerciseListDialog}
                        </List>
                    </Box>
                  </DialogActions>
             </Dialog>
            
          <List
            height={400}
            width={360}
            itemSize={46}
            itemCount={exerciseList.length}
            overscanCount={5}
          >
            {renderExercise}
          </List>
        </Box>
     
          
        <Box
          sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
            <div className='headingRow'>
            <p>Workouts</p>
            </div>
            
          <List
            height={400}
            width={360}
            itemSize={46}
            itemCount={workoutList.length}
            workoutListForwardRef={WorkoutListForwardRef}
            overscanCount={5}
          >
            {renderWorkout}
          </List>
        </Box>

        </div>
        {
          workoutObject && showWorkout &&
          <div>
          <p>New Workout</p>
            <NewWorkout 
              workoutObj={workoutObject}
              saveWorkoutInDB={saveWorkoutInDB}
              deleteWorkoutInDB={deleteWorkoutInDB}
            />
            </div>
        }
        { ongoingWorkout && showOngoingWorkout && 
        <div>
        <p>Current Workout</p>
          <DoWorkout 
            ongoingWorkout={ongoingWorkout}
            setOngoingWorkout={setOngoingWorkout}
            saveWorkoutInDB={saveWorkoutInDB}
            setShowOngoingWorkout={setShowOngoingWorkout}
          />
          </div>
        }
    </header>
    </div >
  );
}

export default App;

// Todo - Find a better place to put these styles
const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E6',
  700: '#0059B3',
  800: '#004C99',
  900: '#003A75',
};

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
  };
  z-index: 1;
  `,
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
  `,
);