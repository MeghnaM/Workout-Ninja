// Filename - server-and-db/index.js

// To connect with your mongoDB database
const mongoose = require('mongoose');
//const mongodbURI = 'mongodb://localhost:27017/workout-app-db';

// const username = encodeURIComponent("meghna");
// const password = encodeURIComponent("FRG8tgh*bte_any9xdu");
// const cluster = "workoutappcluster.1xt5j.mongodb.net";
// const appName = "WorkoutAppCluster";
// let mongodbURI = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority&appName=${appName}`;

let mongodbURI = 'mongodb+srv://meghna:FRG8tgh*bte_any9xdu@workoutappcluster.1xt5j.mongodb.net/workout-app-db?retryWrites=true&w=majority&appName=WorkoutAppCluster';
const { Schema } = mongoose;

mongoose.connect(mongodbURI)
.then(() => console.log('Connected to workout-app-db database'))
.catch((err) => console.log(err))

/* {
    dbName: 'workout-app-db',
    useNewUrlParser: true,
    useUnifiedTopology: true
} */

// Schema for exercises
const ExerciseSchema = new Schema({
    // Example - Barbell Squat to Press 4x10
    exercise: {
        type: 'String',
        required: true
    }
})

// Schema for workouts
// When new workout is created frontend sets defaults for name, status and dateCreated
//{ exerciseName: ExerciseSchema },
//new mongoose.Schema({
//   { weight: Number },
//    { completed: Boolean }
const WorkoutSchema = new Schema({
    workoutName: {
        type: String,
        required: true
    },
    status: { 
        type: String,
        enum: [ "Not Started", "In Progress", "Completed" ],
        required: true
     },
    exercises: [
        {type: Schema.Types.ObjectId, ref: 'Exercise' }
    ],
    exercisesCompleted: [],
    weights: [],
    sets: [],
    reps: [],
    dateCreated: { 
        type: Date,
        required: true
    },
    dateOfWorkout: {
        type: Date,
        required: true
    }
},{
    virtuals: {
      name: {
        get() {
          return this.workoutName + ' ' + this.dateOfWorkout;
        }
      }
    }
})

const Exercise = mongoose.model('Exercise', ExerciseSchema);
const Workout = mongoose.model('Workout', WorkoutSchema);
Exercise.createIndexes();
Workout.createIndexes();

// For server and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 4000");
app.use(express.json());
// app.use(cors());
app.use(cors({
    origin: ['http://localhost:3000', 'https://workout-ninja.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    //credentials: true - not using session-based authorization, so skipping
  }));
app.get("/", (req, resp) => {
    // Can check if the server is running by looking at http://localhost:4000.
    // The string "Server is running" being displayed means the server is working properly.
    resp.send("Server is running");
});

app.get("/get-exercise-by-id", async (req, resp) => {
    console.log("Get exercise by id was called")
    try {
        const exercise = await Exercise.findById(req.id);
        //console.log(JSON.stringify(exerciseCollection))
        resp.send(JSON.stringify(exercise))
    } catch (error) {
        console.log(error)
        resp.send("Get request failed");
    }
});

app.get("/get-exercises", async (req, resp) => {
    console.log("Get exercises was called")
    try {
        console.log("Inside the try block for get exercises")
        const exerciseCollection = await Exercise.find();
        console.log(JSON.stringify(exerciseCollection))
        resp.send(JSON.stringify(exerciseCollection))
    } catch (error) {
        console.log(error)
        resp.send("Get request failed");
    }
});

app.get("/get-workouts", async (req, resp) => {
    console.log("Get workouts was called") 
    try {
        const workoutCollection = await Workout.find().populate('exercises');
        console.log(JSON.stringify(workoutCollection))
        resp.send(JSON.stringify(workoutCollection))
    } catch (error) {
        console.log(error)
        resp.send("Get request failed");
    }
});

app.delete("/delete-workout", async (req, resp) => {
    console.log("Delete workout was called")
    try {
        const workout = await Workout.deleteOne({ id: req.id });
        resp.send("Deleted workout")
    } catch (error) {
        console.log(error)
        resp.send("Delete request failed");
    }
})

// TODO - rename this api route, 
// and maybe delete the line delete result.password - not sure if it's needed
app.post("/register", async (req, resp) => {
    console.log("Register was called") // got printed
    try {
        const exercise = new Exercise(req.body);
        let result = await exercise.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("Exercise exists in DB");
        }
 
    } catch (e) {
        resp.send("Something Went Wrong");
    }
});

app.post("/create-new-workout", async (req, resp) => {
    console.log("Create new workout was called")
    console.log(req)
    try {
        const workout = new Workout(req.body);
        let result = await workout.save();
        result = result.toObject();
        if (result) {
            const response = { workout: req.body, id: result._id }
            resp.send(response);
            console.log(result);
        } else {
            console.log("Workout exists in DB");
        }
    }
    catch (e) {
        resp.send("Something went wrong")
    }
})

app.put("/update-existing-workout", async (req, resp) => {
    console.log("Get request to update existing workout was called")
    console.log(req.body)
    try {
        // findByIdAndUpdate returns the workout before it was updated
        const workout = await Workout.findByIdAndUpdate(req.body.id, req.body.workout);
        let result = workout.toObject()
        if (result) {
            resp.send(workout)
        } else {
            console.log("Could not find workout in DB")
        }
    } 
    catch (e) {
        resp.send("Something went wrong")
    }
})

var port = process.env.PORT || 8080; // set the port
app.listen(port);