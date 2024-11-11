import { Input } from '@mui/base/Input';
import { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import CircleIcon from '@mui/icons-material/Circle';
import { StyledBox, StyledSectionHeading } from './StyledComponentsLibrary';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './StyledComponentsLibrary';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function NewWorkout(props) {
    const { workoutObj, saveWorkoutInDB, deleteWorkoutInDB } = props;
    const [workout, setWorkout] = useState(workoutObj.workout)
    const [workoutName, setWorkoutName] = useState(workout.workoutName);
    const [workoutDate, setWorkoutDate] = useState(workout.dateOfWorkout);

    useEffect(() => {
        console.log(workout)
    })

    const updateValue = (event) => {
        setWorkout({
              ...workout,
              [event.target.name]: event.target.value, 
        })
    }
    
    const onSaveWorkout = (e) => {
        e.preventDefault();
        console.log("save workout in db was called", workout)
        saveWorkoutInDB(workout, workoutObj.id)
    }

    const onCancelSave = (e) => {
        e.preventDefault();
        deleteWorkoutInDB(workoutObj.id)
    }

    const displayExercise = (props) => {
        const { index } = props
        return <ListItem
                key={index} 
                component="div" 
                disablePadding
                >
                <ListItemButton>
                <ListItemIcon sx={{color: theme.palette.primary.main}}>
                <RadioButtonCheckedIcon />
              </ListItemIcon>
                <ListItemText 
                  sx={{ color: theme.palette.primary.main }} 
                  primary={workout.exercises[index].exercise} 
                />
                </ListItemButton>
        </ListItem>
    }

    return (
        <ThemeProvider theme={theme}>
        <StyledBox>
            <StyledSectionHeading variant="h4">New Workout</StyledSectionHeading>
            <form onSubmit={onSaveWorkout}>
            <div className="workoutDisplayRow">
                <TextField
                    required
                    id="outlined-required"
                    label="Workout Name"
                    name="workoutName"
                    defaultValue={workout.workoutName}
                    onChange={updateValue}
                 />
                 <TextField
                    required
                    id="outlined-required"
                    label="Workout Date"
                    name="dateOfWorkout"
                    defaultValue={workout.dateOfWorkout}
                    onChange={updateValue}
                 />
            </div>
                <List
                    height={210}
                    width={400}
                    itemSize={46}
                    itemCount={workout.exercises.length}
                    overscanCount={5}
                    sx={{listStyleType: 'disc'}}
                >
                    {displayExercise}
                </List>
                <div className='workoutDisplayRow'>
                <Button type="submit" variant="contained">
                    Save Workout
                </Button>
                <Button variant="contained" onClick={onCancelSave}>Cancel</Button>
                </div>
            </form>

        </StyledBox>
        </ThemeProvider>
    );
}

export default NewWorkout;