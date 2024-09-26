import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { FixedSizeList as List } from 'react-window';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { DialogTitle } from '@mui/material';

function DoWorkout(props) {
    const { ongoingWorkout, setOngoingWorkout, saveWorkoutInDB, setShowOngoingWorkout } = props;
    const completedExList = ongoingWorkout.exercises.map(ex => ({
        id: ex._id,
        completed: false
    }))
    const [exerciseList, setExerciseList] = useState(ongoingWorkout.exercises);
    const [completedExerciseList, setCompletedExerciseList] = useState(completedExList);
    const [workoutName, setWorkoutName] = useState(ongoingWorkout.workoutName);
    const [workoutDate, setWorkoutDate] = useState(ongoingWorkout.dateOfWorkout.slice(0, -14));
    const [checkboxState, setCheckboxState] = useState(false);
    const [closeAlert, setCloseAlert] = useState(false);

    useEffect(() => {
        //console.log("DoWorkout's useEffect is getting called")
        //console.log(ongoingWorkout)
        //console.log(workoutName)
        //console.log(regex.test(workoutDate))
    }, [workoutDate])

    // Create a new object with the updated
    // workoutName, workoutDate and the completed list of exercises
    // Save that object in the DB
    const onCompleteWorkout = (e) => {
        e.preventDefault() 
        console.log("Complete workout was clicked")
        //console.log(ongoingWorkout)
        const completedWorkout = {
            ...ongoingWorkout,
            workoutName: workoutName,
            dateOfWorkout: workoutDate,
            exercisesCompleted: completedExerciseList 
      }
      setOngoingWorkout(completedWorkout)
      saveWorkoutInDB(completedWorkout, completedWorkout._id)
    }

    const onClose = (e) => {
        e.preventDefault();
        console.log("Close without saving")
        setCloseAlert(true)
    }

    // Handles clicks on buttons within the close dialog
    const closeDialog = (choice) => {
        console.log(choice)
        if (choice === 'Yes') {
            // Set show ongoing workout to false
            // Don't save workout to the DB
            setShowOngoingWorkout(false)
        } 
        // If choice is No, then we don't need to do anything
        // and simply close the alert
        setCloseAlert(false)
    }

    const setExerciseAsCompleted = (id) => {
        setCheckboxState(!checkboxState)
        // Find the exercise that has the id = the id I'm looking for
        // then set the completed boolean of that exercise to be the opposite of what it is
        const newList = completedExerciseList.map((exercise) => {
            if (exercise.id === id) {
              
              const updatedExercise = {
                ...exercise,
                completed: !exercise.completed,
              };
              return updatedExercise;
            }
            return exercise;
          });
        setCompletedExerciseList(newList);
    }

    const displayExercise = (props) => {
        //console.log(ongoingWorkout.exercises)
        const { index } = props

        return <ListItem
                key={index} 
                component="div" 
                disablePadding
                >
                <ListItemButton>
                <ListItemIcon>
                <Checkbox 
                checked={checkboxState}
                onChange={() => setExerciseAsCompleted(exerciseList[index]._id)}
                fontSize='small'
                />
              </ListItemIcon>
                <ListItemText color="#a3b899" primary={exerciseList[index].exercise} />
                </ListItemButton>
        </ListItem>
    }

    const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    const formIsValid = () => {
        // Form is valid if workout has a name and the date is in the correct format
        return workoutName.length > 0 && regex.test(workoutDate)
    }

    return (
        <Box
            sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
            <form>
            <div className="workoutDisplayRow">
                    <TextField
                        required
                        id="outlined-required"
                        label="Workout Name"
                        error={workoutName.length === 0}
                        helperText={workoutName.length === 0 ? "Field cannot be empty" : ""}
                        defaultValue={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Workout Date"
                        error={!regex.test(workoutDate)}
                        helperText={!regex.test(workoutDate) ? "Date format - YYYY-MM-DD" : ""}
                        defaultValue={workoutDate}
                        onChange={(e) => setWorkoutDate(e.target.value)}
                    />
            </div>

                <List
                    height={200}
                    width={360}
                    itemSize={46}
                    itemCount={exerciseList.length}
                    overscanCount={5}
                    sx={{listStyleType: 'disc'}}
                >
                    {displayExercise}
                </List>

            <div className='workoutDisplayRow'>
                <Button variant="contained" onClick={onClose}>Close</Button>
                <Dialog open={closeAlert}>
                <DialogTitle>{"No changes will be saved. Close anyway?"}</DialogTitle>
                <DialogActions>
                <Button onClick={(e) => closeDialog(e.target.textContent)} autoFocus>Yes</Button>
                <Button onClick={(e) => closeDialog(e.target.textContent)}>No</Button>
                </DialogActions>
                </Dialog>
                <Button variant="contained" disabled={formIsValid() ? false: true} onClick={onCompleteWorkout}>
                    Complete Workout
                </Button>
            </div>
            </form>
        </Box>
    )
}

export default DoWorkout;

{/* <div className="workoutStatus">
                <label className="text">
                    Workout Status -
                    <span className="text">{ongoingWorkout.status}</span>
                </label>
            </div> */}