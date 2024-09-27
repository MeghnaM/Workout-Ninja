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

function App() {

  const [newExercise, setNewExercise] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [workoutObject, setWorkoutObject] = useState({});
  const [showWorkout, setShowWorkout] = useState(false);
  const [workoutList, setWorkoutList] = useState([]);
  const [ongoingWorkout, setOngoingWorkout] = useState([]);
  const [showOngoingWorkout, setShowOngoingWorkout] = useState(false);
  const [exercisesInOngoingWorkout, setExercisesInOngoingWorkout] = useState([]);

  useEffect(() => {
    console.log("Use effect is getting called")
    async function getExercises() {
      await fetch('http://localhost:4000/get-exercises')
        .then(response => response.json())
        .then(data => { setExerciseList(data) })
        .catch(error => console.error(error));
    }

    async function getWorkouts() {
      await fetch('http://localhost:4000/get-workouts')
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        setWorkoutList(data)
      })
      .catch(error => console.error(error));
    }

    getExercises();
    getWorkouts();
  }, [newExercise, workoutObject])

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
        onAddExerciseToNewWorkout={onAddExerciseToNewWorkout}
        onAddExerciseToExistingWorkout={onAddExerciseToExistingWorkout}
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

  const onAddExerciseToNewWorkout = (exercise) => {
    return async (e) => {
      console.log("Add exercise to new workout", exercise)
      e.preventDefault();
      let result = await fetch(
        'http://localhost:4000/create-new-workout', {
        method: "post",
        body: JSON.stringify({
          workoutName: 'New Workout',
          status: 'Not Started',
          exercises: [exercise],
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
      }
    }
  //else {
  //   alert("Please save existing workout before creating a new one.")
  // }
  }

  const onAddExerciseToExistingWorkout = (exercise, workoutId) => {
    return async (e) => {
      console.log("Add exercise to existing workout was clicked")
      e.preventDefault()
      // Get workout from workout list using workout id
      // Update workout in db with that id
      console.log(workoutList)
      //const existingWorkout = workoutList.find((workout) => workout.id === workoutId)
      let result = await fetch(

      )
    }
  }

  // Takes a workout and an id
  // Calls update workout function from api
  // If func call is successful then returns success
  // else return an error - for now can be generic error
  // just an alert saying something went wrong
  const saveWorkoutInDB = async (workout, id) => {
    console.log("Save workout in db was called")
    //return async (e) => {
      //e.preventDefault();
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
  //}
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

const startWorkout = (index) => {
  console.log("Button to start workout was clicked")
  console.log(workoutList[index])
  setShowOngoingWorkout(true)
  setOngoingWorkout(workoutList[index])
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
      <ListItemText
        color="#a3b899"
        primary={workoutList[index].workoutName + " " + workoutList[index].dateOfWorkout.slice(0, -14)} />
    </ListItemButton>
  </ListItem>)
});

const ref = useRef(null); 

  const renderWorkout = (props) => {
    const { index, style } = props;
    return (
      <WorkoutListForwardRef index={index} style={style} ref={ref} />
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
        <p>Exercise List</p>
        <Box
          sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
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
        <p>Workouts</p>
        {
          workoutObject && showWorkout &&
            <NewWorkout 
              workoutObj={workoutObject}
              saveWorkoutInDB={saveWorkoutInDB}
              deleteWorkoutInDB={deleteWorkoutInDB}
            />
        }
        <p>Workout List</p>
        <Box
          sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
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
        <p>Ongoing Workout</p>
        { ongoingWorkout && showOngoingWorkout && 
          <DoWorkout 
            ongoingWorkout={ongoingWorkout}
            setOngoingWorkout={setOngoingWorkout}
            saveWorkoutInDB={saveWorkoutInDB}
            setShowOngoingWorkout={setShowOngoingWorkout}
          />
        }
    </header>
    </div >
  );
}

export default App;