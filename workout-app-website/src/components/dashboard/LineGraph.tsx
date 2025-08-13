import React, { useEffect } from "react";
import { useState } from "react";
import { extent, max } from "@visx/vendor/d3-array";
import * as allCurves from "@visx/curve";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { scaleTime, scaleLinear, scaleOrdinal, scaleBand } from "@visx/scale";
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
import { AxisBottom } from "@visx/axis";

type CurveType = keyof typeof allCurves;

const curveTypes = Object.keys(allCurves);
const exercises: string[] = [
  "Squat",
  "Deadlift",
  "Bench Press",
  "Front Rack Backward Lunge",
];

// Series is an array of length lineCount, where each element is of type
// DateValue which means it has a date and a time. Ok.
// The function genDateValue generates a date value, but I want to use my
// own data so I can just create objects using the DateValue interface.
const lineCount = exercises.length;
const series = new Array(lineCount).fill(null).map((_, i) =>
  // vary each series value deterministically
  generateDateValue(25, /* seed= */ i / 72).sort(
    (a: DateValue, b: DateValue) => a.date.getTime() - b.date.getTime()
  )
);
const allData = series.reduce((rec, d) => rec.concat(d), []);
// console.log("Series", series[0]);

// data accessors
const getX = (d: DateValue) => d.date;
const getY = (d: DateValue) => d.value;

// scales
const xScale = scaleTime<number>({
  domain: extent(allData, getX) as [Date, Date],
});
const yScale = scaleLinear<number>({
  domain: [0, max(allData, getY) as number],
});

export type CurveProps = {
  width: 800;
  height: 500;
  showControls?: boolean;
  workoutList: any[];
};

const values = generateDateValue(25, 1 / 72).sort(
  (a: DateValue, b: DateValue) => a.date.getTime() - b.date.getTime()
);
const values2 = generateDateValue(25).sort(
  (a: DateValue, b: DateValue) => a.date.getTime() - b.date.getTime()
);

// defining a named tuple array in typescript, ? means optional
interface ExerciseWeights {
  [exercise: string]: DateValue;
}

// How do I create an object of type DateValue without generating it?
const exerciseWeightsOverTime = {
  Squat: values,
  Deadlift: values2,
  "Bench Press": values,
};

const ordinalColorScale = scaleOrdinal({
  domain: exercises,
  range: ["#66d981", "#71f5ef", "#4899f1", "#7d81f6"],
});

// now for some data manipulation to create the dates
const dateRange = exerciseWeightsOverTime["Squat"].map((item) =>
  item.date.toDateString()
);
// console.log("Getting dates", dateRange);
const dateScale = scaleBand<string>({
  domain: dateRange,
  padding: 0.2,
});

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

export default function LineGraph({
  width,
  height,
  showControls = true,
  workoutList = [],
}: CurveProps) {
  const [curveType, setCurveType] = useState<CurveType>("curveNatural");
  const [showPoints, setShowPoints] = useState<boolean>(true);
  const svgHeight = showControls ? height - 40 : height;
  const lineHeight = svgHeight / lineCount;

  useEffect(() => {
    console.log("===Use Effect: Line Graph===");
    console.log("Workout List from DB - ", workoutList);
    console.log("Dummy chart data - ", exerciseWeightsOverTime);
  });

  // update scale output ranges
  xScale.range([0, width - 50]);
  yScale.range([lineHeight - 2, 0]);

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
            font-family: arial;
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

  const margin = { top: 40, right: 0, bottom: 0, left: 0 };
  const yMax = height - margin.top - 100;
  const purple3 = "#a44afe";

  // chart data shape =
  // {exerciseName: array[date, value]}
  // get completed workouts, get exercise data
  // we want date and max value - so
  const chartData = () => {
    const completedWorkouts = workoutList.filter(
      (workout) => workout.status === "Completed"
    );
    const exerciseData = {};
    completedWorkouts.forEach((workout) => {
      const workoutDate = new Date(workout.dateOfWorkout);
    });
  };

  return (
    <div
      className="exercises-and-weight-line-graph"
      style={{
        backgroundColor: "#faf2e1",
        width: 800,
        height: 800,
      }}
    >
      <StyledSectionHeading variant="h4">
        Progressive Overload
      </StyledSectionHeading>
      <LegendDemo title="Exercises">
        <LegendOrdinal scale={ordinalColorScale}></LegendOrdinal>
      </LegendDemo>
      <svg width={800} height={600}>
        <MarkerCircle id="marker-circle" fill="#333" size={2} refX={2} />
        {width > 8 &&
          exercises.map((exercise, i) => {
            let lineData: [DateValue] = exerciseWeightsOverTime[exercise] || [];
            // console.log("Line Data", exerciseWeightsOverTime[exercise]);
            // series.map((data) => console.log("Series", data));
            return (
              <Group key={`lines-${i}`} top={i * lineHeight} left={13}>
                <LinePath<DateValue>
                  curve={allCurves[curveType]}
                  data={lineData}
                  x={(d) => xScale(getX(d)) ?? 0}
                  y={(d) => yScale(getY(d)) ?? 0}
                  stroke={ordinalColorScale(exercise)}
                  strokeWidth={2}
                  shapeRendering="geometricPrecision"
                  markerMid="url(#marker-circle)"
                />
              </Group>
            );
          })}
        <AxisBottom
          top={yMax + margin.top}
          scale={dateScale}
          // tickFormat={formatDate}
          stroke={purple3}
          tickStroke={purple3}
          tickLabelProps={{
            fill: purple3,
            fontSize: 11,
            textAnchor: "middle",
          }}
        />
      </svg>

      <style>{`
        .visx-curves-demo label {
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}
