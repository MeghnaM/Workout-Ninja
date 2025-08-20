import React, { useEffect } from "react";
import { useState } from "react";
import { extent, max } from "@visx/vendor/d3-array";
import * as allCurves from "@visx/curve";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { scaleTime, scaleLinear, scaleOrdinal, scaleBand } from "@visx/scale";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../styles/StyledComponentsLibrary.js";
import cityTemperature, {
  CityTemperature,
} from "@visx/mock-data/lib/mocks/cityTemperature";
import {
  MarkerArrow,
  MarkerCross,
  MarkerX,
  MarkerCircle,
  MarkerLine,
} from "@visx/marker";
import generateDateValue, {
  DateValue,
} from "@visx/mock-data/lib/generators/genDateValue";
import { StyledSectionHeading } from "../styles/StyledComponentsLibrary";
import { LegendOrdinal } from "@visx/legend";
import { AxisBottom, AxisLeft } from "@visx/axis";

type CurveType = keyof typeof allCurves;

export type CurveProps = {
  width: 800;
  height: 500;
  showControls?: boolean;
  workoutList: any[];
};

export default function LineGraph({
  width,
  height,
  showControls = true,
  workoutList = [],
}: CurveProps) {
  // const theme = useTheme();
  const [curveType, setCurveType] = useState<CurveType>("curveLinear");
  const [dateWindow, setDateWindow] = useState<number>(60);

  useEffect(() => {
    const filteredData = getFilteredLineData();
    const availableExercises = Object.keys(filteredData);
    setExercises(availableExercises);
    // Only set defaults if none are selected yet
    if (selectedExercises.length === 0 && availableExercises.length > 0) {
      setSelectedExercises(availableExercises.slice(0, 3)); // Select first 3
    }
    console.log("Exercise Data in correct format -", lineSeriesData());
  }, [workoutList, dateWindow]);

  function LegendDemo({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <div className="legend">
        <div className="title">{title}</div>
        {children}
        <style>{`
          .legend {
            line-height: 0.9em;
            color:rgb(0, 140, 255);
            font-size: 10px;
            font-family: 'Lato', sans-serif;
            padding: 10px 10px;
            float: left;
            border: 1px solid rgba(0, 110, 255, 0.3);
            border-radius: 8px;
            margin: 5px 5px;
          }
          .title {
            font-size: 12px;
            margin-bottom: 10px;
            font-weight: 100;
          }
        `}</style>
      </div>
    );
  }

  // chart data shape =
  // {exerciseName: array[date, value]}
  // get completed workouts, get exercise data - date, highest weight, exercise name
  const lineSeriesData = () => {
    const completedWorkouts = workoutList.filter(
      (workout) => workout.status === "Completed"
    );
    const exerciseData = completedWorkouts.flatMap((workout) => {
      const workoutDate = new Date(workout.dateOfWorkout);
      return workout.exerciseData.map((exercise) => {
        const exerciseName = exercise.exerciseId.exercise;
        const highestWeight = Math.max(
          ...exercise.sets.map((set) => set.weight || 0)
        );
        return {
          name: exerciseName,
          date: workoutDate,
          weight: highestWeight,
        };
      });
    });
    const lineData = exerciseData.reduce((acc, exercise) => {
      if (!acc[exercise.name]) {
        acc[exercise.name] = [];
      }
      acc[exercise.name].push({
        date: exercise.date,
        value: exercise.weight,
      });
      return acc;
    }, {}); // Initial value is empty accumulator {}
    return lineData;
  };

  // bounds
  const margin = { top: 40, right: 30, bottom: 50, left: 40 };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const getFilteredLineData = () => {
    const baseData = lineSeriesData();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - dateWindow);

    const filteredData = {};
    Object.keys(baseData).forEach((exercise) => {
      filteredData[exercise] = baseData[exercise]
        .filter((dataPoint) => dataPoint.date >= cutoffDate)
        .sort((a, b) => a.date.getTime() - b.date.getTime());
    });
    return filteredData;
  };

  const getDefaultSelectedExercises = (data) => {
    return Object.keys(data).slice(0, 2);
  };

  // EXERCISE DATA
  // const lineData = lineSeriesData();
  const lineData = getFilteredLineData();
  const allData = Object.values(lineData).flat();
  const [exercises, setExercises] = useState<string[]>(Object.keys(lineData));
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const maxSelections = 5;

  const xDomain = extent(allData, (d) => (d as any).date) as [Date, Date];
  const yDomain = [0, max(allData, (d) => (d as any).value) as number];

  // data accessors
  const getX = (d: DateValue) => d.date;
  const getY = (d: DateValue) => d.value;

  // scales
  const xScale = scaleTime<number>({
    domain: extent(allData, getX) as [Date, Date],
    // domain: [allData.flatMap((date, _) => date)],
  });
  const yScale = scaleLinear<number>({
    domain: [0, max(allData, getY) as number],
  });

  xScale.domain(xDomain);
  yScale.domain(yDomain);
  const ordinalColorScale = scaleOrdinal({
    // domain: Object.keys(lineData),
    domain: selectedExercises,
    range: ["#66d981", "#71f5ef", "#4899f1", "#7d81f6"],
  });

  // update scale output ranges
  // xScale.range([0, width - 50]);
  // yScale.range([lineHeight - 5, 5]);
  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  const dateRange = (lineData[0] ? lineData[0] : []).map((item) =>
    item.date.toDateString()
  );

  // Date Window Select
  const handleDateWindowChange = (e) => {
    setDateWindow(e.target.value);
    // TODO - update the graph with data points that fall within this window
    // Get today's date, subtract event value, filter the data points, set state
  };

  // Exercises Multi Select
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const handleExerciseSelectionChange = (
    event: SelectChangeEvent<typeof selectedExercises>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedExercises(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  function getStyles(name: string, selectedExercises: readonly string[]) {
    return {
      fontWeight: selectedExercises.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  }

  // POSITIONS
  const left = 30;
  const bottomAxisTicks = () => (dateWindow > 60 ? 10 : 5);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="exercises-and-weight-line-graph"
        style={{
          backgroundColor: theme.palette.background.main,
          width: 1000,
          height: 800,
          padding: 50,
          borderRadius: 50,
        }}
      >
        <StyledSectionHeading variant="h4">
          Progressive Overload
        </StyledSectionHeading>
        <LegendDemo title="Exercises">
          <LegendOrdinal scale={ordinalColorScale}></LegendOrdinal>
        </LegendDemo>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <InputLabel id="exercises-multiselect">Exercises</InputLabel>
            <Select
              labelId="exercises-multiselect"
              id="exercises-multiselect-label"
              multiple
              value={selectedExercises}
              onChange={handleExerciseSelectionChange}
              input={
                <OutlinedInput
                  id="exercises-multiselect-chip"
                  label="Exercises"
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {Object.keys(lineData).map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, selectedExercises)}
                  disabled={
                    selectedExercises.length >= maxSelections &&
                    !selectedExercises.includes(name)
                  }
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <InputLabel id="date-window-select-label">Date Range</InputLabel>
            <Select
              labelId="date-window-select"
              id="date-window-select"
              value={dateWindow}
              label="Age"
              onChange={handleDateWindowChange}
            >
              <MenuItem value={30}>Last 30 Days (1 month)</MenuItem>
              <MenuItem value={60}>Last 60 Days (2 months)</MenuItem>
              <MenuItem value={90}>Last 90 Days (3 months)</MenuItem>
              <MenuItem value={180}>Last 180 days (6 months)</MenuItem>
            </Select>
            <br />
          </div>
        </div>
        <svg width={800} height={600}>
          <rect x={0} y={0} width={width} height={height} rx={14} />
          <AxisBottom
            left={left}
            top={450}
            scale={xScale}
            numTicks={bottomAxisTicks()}
            stroke="white"
            tickStroke="white"
            tickLabelProps={{ fill: "white" }}
          />
          <AxisLeft
            top={40}
            left={left}
            scale={yScale}
            stroke="white"
            tickStroke="white"
            tickLabelProps={{ fill: "white" }}
          />
          <text
            x="-70"
            y="50"
            transform="rotate(-90)"
            fontSize={10}
            fill="white"
          >
            Weight (lbs)
          </text>
          <text x="730" y="430" fontSize={10} fill="white">
            Date
          </text>
          <MarkerCircle id="marker-circle" fill="#fff" size={2} refX={2} />
          {width > 8 &&
            // Object.keys(lineData).map((exerciseName, i) => {
            selectedExercises.map((exerciseName, i) => {
              const exerciseData = lineData[exerciseName] || [];
              return (
                <Group key={`lines-${i}`} top={margin.top} left={left + 1}>
                  <LinePath<DateValue>
                    curve={allCurves[curveType]}
                    data={exerciseData}
                    x={(d) => xScale(getX(d)) ?? 0}
                    y={(d) => yScale(getY(d)) ?? 0}
                    stroke={ordinalColorScale(exerciseName)}
                    strokeWidth={2}
                    markerMid="url(#marker-circle)"
                    markerStart="url(#marker-circle)"
                    markerEnd="url(#marker-circle)"
                    shapeRendering="geometricPrecision"
                  />
                </Group>
              );
            })}
        </svg>

        <style>{`
        .visx-curves-demo label {
          font-size: 12px;
        }
      `}</style>
      </div>
    </ThemeProvider>
  );
}

// console.log(`EXERCISES = ${exercises}`);
// console.log(`DATE WINDOWS - ${exerciseData[0]}`);
// console.log(`Exercise ${i}: ${exerciseName}`);
// console.log(`- Data points: ${exerciseData.length}`);
// console.log(` - Top position: ${i * lineHeight}`);
// console.log(`- Color ${ordinalColorScale(exerciseName)}`);
// let lineData = lineSeriesData() || [];
// let lineData: [DateValue] = exerciseWeightsOverTime[exercise] || [];
// console.log("Line Data", exerciseWeightsOverTime[exercise]);
// series.map((data) => console.log("Series", data));
{
  /* <line x1={20} x2={20} y1={10} y2={yMax} stroke="#e0e0e0" /> */
}
{
  /* {exerciseData.map((d, j) => (
                  <circle
                    key={i + j}
                    r={3}
                    cx={xScale(getX(d))}
                    cy={yScale(getY(d))}
                    stroke="white"
                    fill="white"
                  />
                ))} */
}
{
  /* {exerciseData.length === 1 ? (
                  // Draw a circle for single data point
                  <circle
                    cx={xScale(getX(exerciseData[0]))}
                    cy={yScale(getY(exerciseData[0]))}
                    r={3}
                    fill={ordinalColorScale(exerciseName)}
                  />
                ) : ( */
}
{
  /* )} */
}
{
  /* &nbsp;
          <select
          // TODO Multi Select Chip for multiple exercises
          // TODO Dropdown where you can select multiple exercises and maybe the top panel shows
          // either the 3-5 selected exercises or the count of the selected exercises
          // onChange={(e) => setExercises((prev) => [...prev, e.target.value])}
          // value={exercises}
          >
            {Object.keys(lineData).map((exercise) => (
              <option key={exercise} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>
        </label>
        &nbsp; */
}

// OLD FUNCTIONS
// const curveTypes = Object.keys(allCurves);
// const exercises: string[] = [
//   "Squat",
//   "Deadlift",
//   "Bench Press",
//   "Front Rack Backward Lunge",
// ];

// Series is an array of length lineCount, where each element is of type
// DateValue which means it has a date and a time. Ok.
// The function genDateValue generates a date value, but I want to use my
// own data so I can just create objects using the DateValue interface.
// const lineCount = exercises.length;

// const series = new Array(lineCount).fill(null).map((_, i) =>
//   // vary each series value deterministically
//   generateDateValue(25, /* seed= */ i / 72).sort(
//     (a: DateValue, b: DateValue) => a.date.getTime() - b.date.getTime()
//   )
// );
// const allData = series.reduce((rec, d) => rec.concat(d), []);
// console.log("Series", series[0]);

// now for some data manipulation to create the dates
// const dateRange = exerciseWeightsOverTime["Squat"].map((item) =>
//   item.date.toDateString()
// );
// // console.log("Getting dates", dateRange);
// const dateScale = scaleBand<string>({
//   domain: dateRange,
//   padding: 0.2,
// });

// defining a named tuple array in typescript, ? means optional
// interface ExerciseWeights {
//   [exercise: string]: DateValue;
// }

// Todo - for AxisBottom
// const parseDate = timeParse("%Y-%m-%d");
// const format = timeFormat("%b %d");
// const formatDate = (date: string) => format(parseDate(date) as Date);
// // accessors
// const getDate = (d: CityTemperature) => d.date;
// // scales
// const dateScale = scaleBand<string>({
//   domain: data.map(getDate),
//   padding: 0.2,
// });

// LinePath takes data of type DateValue - which means the date is a Date, and
// the value is a number. That fits the data I want so I can use DateValue too.
// Now let's make my series data look like the series data in the example.

// LinePath - the values are plotted, not the dates.

// const values = generateDateValue(25, 1 / 72).sort(
//   (a: DateValue, b: DateValue) => a.date.getTime() - b.date.getTime()
// );
// const values2 = generateDateValue(25).sort(
//   (a: DateValue, b: DateValue) => a.date.getTime() - b.date.getTime()
// );
// const exerciseWeightsOverTime = {
//   Squat: values,
//   Deadlift: values2,
//   "Bench Press": values,
// };
// const dateRange = exerciseWeightsOverTime["Squat"].map((item) => ...)

// TEST DATA
// accessors
// const date = (d: CityTemperature) => new Date(d.date).valueOf();
// const ny = (d: CityTemperature) => Number(d["New York"]);
// const sf = (d: CityTemperature) => Number(d["San Francisco"]);
// scales
// const timeScale = scaleTime<number>({
//   domain: [
//     Math.min(...cityTemperature.map(date)),
//     Math.max(...cityTemperature.map(date)),
//   ],
// });
// const temperatureScale = scaleLinear<number>({
//   domain: [
//     Math.min(...cityTemperature.map((d) => Math.min(ny(d), sf(d)))),
//     Math.max(...cityTemperature.map((d) => Math.max(ny(d), sf(d)))),
//   ],
//   nice: true,
// });
// const margin = { top: 40, right: 0, bottom: 0, left: 0 };
// const yMax = height - margin.top - 100;

// timeScale.range([0, xMax]);
// temperatureScale.range([yMax, 0]);

// console.log("Getting dates", dateRange);
// const dateScale = scaleBand<string>({
//   domain: dateRange,
//   padding: 0.2,
// });
//   const svgHeight = showControls ? height - 40 : height;
// const lineHeight = svgHeight / Object.keys(lineData).length;
// const lineHeight = 150;
