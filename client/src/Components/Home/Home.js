import React, { useRef, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import SubjectIcon from "@material-ui/icons/Subject";
import AssignmentIcon from "@material-ui/icons/Assignment";
// import Link from "@material-ui/core/Link";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./Home.css";
export default function Home(props) {
  const reloadHandler = (event) => {
    event.preventDefault();
  };

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

  let courseUI;
  let cqExamUI;
  let mcqExamUI;

  // console.log("Userinfo", userInfo);

  if (props.userInfo) {
    if (props.userInfo.courses)
      courseUI = props.userInfo.courses.map((course, k) => {
        // console.log(items);
        return (
          <Grid key={k} container alignItems="flex-start">
            <Grid item>
              <SubjectIcon />
            </Grid>
            <Grid item>
              <Link to={`/course/${course.course._id}`}>
                <p>{course.course.name}</p>
              </Link>

              {/* <Link
                onClick={reloadHandler}
                href={`/course/${course.course._id}`}
              >
                <p>{course.course.name}</p>
              </Link> */}
            </Grid>
          </Grid>
        );
      });

    cqExamUI = props.userInfo.courses.map((course, i) => {
      return course.course.cqExams.map((exam, j) => {
        console.log("EXAM", exam);
        return (
          <Grid key={i + j} container alignItems="flex-start">
            <Grid item>
              <SubjectIcon />
            </Grid>
            <Grid item>
              <Link to={`/exam/${exam.examId._id}`}>
                <p>{exam.examId.name}</p>
              </Link>
            </Grid>
          </Grid>
        );
      });
    });

    mcqExamUI = props.userInfo.courses.map((course, i) => {
      return course.course.mcqExams.map((exam, j) => {
        console.log("EXAM", exam);
        return (
          <Grid key={i + j} container alignItems="flex-start">
            <Grid item>
              <SubjectIcon />
            </Grid>
            <Grid item>
              <Link to={`/exam/${exam.examId._id}`}>
                <p>{exam.examId.name}</p>
              </Link>
            </Grid>
          </Grid>
        );
      });
    });
  }

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
          <div>{mcqExamUI}</div>
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
          <div>{cqExamUI}</div>
        </Grid>
      </Grid>
    </Container>
  );
}
