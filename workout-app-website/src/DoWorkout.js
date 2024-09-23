import Box from '@mui/material/Box';
import { Input } from '@mui/base/Input';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { FixedSizeList as List } from 'react-window';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import CircleIcon from '@mui/icons-material/Circle';

function DoWorkout(props) {
    const { ongoingWorkout, saveWorkoutInDB, getExerciseById } = props;
    const [exerciseList, setExerciseList] = useState([]);

    useEffect(() => {
        console.log("DoWorkout's useEffect is getting called")
        // TODO - loop over ongoingWorkout and get all the exercises 
        // from the DB one by one, then add them to the exercise list
    })

    const onCompleteWorkout = (e) => {
        e.preventDefault() 
        console.log("Complete workout was clicked")
        // TODO - make sure the following actually works
        // saveWorkoutInDB(ongoingWorkout, ongoingWorkout._id)
    }

    const onSaveWithoutCompleting = () => {

    }

    const displayExercise = (props) => {
        console.log(ongoingWorkout.exercises)
        const { index } = props
        return <ListItem
                key={index} 
                component="div" 
                disablePadding
                >
                <ListItemButton>
                <ListItemIcon>
                <CircleIcon fontSize='small'/>
              </ListItemIcon>
                <ListItemText color="#a3b899" primary={ongoingWorkout.exercises[index].exercise} />
                </ListItemButton>
        </ListItem>
    }

    return (
        <Box
            sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
            <form onSubmit={onCompleteWorkout}>
            <div className="workoutNameAndDate">
                <label className="text">
                    Workout Name - {ongoingWorkout.workoutName}
                </label>
                <label className="text">
                    Date of Workout - {ongoingWorkout.dateOfWorkout.slice(0, -14)}
                </label>
            </div>

            <div className="workoutStatus">
                <label className="text">
                    Workout Status -
                    <span className="text">{ongoingWorkout.status}</span>
                </label>
            </div>

                <List
                    height={200}
                    width={360}
                    itemSize={46}
                    itemCount={ongoingWorkout.exercises.length}
                    overscanCount={5}
                    sx={{listStyleType: 'disc'}}
                >
                    {displayExercise}
                </List>
                <input type="submit" value="Save without Completing" onClick={onSaveWithoutCompleting}/>
                <input type="submit" value="Complete Workout" />
            </form>
        </Box>
    )
}

export default DoWorkout;