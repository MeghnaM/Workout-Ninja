import './App.css';
import { useState, useRef, forwardRef } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import { FixedSizeList as List } from 'react-window';
import Checkbox from '@mui/material/Checkbox';
import { StyledListItemText, theme } from './StyledComponentsLibrary.js';
import { ThemeProvider } from '@mui/material/styles';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { StyledBox } from './StyledComponentsLibrary.js';

function ExerciseInList(props) {
    const { index, style, exerciseList, workoutList, setExerciseList } = props;

    const [showDropdown, setShowDropdown] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const onAddExerciseToWorkout = () => {
        console.log("Add exercise button was clicked")
        setShowDropdown(!showDropdown)
    }

    const createHandleMenuClick = (menuItem) => {
        console.log(`Button was clicked for ${menuItem}`)
    }

    const onClickListItemButton = () => {
        console.log("List item button was clicked")
    }

    const selectedWorkout = () => {
        //onAddExerciseToExistingWorkout(exerciseList[index],
        setDialogOpen(false) 
    }

    const onAddToExistingWorkoutButtonClick = () => {
        console.log("Add to existing workout was clicked")
        setDialogOpen(true)
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
          <ListItemButton ref={ref} onClick={() => onAddToExistingWorkoutButtonClick(index)} {...otherProps}>
            <ListItemText
              color="#a3b899"
              primary={workoutList[index].workoutName + " " + workoutList[index].dateOfWorkout.slice(0, -14)} />
          </ListItemButton>
        </ListItem>)
      });
      
      const ref = useRef(null); 
      
    const renderWorkoutInExerciseListDialog = (props) => {
          const { index, style } = props;
          return (
            <WorkoutListForwardRef index={index} style={style} ref={ref} />
          );
        }

    // checkbox checked logic
    const onCheckboxClick = (exercise) => {
      //console.log("checkbox was clicked")
      //console.log(exercise)
      // Find this exercise in the exercise list
      // and update its selected boolean
      const updatedExerciseList = exerciseList.map(item => {
        if (item.ex._id === exercise.ex._id) {
          const updatedExercise = {
            ...item,
            selected: !item.selected
          }
          //console.log(updatedExercise)
          return updatedExercise;
        }
        return item;
     })
     setExerciseList(updatedExerciseList)
    }

    return (
      <ThemeProvider theme={theme}>
        <ListItem 
            style={style}
            key={index} 
            component="div" 
            disablePadding
          >
            <ListItemButton onClick={onClickListItemButton}>
            <Checkbox 
                icon={<RadioButtonUncheckedIcon/>}
                checkedIcon={<RadioButtonCheckedIcon/>}
                checked={exerciseList[index].selected}
                fontSize='small'
                onChange={() => onCheckboxClick(exerciseList[index])}
                color='secondary'
                />
              <StyledListItemText primary={exerciseList[index].ex.exercise} />
            </ListItemButton>
    
              <Dialog open={dialogOpen}>
                  <DialogActions>
                    <StyledBox>
                        <List
                            height={400}
                            width={360}
                            itemSize={46}
                            itemCount={workoutList.length}
                            overscanCount={5}
                        >
                            {renderWorkoutInExerciseListDialog}
                        </List>
                    </StyledBox>
                  </DialogActions>
             </Dialog>
          </ListItem>
          </ThemeProvider>
    );

}

export default ExerciseInList;