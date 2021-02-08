import React, { useRef, useState, useEffect } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import SubjectIcon from "@material-ui/icons/Subject";
import AssignmentIcon from "@material-ui/icons/Assignment";
// import Link from "@material-ui/core/Link";
import Timer from "../Timer/Timer";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./Home.css";
export default function Home(props) {
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let courseUI;
  let upcomingExams = [];
  let upcomingExamsUI;
  let mostUpcomingExamUI;
  let previousExams = [];
  let previousExamsUI;
  let ongoingExams = [];

  const [timerDeadline, setTimerDeadLine] = useState(Date.now());

  if (props.userInfo) {
    if (props.userInfo.courses) {
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
            </Grid>
          </Grid>
        );
      });
    }

    props.userInfo.courses.forEach((course, i) => {
      const date = new Date();

      if (course.course.cqExams) {
        course.course.cqExams.forEach((exam, j) => {
          if (
            new Date(exam.examId.date).getTime() >
            date.getTime() + exam.examId.totalTime * 60
          ) {
            ongoingExams.push({
              _id: exam.examId._id,
              name: exam.examId.name,
              date: new Date(exam.examId.date),
            });
          } else if (
            new Date(exam.examId.date).getTime() >
            date.getTime() + exam.examId.totalTime * 60
          ) {
            upcomingExams.push({
              _id: exam.examId._id,
              name: exam.examId.name,
              date: new Date(exam.examId.date),
            });
          } else
            course.course.cqExams.forEach((exam, j) => {
              if (new Date(exam.examId.date).getTime() < date.getTime()) {
                previousExams.push({
                  _id: exam.examId._id,
                  name: exam.examId.name,
                  date: new Date(exam.examId.date),
                });
              }
            });
        });
      }

      if (course.course.mcqExams) {
        course.course.mcqExams.forEach((exam, j) => {
          if (
            new Date(exam.examId.date).getTime() > date.getTime() &&
            new Date(exam.examId.date).getTime() <
              date.getTime() + exam.examId.totalTime * 60
          )
            ongoingExams.push({
              _id: exam.examId._id,
              name: exam.examId.name,
              date: new Date(exam.examId.date),
            });
          else if (
            new Date(exam.examId.date).getTime() >
            date.getTime() + exam.examId.totalTime * 60
          )
            upcomingExams.push({
              _id: exam.examId._id,
              name: exam.examId.name,
              date: new Date(exam.examId.date),
            });
          else if (new Date(exam.examId.date).getTime() < date.getTime())
            previousExams.push({
              _id: exam.examId._id,
              name: exam.examId.name,
              date: new Date(exam.examId.date),
            });
        });
      }
    });

    upcomingExams.sort(function (a, b) {
      return a.date.getTime() - b.date.getTime();
    });
    previousExams.sort(function (a, b) {
      return a.date.getTime() - b.date.getTime();
    });

    ongoingExams.sort(function (a, b) {
      return a.date.getTime() - b.date.getTime();
    });

    const reloadHandler = (event) => {
      event.preventDefault();
    };

    mostUpcomingExamUI = (
      <Grid key={upcomingExams[0]._id} container alignItems="flex-start">
        <Grid item>
          <SubjectIcon />
        </Grid>
        <Grid item>
          <Link to={`/upcoming-exam/${upcomingExams[0]._id}`}>
            <p>
              <p>
                {upcomingExams[0].name} [
                {new Date(upcomingExams[0].date).getHours() < 10
                  ? "0" + new Date(upcomingExams[0].date).getHours()
                  : new Date(upcomingExams[0].date).getHours()}
                :
                {new Date(upcomingExams[0].date).getMinutes() < 10
                  ? "0" + new Date(upcomingExams[0].date).getMinutes()
                  : new Date(upcomingExams[0].date).getMinutes()}{" "}
                {new Date(upcomingExams[0].date).getDate()}
                th {months[new Date(upcomingExams[0].date).getMonth()]},
                {new Date(upcomingExams[0].date).getFullYear()} (
                {days[new Date(upcomingExams[0].date).getDay()]}) ]
              </p>
            </p>
          </Link>
        </Grid>
      </Grid>
    );
    // console.log(upcomingExams[0]);

    upcomingExamsUI = upcomingExams.map((ex, i) => {
      if (i != 0)
        return (
          <Grid key={ex._id} container alignItems="flex-start">
            <Grid item>
              <SubjectIcon />
            </Grid>
            <Grid item>
              <Link to={`/upcoming-exam/${ex._id}`}>
                <p>
                  {ex.name} [
                  {new Date(ex.date).getHours() < 10
                    ? "0" + new Date(ex.date).getHours()
                    : new Date(ex.date).getHours()}
                  :
                  {new Date(ex.date).getMinutes() < 10
                    ? "0" + new Date(ex.date).getMinutes()
                    : new Date(ex.date).getMinutes()}{" "}
                  {new Date(ex.date).getDate()}
                  th {months[new Date(ex.date).getMonth()]},
                  {new Date(ex.date).getFullYear()} (
                  {days[new Date(ex.date).getDay()]}) ]
                </p>
              </Link>
            </Grid>
          </Grid>
        );
    });

    // props.userInfo.courses.forEach((course, i) => {
    //   const date = new Date();

    //   if (course.course.cqExams)
    //     course.course.cqExams.forEach((exam, j) => {
    //       if (new Date(exam.examId.date).getTime() < date.getTime())
    //         previousExams.push({
    //           _id: exam.examId._id,
    //           name: exam.examId.name,
    //           date: new Date(exam.examId.date),
    //         });
    //     });

    //   if (course.course.mcqExams)
    //     course.course.mcqExams.forEach((exam, j) => {
    //       if (new Date(exam.examId.date).getTime() < date.getTime())
    //         previousExams.push({
    //           _id: exam.examId._id,
    //           name: exam.examId.name,
    //           date: new Date(exam.examId.date),
    //         });
    //     });
    // });

    previousExamsUI = previousExams.map((ex, i) => {
      return (
        <Grid key={ex._id} container alignItems="flex-start">
          <Grid item>
            <SubjectIcon />
          </Grid>
          <Grid item>
            <Link to={`/previous-exam/${ex._id}`}>
              <p>
                {ex.name} [
                {new Date(ex.date).getHours() < 10
                  ? "0" + new Date(ex.date).getHours()
                  : new Date(ex.date).getHours()}
                :
                {new Date(ex.date).getMinutes() < 10
                  ? "0" + new Date(ex.date).getMinutes()
                  : new Date(ex.date).getMinutes()}{" "}
                {new Date(ex.date).getDate()}
                th {months[new Date(ex.date).getMonth()]},
                {new Date(ex.date).getFullYear()} (
                {days[new Date(ex.date).getDay()]}) ]
              </p>
            </Link>
          </Grid>
        </Grid>
      );
    });
  }
  if (props.userInfo)
    return (
      <Container style={{ marginTop: "10px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm>
            <h5>My Courses</h5>
            <hr />
            <div>{courseUI}</div>
          </Grid>
          <Grid item xs={12} sm={5}>
            <h5>Upcoming Exams</h5>
            <hr />
            {mostUpcomingExamUI}
            <Timer deadline={upcomingExams[0].date} />
            <div>{upcomingExamsUI}</div>
          </Grid>
          <Grid item xs={12} sm>
            <h5>Previous Exams</h5>
            <hr />
            {previousExamsUI}
          </Grid>
        </Grid>
      </Container>
    );
  else return <CircularProgress />;
}
