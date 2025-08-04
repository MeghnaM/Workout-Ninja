import { useState, useRef, forwardRef } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { FixedSizeList as List } from "react-window";
import Checkbox from "@mui/material/Checkbox";
import {
  StyledListItemText,
  theme,
} from "../styles/StyledComponentsLibrary.js";
import { ThemeProvider } from "@mui/material/styles";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Box from "@mui/material/Box";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function ExerciseInList(props) {
  const { index, style, exerciseList, workoutList, setExerciseList } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const onClickListItemButton = () => {
    console.log("List item button was clicked");
  };

  const onAddToExistingWorkoutButtonClick = () => {
    console.log("Add to existing workout was clicked");
    setDialogOpen(true);
  };

  const WorkoutListForwardRef = forwardRef((props, ref) => {
    const { index, style, ...otherProps } = props;
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton
          ref={ref}
          onClick={() => onAddToExistingWorkoutButtonClick(index)}
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

  const ref = useRef(null);

  const renderWorkoutInExerciseListDialog = (props) => {
    const { index, style } = props;
    return <WorkoutListForwardRef index={index} style={style} ref={ref} />;
  };

  // checkbox checked logic
  const onCheckboxClick = (exercise) => {
    //console.log("checkbox was clicked")
    //console.log(exercise)
    // Find this exercise in the exercise list
    // and update its selected boolean
    const updatedExerciseList = exerciseList.map((item) => {
      if (item.ex._id === exercise.ex._id) {
        const updatedExercise = {
          ...item,
          selected: !item.selected,
        };
        //console.log(updatedExercise)
        return updatedExercise;
      }
      return item;
    });
    setExerciseList(updatedExerciseList);
  };

  return (
    <ThemeProvider theme={theme}>
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton onClick={onClickListItemButton}>
          {/* <Checkbox
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<RadioButtonCheckedIcon />}
            checked={exerciseList[index].selected}
            fontSize="small"
            onChange={() => onCheckboxClick(exerciseList[index])}
            color="secondary"
          /> */}
          <KeyboardArrowRightIcon color="primary" />
          <StyledListItemText primary={exerciseList[index].ex.exercise} />
        </ListItemButton>
        <Dialog open={dialogOpen}>
          <Box>
            <List
              height={300}
              width={400}
              itemSize={46}
              itemCount={workoutList.length}
              overscanCount={5}
            >
              {renderWorkoutInExerciseListDialog}
            </List>
          </Box>
        </Dialog>
      </ListItem>
    </ThemeProvider>
  );
}

export default ExerciseInList;
