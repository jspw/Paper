import React, { useRef, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import SubjectIcon from "@material-ui/icons/Subject";
import AssignmentIcon from "@material-ui/icons/Assignment";
import "./Home.css";
export default function Home(props) {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  let interval = useRef();

  const timer = () => {
    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const deadline = new Date("January 31, 2021 00:00:00").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = deadline - now;
      if (timeLeft < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(Math.floor(timeLeft / days));
        setTimerHours(Math.floor((timeLeft % days) / hours));
        setTimerMinutes(Math.floor((timeLeft % hours) / minutes));
        setTimerSeconds(Math.floor((timeLeft % minutes) / seconds));
      }
    }, 1000);
  };
  useEffect(() => {
    timer();
    return () => {
      clearInterval(interval.current);
    };
  });
  // console.log(values.hoursLeft)

  // let coursesUI = [];

  // const courseUI = (courseName) => {
  //   <Grid container alignItems="flex-start">
  //     <Grid item>
  //       <SubjectIcon />
  //     </Grid>
  //     <Grid item>
  //       <p>{courseName}</p>
  //     </Grid>
  //   </Grid>;
  // };

  // if (props.userInfo) {
  //   props.userInfo.courses.forEach(function (course) {
  //     // console.log("Course", course);
  //     coursesUI.push(courseUI(course.name));
  //   });
  // }

  let courseUI;

  if (props.userInfo)
    courseUI = props.userInfo.courses.map((course, i) => {
      // console.log(items);
      return (
        <Grid container alignItems="flex-start">
          <Grid item>
            <SubjectIcon />
          </Grid>
          <Grid item>
            <p>{course.course.name}</p>
          </Grid>
        </Grid>
      );
    });

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm>
          <h5>My Courses</h5>
          <hr />
          <div>{courseUI}</div>
        </Grid>
        <Grid item xs={12} sm={5}>
          <h5>Upcoming Exams</h5>
          <hr />
          <h6>Exam Name</h6>
          <div className="timer-container">
            <ul>
              <li>
                <span id="days">{timerDays}</span> Days
              </li>
              <li>
                <span id="hours">{timerHours}</span> Hours
              </li>
              <li>
                <span id="minutes">{timerMinutes}</span> Minutes
              </li>
              <li>
                <span id="seconds">{timerSeconds}</span> Seconds
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12} sm>
          <h5>Previous Exams</h5>
          <hr />
          <div>
            <Grid container alignItems="flex-start">
              <Grid item>
                <AssignmentIcon />
              </Grid>
              <Grid item>
                <p>Exam Name</p>
              </Grid>
            </Grid>
            <Grid container alignItems="flex-start">
              <Grid item>
                <AssignmentIcon />
              </Grid>
              <Grid item>
                <p>Exam Name</p>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
