import './App.css';
import { useState, useRef, forwardRef } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { DialogContent, DialogTitle, ListItemIcon } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { FixedSizeList as List } from 'react-window';
import Checkbox from '@mui/material/Checkbox';

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
        <ListItem 
            style={style} 
            key={index} 
            component="div" 
            disablePadding
          >
            <ListItemButton onClick={onClickListItemButton}>
            <Checkbox 
                checked={exerciseList[index].selected}
                fontSize='small'
                onChange={() => onCheckboxClick(exerciseList[index])}
                />
              <ListItemText color="#a3b899" primary={exerciseList[index].ex.exercise} />
            </ListItemButton>
    
              <Dialog open={dialogOpen}>
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
          </ListItem>
    );

}

export default ExerciseInList;

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