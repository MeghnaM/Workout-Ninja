import Box from '@mui/material/Box';
import { Input } from '@mui/base/Input';
import { useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import CircleIcon from '@mui/icons-material/Circle';

function NewWorkout(props) {
    const { workoutObj, saveWorkoutInDB, deleteWorkoutInDB } = props;

    const [workout, setWorkout] = useState(workoutObj.workout)

    const updateValue = (event) => {
        setWorkout({
              ...workout,
              [event.target.name]: event.target.value, 
        })
    }
    
    const onSaveWorkout = (e) => {
        e.preventDefault();
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
                <ListItemIcon>
                <CircleIcon fontSize='small'/>
              </ListItemIcon>
                <ListItemText color="#a3b899" primary={workout.exercises[index].exercise} />
                </ListItemButton>
        </ListItem>
    }

    return (
        <Box
            sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
            <form onSubmit={onSaveWorkout}>

                <div className="workoutNameAndDate">
                    <label className="text">
                        Workout Name -
                        <Input 
                            name="workoutName" 
                            value={workout.workoutName} 
                            onChange={updateValue} 
                            required 
                        />
                    </label>
                    <label className="text">
                        Date of Workout -
                        <Input 
                            name="dateofWorkout" 
                            value={workout.dateOfWorkout} 
                            onChange={updateValue} 
                        />
                    </label>
                </div>

                <div className="workoutStatus">
                    <label className="text">
                        Workout Status -
                        <span className="text">{workout.status}</span>
                    </label>
                </div>

                <List
                    height={200}
                    width={360}
                    itemSize={46}
                    itemCount={workout.exercises.length}
                    overscanCount={5}
                    sx={{listStyleType: 'disc'}}
                >
                    {displayExercise}
                </List>
                <input type="submit" value="Save Workout" />
                <input type="submit" value="Cancel" onClick={onCancelSave}/>
            </form>

        </Box>
    );
}

export default NewWorkout;