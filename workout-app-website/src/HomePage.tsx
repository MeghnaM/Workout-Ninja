export default function HomePage() {
    return (
        <form action="">
                    <div className="pb-8">
                      <TextField
                        type="string"
                        placeholder="Exercise Name"
                        variant="outlined"
                        sx={{ marginRight: 2 }}
                        value={newExercise}
                        onChange={(e) => setNewExercise(e.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        className="bg-indigo-500"
                        onClick={onAddNewExercise}
                      >
                        Add
                      </Button>
                    </div>
                  </form>
 <div className="grid grid-flow-col gap-4">
            <StyledBox>
              <div className="headingRow">
                <StyledSectionHeading variant="h4">
                  Exercises
                </StyledSectionHeading>
                <Dropdown>
                  <StyledMenuButton onClick={onAddExerciseButtonClick}>
                    <AddIcon />
                  </StyledMenuButton>
                  <Menu slots={{ listbox: Listbox }}>
                    <StyledMenuItem onClick={onAddExerciseToNewWorkout}>
                      Add Exercises to New Workout
                    </StyledMenuItem>
                    <StyledMenuItem onClick={onAddExerciseToExistingWorkout}>
                      Add Exercises to Existing Workout
                    </StyledMenuItem>
             
     </Menu>
                </Dropdown>
              </div>
              <Dialog open={dialogOpen}>
                <DialogActions>
                  <StyledBox>
                    <DialogTitle>
                      <StyledSectionSubheading variant="h5">
                        Workouts
                      </StyledSectionSubheading>
                      <IconButton
                        aria-label="close"
                        onClick={handleDialogClose}
                        sx={(theme) => ({
                          position: "absolute",
                          right: 8,
                          top: 8,
                          color: theme.palette.grey[500],
                        })}
                      >
                        <CloseIcon />
                      </IconButton>
                    </DialogTitle>
                    <List
                      height={300}
                      width={400}
                      itemSize={46}
                      itemCount={workoutList.length}
                      overscanCount={5}
                    >
                      {renderWorkoutInExerciseListDialog}
                    </List>
                  </StyledBox>
                </DialogActions>
              </Dialog>
              <List
                height={300}
                width={380}
                itemSize={46}
                itemCount={exerciseList.length}
                overscanCount={5}
              >
                {renderExercise}
              </List>
            </StyledBox>
            <div>
              <StyledBox>
                <StyledSectionHeading variant="h4">
                  Workouts
                </StyledSectionHeading>
                <div className="grid grid-flow-col gap-4">
                  <StyledSectionSubheading>Completed</StyledSectionSubheading>
                  <StyledSectionSubheading>Name</StyledSectionSubheading>
                  <StyledSectionSubheading>Date</StyledSectionSubheading>
                  <StyledSectionSubheading>Delete</StyledSectionSubheading>
                </div>
                <List
                  height={300}
                  width={400}
                  itemSize={46}
                  itemCount={workoutList.length}
                  workoutListForwardRef={WorkoutListForwardRef}
                  overscanCount={5}
                >
                  {renderWorkout}
                </List>
              </StyledBox>
            </div>
          </div>
          <LineGraph width={800} height={500} />
          {workoutObject && showWorkout && (
            <NewWorkout
              workoutObj={workoutObject}
              saveWorkoutInDB={saveWorkoutInDB}
              deleteWorkoutInDB={deleteWorkoutInDB}
            />
          )}
          {ongoingWorkout && showOngoingWorkout && (
            <DoWorkout
              ongoingWorkout={ongoingWorkout}
              setOngoingWorkout={setOngoingWorkout}
              saveWorkoutInDB={saveWorkoutInDB}
              setShowOngoingWorkout={setShowOngoingWorkout}
            />
          )}
       
      </div>
    )
}