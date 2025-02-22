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
import { StyledBox, StyledSectionHeading } from './StyledComponentsLibrary';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './StyledComponentsLibrary';

function DoWorkout(props) {
    const { ongoingWorkout, setOngoingWorkout, saveWorkoutInDB, setShowOngoingWorkout } = props;
    // Create a list of exercises that has the following properties -
    // id, exercise name, completed, sets, reps, weight
    const exercisesAndData = ongoingWorkout.exercises.map(exercise => ({
        id: exercise._id,
        exerciseName: exercise.exercise,
        completed: false,
        sets: "",
        reps: "",
        weight: ""
    }))
    const [exerciseData, setExerciseData] = useState(exercisesAndData);
    const [workoutName, setWorkoutName] = useState(ongoingWorkout.workoutName);
    const [workoutDate, setWorkoutDate] = useState(ongoingWorkout.dateOfWorkout.slice(0, -14));
    const [closeAlert, setCloseAlert] = useState(false);

    useEffect(() => {
        console.log(exerciseData)
    }, [exerciseData])

    // Create a new object with the updated workoutName, workoutDate 
    // and the completed list of exercises along with sets, reps and weight
    // Save that object in the DB and set show workout to be false
    const onCompleteWorkout = (e) => {
        e.preventDefault() 
        console.log("Complete workout was clicked")

        // Create objects for weights, sets, reps and exercisesCompleted
        // Don't need a separate object for exercises because the existing workout has that already
        const weights = exerciseData.map(data => ({
            id: data.id,
            weight: data.weight
        }))
        const sets = exerciseData.map(data => ({
            id: data.id,
            sets: data.sets
        }))
        const reps = exerciseData.map(data => ({
            id: data.id,
            reps: data.reps
        }))
        const exercisesCompleted = exerciseData.map(data => ({
            id: data.id,
            completed: data.completed
        }))
 
        // Check form validity
        if (formIsValid) {
            // Create a new workout object with the exercises and data,
            // as well as the new workout name and date
            const completedWorkout = {
                ...ongoingWorkout,
                workoutName: workoutName,
                dateOfWorkout: workoutDate,
                weights: weights,
                sets: sets,
                reps: reps,
                exercisesCompleted: exercisesCompleted,
                status: "Completed"
            }
            // Call saveWorkoutInDB with the completed workout
            setOngoingWorkout(completedWorkout)
            saveWorkoutInDB(completedWorkout, completedWorkout._id)
        } else {
            alert("Please make sure the workout has a name and a date, and that every completed exercise has the sets, reps and weight fields filled out.")
        }
    }

    // Update exercise with auxillary data
    const updateExerciseData = (id, field, value) => {
        // Map over the list of exercises
        // Find the exercise with this id, update the corresponding field and value
        // Put the exercise back into the list
        console.log(exerciseData)
        const updatedExerciseData = exerciseData.map(exercise => {
            if (exercise.id === id) {
                const updatedExercise = {
                    ...exercise,
                    [field]: value
                }
                return updatedExercise
            }
            return exercise
        })
        setExerciseData(updatedExerciseData)
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

    const displayExercise = (props) => {
        const { index } = props

        return <ListItem
                key={index} 
                component="div" 
                disablePadding
                >
                <ListItemButton>
                <ListItemIcon>
                <Checkbox 
                icon={<RadioButtonUncheckedIcon/>}
                checkedIcon={<RadioButtonCheckedIcon/>}
                checked={exerciseData[index].completed}
                onChange={(e) => updateExerciseData(exerciseData[index].id, "completed", !exerciseData[index].completed)}
                fontSize='small'
                />
              </ListItemIcon>
                <ListItemText
                    sx={{color: theme.palette.primary.main, width: 200}} 
                    primary={exerciseData[index].exerciseName} 
                />
                <TextField  
                label="Sets" 
                defaultValue={exerciseData[index].sets}
                sx={{maxWidth: 200}}
               onChange={(e) => updateExerciseData(exerciseData[index].id, "sets", e.target.value)}
            />
                <TextField 
                label="Reps"
                defaultValue={exerciseData[index].reps}
                sx={{maxWidth: 200}}
               onChange={(e) => updateExerciseData(exerciseData[index].id, "reps", e.target.value)}
                />
                <TextField  
                label="Weight"
                defaultValue={exerciseData[index].weight}
                sx={{maxWidth: 200}}
               onChange={(e) => updateExerciseData(exerciseData[index].id, "weight", e.target.value)}
                />
                </ListItemButton>
        </ListItem>
    }

    const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    const formIsValid = () => {
        let valid = false
        // Form is valid if workout has a name and the date is in the correct format
        if (workoutName.length > 0 && regex.test(workoutDate)) {
            // And if for every checked off exercise, sets, reps and weight is populated
            exerciseData.map(exercise => {
                if (exercise.completed && exercise.sets.length > 0 
                    && exercise.reps.length > 0 && exercise.weight.length > 0) {
                    valid = true
                }
            })
        }
        return valid
    }

    return (
        <ThemeProvider theme={theme}>
        <StyledBox>
            <StyledSectionHeading variant="h4">Current Workout</StyledSectionHeading>
            <form onSubmit={onCompleteWorkout}>
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
                    height={210}
                    width={400}
                    itemSize={46}
                    itemCount={exerciseData.length}
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
                <Button type="submit" variant="contained">
                    Complete Workout
                </Button>
            </div>
            </form>
        </StyledBox>
        </ThemeProvider>
    )
}

export default DoWorkout;