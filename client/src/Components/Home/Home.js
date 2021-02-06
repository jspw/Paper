import React, { useRef, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import SubjectIcon from "@material-ui/icons/Subject";
import AssignmentIcon from "@material-ui/icons/Assignment";
// import Link from "@material-ui/core/Link";
import Timer from "../Timer/Timer";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./Home.css";
export default function Home(props) {
  const reloadHandler = (event) => {
    event.preventDefault();
  };

  let courseUI;
  let cqExamUI;
  let mcqExamUI;

  console.log("UserInfo", props.userInfo);

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
              <Link to={`/upcoming-exam/${exam.examId._id}`}>
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
              <Link to={`/previous-exam/${exam.examId._id}`}>
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
          {/* <div>{mcqExamUI}</div> */}
          <div>{cqExamUI}</div>
          <Timer deadline={new Date("Sun Feb 28 2021 00:00:00")} />
        </Grid>
        <Grid item xs={12} sm>
          <h5>Previous Exams</h5>
          <hr />
          {/* <div>{cqExamUI}</div> */}
          <div>{mcqExamUI}</div>
        </Grid>
      </Grid>
    </Container>
  );
}
