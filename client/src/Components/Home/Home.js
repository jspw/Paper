import React, { useState, useEffect } from "react";
import { Grid, Snackbar, TextField } from "@material-ui/core";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SubjectIcon from "@material-ui/icons/Subject";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import Timer from "../Timer/Timer";
import { Link } from "react-router-dom";
import LinearIndeterminate from "../Generic/Loader";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Forms from "../Generic/Forms";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import "./Home.scss";
import axios from "axios";
// import Alert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  let userdata;
  userdata = localStorage.getItem("data");
  userdata = JSON.parse(userdata);

  const [open, setOpen] = React.useState(false);

  let history = useHistory();
  const [opensnack, setopensnack] = React.useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  const [snackbarMsg, setsnackbarMsg] = useState(null);

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setopensnack(false);
  };

  const createCourse = () => {
    // const dept = document.getElementById("department").innerHTML);

    if (
      values.university &&
      values.department &&
      values.courseCode &&
      values.courseName
    ) {
      axios({
        method: "POST",
        url: `teacher/course/create`,

        headers: { "Content-Type": "application/json" },

        data: JSON.stringify({
          name: values.courseName,
          code: values.courseCode,
          department: {
            name: `${document.getElementById("department").innerHTML}`,
            id: values.department,
          },
          varsity: {
            name: `${document.getElementById("university").innerHTML}`,
            id: values.department,
          },
        }),
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.status === "OK") {
            handleClose();
            setsnackbarMsg("Course Created Successfully");
            setopensnack(true);

            setTimeout(function () {
              history.push("/");
              window.location.reload();
            }, 1000);
          } else {
            setsnackbarMsg("Course Creation Failed!");
            setopensnack(true);
          }
        })
        .catch((error) => {
          console.log(error);
          setsnackbarMsg("Course Creation Failed!");
          setopensnack(true);
        });
    }
  };

  if (userdata) {
    if (userdata.courses.length > 0) {
      courseUI = userdata.courses.map((course, k) => {
        // console.log(items);
        return (
          <Grid key={k} container alignitems="flex-start" className="sideExams">
            <Grid item>
              <SubjectIcon style={{ fontSize: "27px" }} />
            </Grid>
            <Grid item xs className="examName">
              <Link
                to={`/course/${course.course._id}/#exams`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>{course.course.name}</span>
              </Link>
            </Grid>
          </Grid>
        );
      });
    }

    userdata.courses.forEach((course, i) => {
      const date = new Date();

      if (course.course.cqExams) {
        course.course.cqExams.forEach((exam, j) => {
          console.log(course.course);
          if (
            new Date(exam.examId.date).getTime() + exam.examId.totalTime * 60 <
            date.getTime()
          )
            previousExams.push({
              _id: exam.examId._id,
              name: exam.examId.name,
              courseName: course.course.name,
              date: new Date(exam.examId.date),
              totalMarks: exam.examId.totalMarks,
              totalTime: exam.examId.totalTime,
              createdBy:
                course.course.createdBy.firstName +
                course.course.createdBy.lastName +
                course.course.createdBy.username,
            });
          else {
            upcomingExams.push({
              _id: exam.examId._id,
              name: exam.examId.name,
              courseName: course.course.name,
              date: new Date(exam.examId.date),
              totalMarks: exam.examId.totalMarks,
              totalTime: exam.examId.totalTime,
              createdBy:
                course.course.createdBy.firstName +
                " " +
                course.course.createdBy.lastName +
                " " +
                course.course.createdBy.username,
            });
          }
        });
      }

      if (course.course.mcqExams) {
        course.course.mcqExams.forEach((exam, j) => {
          if (
            new Date(exam.examId.date).getTime() + exam.examId.totalTime * 60 <
            date.getTime()
          )
            previousExams.push({
              _id: exam.examId._id,
              name: exam.examId.name,
              courseName: course.course.name,
              date: new Date(exam.examId.date),
              totalMarks: exam.examId.totalMarks,
              totalTime: exam.examId.totalTime,
              createdBy:
                course.course.createdBy.firstName +
                " " +
                course.course.createdBy.lastName +
                " " +
                course.course.createdBy.username,
            });
          else {
            upcomingExams.push({
              _id: exam.examId._id,
              name: exam.examId.name,
              courseName: course.course.name,
              date: new Date(exam.examId.date),
              totalMarks: exam.examId.totalMarks,
              totalTime: exam.examId.totalTime,
              createdBy:
                course.course.createdBy.firstName +
                " " +
                course.course.createdBy.lastName +
                " " +
                course.course.createdBy.username,
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
              <span>Course: {upcomingExams[0].courseName}</span>
            </Col>
          </Row>
          <Row className="infos">
            <Col>
              <p>Host: {upcomingExams[0].createdBy}</p>
            </Col>
          </Row>
          <Row className="infos">
            <Col>
              <span>Total Marks: {upcomingExams[0].totalMarks}</span>
            </Col>
          </Row>
          <Row className="infos">
            <Col>
              <span>Total Time: {upcomingExams[0].totalTime}</span>
            </Col>
          </Row>
        </Container>
      );
      upcomingExamsUI = upcomingExams.map((ex, i) => {
        if (i != 0)
          return (
            <>
              <Container
                fluid
                key={ex._id}
                alignitems="flex-start"
                className="upcoming__next"
              >
                <Link
                  to={`/upcoming-exam/${ex._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
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
                  <Row>
                    <Col style={{ paddingBottom: "10px" }}>{ex.courseName}</Col>
                  </Row>
                </Link>
              </Container>
            </>
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
            <Grid item>
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
  if (userdata) {
    const role = userdata.role;
    // console.log(role)
    return (
      // <Container fluid style={{ marginTop: "10px", height: "100vh" }}>
      <>
        <Snackbar
          open={opensnack}
          onClose={handleSnackClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          // anchorPosition ={ { right: 10, top: 100 }}
        >
          <Alert onClose={handleSnackClose} severity="success">
            {setsnackbarMsg}
          </Alert>
        </Snackbar>
        <Grid container justify="space-between" alignItems="flex-start">
          <Grid
            item
            xs={12}
            md={2}
            className="leftside"
            style={{ float: "left", paddingTop: "10px", paddingLeft: "10px" }}
          >
            <Grid container justify="space-between">
              <Grid item>
                <h4 className="leftHeading">My Courses</h4>
              </Grid>
              {role === "Teacher" ? (
                <Grid item>
                  <AddIcon
                    onClick={handleClickOpen}
                    style={{
                      fontSize: "30px",
                      color: "#234058",
                      cursor: "pointer",
                    }}
                  />
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
                      <Button onClick={createCourse} color="primary">
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
          <Grid
            item
            xs={12}
            md={6}
            className="upcoming"
            style={{ padding: "10px" }}
          >
            <Grid container justify="space-between" alignitems="flex-start">
              <Grid item>
                <h4 className="centerHeading">Upcoming Exams</h4>
              </Grid>
              <Grid item>
                <InfoOutlinedIcon
                  style={{ fontSize: "35px", color: "#234058" }}
                />
              </Grid>
            </Grid>
            <Grid item>
              <hr />
            </Grid>
            <div className="upcoming__first">
              {mostUpcomingExamUI}

              {upcomingExams.length > 0 ? (
                <Timer
                  examID={upcomingExams[0]._id}
                  deadline={upcomingExams[0].date}
                />
              ) : (
                <>
                  <Grid container justify="center">
                    <Grid item xs="auto" style={{ marginTop: "10%" }}>
                      <FaRegCheckCircle
                        style={{ fontSize: "50px", color: "#234058" }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container justify="center" style={{ marginTop: "2%" }}>
                    <Grid item xs="auto">
                      <h3 style={{ textAlign: "center" }}>
                        You're All Caught Up!
                      </h3>
                      <p style={{ textAlign: "center", fontSize: "20px" }}>
                        No Upcoming Exams
                      </p>
                    </Grid>
                  </Grid>
                </>
              )}
            </div>
            <div>{upcomingExamsUI}</div>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            className="rightside"
            style={{ padding: "10px" }}
          >
            <Grid container justify="space-between" alignitems="flex-start">
              <Grid item>
                <h4 className="rightHeading">Previous Exams</h4>
              </Grid>
            </Grid>
            <Grid item>
              <hr />
            </Grid>
            {previousExamsUI}
          </Grid>
        </Grid>
        {/* // </Container> */}
      </>
    );
  } else return <LinearIndeterminate />;
}
