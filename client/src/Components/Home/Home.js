import React, { useRef, useState, useEffect } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SubjectIcon from "@material-ui/icons/Subject";
import { HiClipboard } from "react-icons/hi";
import AssignmentIcon from "@material-ui/icons/Assignment";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
// import Link from "@material-ui/core/Link";
import Timer from "../Timer/Timer";
import { BrowserRouter as Router, Link } from "react-router-dom";
import LinearIndeterminate from "../Generic/Loader";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Forms from "../Generic/Forms";
import { makeStyles } from "@material-ui/core/styles";
import "./Home.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    // margin: theme.spacing(1),
  },
  textField: {
    // width: "15vw",
    // margin: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  shadows: ["none"],
}));

export default function Home(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  const [values, setValues] = useState({
    courseName: "",
    courseCode: "",
    university: "",
    department: "",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
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
          <Grid
            key={k}
            container
            alignitems="flex-start"
            className="sideExams"
          >
            <Grid item>
              <SubjectIcon style={{ fontSize: "27px" }} />
            </Grid>
            <Grid item xs className="examName">
              <Link
                to={`/course/${course.course._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>{course.course.name}</span>
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
          // if (
          //   new Date(exam.examId.date).getTime() > date.getTime() &&
          //   new Date(exam.examId.date).getTime() <
          //     date.getTime() + exam.examId.totalTime * 60
          // )
          //   upcomingExams.push({
          //     _id: exam.examId._id,
          //     name: exam.examId.name,
          //     date: new Date(exam.examId.date),
          //   });
          // else if (
          //   new Date(exam.examId.date).getTime() >
          //   date.getTime() + exam.examId.totalTime * 60
          // )
          //   upcomingExams.push({
          //     _id: exam.examId._id,
          //     name: exam.examId.name,
          //     date: new Date(exam.examId.date),
          //   });
          // else
          if (
            new Date(exam.examId.date).getTime() + exam.examId.totalTime * 60 <
            date.getTime()
          )
            previousExams.push({
              _id: exam.examId._id,
              name: exam.examId.name,
              date: new Date(exam.examId.date),
            });
          else {
            upcomingExams.push({
              _id: exam.examId._id,
              name: exam.examId.name,
              date: new Date(exam.examId.date),
            });
          }
        });
      }
    });

    upcomingExams.sort(function (a, b) {
      return a.date.getTime() - b.date.getTime();
    });
    previousExams.sort(function (a, b) {
      return b.date.getTime() - a.date.getTime();
    });

    ongoingExams.sort(function (a, b) {
      return a.date.getTime() - b.date.getTime();
    });

    const reloadHandler = (event) => {
      event.preventDefault();
    };
    let examSchedule;
    if (upcomingExams.length > 0) {
      examSchedule = `${
        new Date(upcomingExams[0].date).getHours() < 10
          ? "0" + new Date(upcomingExams[0].date).getHours()
          : new Date(upcomingExams[0].date).getHours()
      }:${
        new Date(upcomingExams[0].date).getMinutes() < 10
          ? "0" + new Date(upcomingExams[0].date).getMinutes()
          : new Date(upcomingExams[0].date).getMinutes()
      }
      ${new Date(upcomingExams[0].date).getDate()}th ${
        months[new Date(upcomingExams[0].date).getMonth()]
      },
      ${new Date(upcomingExams[0].date).getFullYear()}`;

      mostUpcomingExamUI = (
        <Container fluid key={upcomingExams[0]._id} alignitems="flex-start">
          <Row className="examHeading d-flex justify-content-between">
            <Col xs="auto">
              <span className="examName">
                <b>{upcomingExams[0].name}</b>
              </span>
            </Col>
            <Col xs="auto" className="examSchedule">
              <p>{examSchedule}</p>
            </Col>
          </Row>
          <Row className="infos">
            <Col>
              <span>Course: SWE111</span>
            </Col>
          </Row>
          <Row className="infos">
            <Col>
              <p>Host: Teacher Name</p>
            </Col>
          </Row>
          <Row className="infos">
            <Col>
              <span>Total Marks: 20</span>
            </Col>
          </Row>
          <Row className="infos">
            <Col>
              <span>Total Time: 20mins</span>
            </Col>
          </Row>
        </Container>
      );
      upcomingExamsUI = upcomingExams.map((ex, i) => {
        if (i != 0)
          return (
            <Container
              fluid
              key={ex._id}
              alignitems="flex-start"
              className="upcoming__next"
            >
              {/*               <Grid item>
                  <SubjectIcon />
                </Grid> */}
              <Link to={`/upcoming-exam/${ex._id}`}>
                <Row className="examHeading d-flex justify-content-between">
                  <Col xs="auto">
                    <span className="examName">
                      <b>{ex.name}</b>
                    </span>
                  </Col>
                  <Col xs="auto" className="examSchedule">
                    <p>
                      {new Date(ex.date).getHours() < 10
                        ? "0" + new Date(ex.date).getHours()
                        : new Date(ex.date).getHours()}
                      :
                      {new Date(ex.date).getMinutes() < 10
                        ? "0" + new Date(ex.date).getMinutes()
                        : new Date(ex.date).getMinutes()}{" "}
                      {new Date(ex.date).getDate()}
                      th {months[new Date(ex.date).getMonth()]},
                      {new Date(ex.date).getFullYear()}
                    </p>
                  </Col>
                </Row>
              </Link>
            </Container>
          );
      });
    }

    if (previousExams)
      previousExamsUI = previousExams.map((ex, i) => {
        return (
          <Grid
            key={ex._id}
            container
            alignitems="flex-start"
            className="sideExams"
          >
            <Grid item>
              <AssignmentTurnedInOutlinedIcon style={{ fontSize: "27px" }} />
            </Grid>
            <Grid item xs className="examName">
              <Link
                to={`/previous-exam/${ex._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>{ex.name}</span>
              </Link>
            </Grid>
            <Grid item >
              <p>
                {new Date(ex.date).getHours() < 10
                  ? "0" + new Date(ex.date).getHours()
                  : new Date(ex.date).getHours()}
                :
                {new Date(ex.date).getMinutes() < 10
                  ? "0" + new Date(ex.date).getMinutes()
                  : new Date(ex.date).getMinutes()}{" "}
                {new Date(ex.date).getDate()}
                th {months[new Date(ex.date).getMonth()]},
                {new Date(ex.date).getFullYear()}
              </p>
            </Grid>
          </Grid>
        );
      });
  }
  if (props.userInfo){
    const role = props.userInfo.role;
    // console.log(role)
    return (
      <Container fluid style={{ marginTop: "10px", height: "100vh" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm md className="side" style={{ float: "left" }}>
            <Grid container justify="space-between">
              <Grid item>
                <h5>My Courses</h5>
              </Grid>
              {role !== "Student" ? (
                <Grid item>
                  <Button
                    color="default"
                    startIcon={<AddIcon />}
                    onClick={handleClickOpen}
                  >
                    Create Course
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      Create New Course
                    </DialogTitle>
                    <DialogContent>
                      <Forms
                        id="university"
                        type="select"
                        label="University"
                        labelWidth={117}
                        classes={classes}
                        values={values.university}
                        handleChange={handleChange}
                      />
                      <Forms
                        selectedUniversity={values.university}
                        id="department"
                        type="select"
                        label="Department"
                        labelWidth={117}
                        classes={classes}
                        values={values.department}
                        handleChange={handleChange}
                      />
                      <Forms
                        id="courseName"
                        type="text"
                        label="Course Name"
                        labelWidth={78}
                        classes={classes}
                        values={values.firstName}
                        handleChange={handleChange}
                        required={false}
                      />
                      <Forms
                        id="courseCode"
                        type="text"
                        label="Course Code"
                        labelWidth={78}
                        classes={classes}
                        values={values.firstName}
                        handleChange={handleChange}
                        required={false}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="default">
                        Cancel
                      </Button>
                      <Button onClick={handleClose} color="primary">
                        Create
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              ) : null}
            </Grid>
            <Grid item>
              <hr />
            </Grid>
            {courseUI}
          </Grid>
          <Grid item xs={12} sm md={5} className="upcoming">
            <Grid container justify="space-between" alignitems="flex-start">
              <Grid item>
                <h5>Upcoming Exams</h5>
              </Grid>
              <Grid item>
                <InfoOutlinedIcon style={{ fontSize: "35px" }} />
              </Grid>
            </Grid>
            <Grid item>
              <hr />
            </Grid>
            <div className="upcoming__first">
              {mostUpcomingExamUI}
              <Timer
                deadline={upcomingExams.length > 0 ? upcomingExams[0].date : ""}
              />
            </div>
            <div>{upcomingExamsUI}</div>
          </Grid>
          <Grid item xs={12} sm md className="side">
            <Grid container justify="space-between" alignitems="flex-start">
              <Grid item>
                <h5>Previous Exams</h5>
              </Grid>
            </Grid>
            <Grid item>
              <hr />
            </Grid>
            {previousExamsUI}
          </Grid>
        </Grid>
      </Container>
    );
  }
  else return <LinearIndeterminate />;
}
