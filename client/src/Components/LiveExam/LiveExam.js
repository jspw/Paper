import React, { useEffect, useRef, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@material-ui/core/Button";
import LinearIndeterminate from "../Generic/Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  LinearProgress,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
// import Alert from "@material-ui/lab/Alert";
import MuiAlert from "@material-ui/lab/Alert";
import Result from "./Result";
import "./LiveExam.scss";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      display: "flex",
      alignItems: "center",
    },
  },
}));

export default function LiveExam(props) {
  const { id } = useParams();
  const classes = useStyles();

  const [value, setValue] = React.useState("");
  const [index, setIndex] = React.useState(0);

  const [examinfo, setExamInfo] = useState(null);

  const [open, setOpen] = React.useState(false);
  const [seconds, setSeconds] = useState(1);

  const [windowChange, setwindowChange] = useState(0);

  const studentAnswers = [];

  const [result, setResult] = useState(0);

  const intervalRef = useRef();
  const [disableNextButton, setdisableNextButton] = useState(false);

  // const [totalExamTime, setTotalExamTime] = useState(0);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const submitAnswers = () => {
    // setResult("Loading");
    axios({
      method: "POST",
      url: `student/exam/mcq/submit/${id}`,

      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        studentAnswers: studentAnswers,
        feedback: "Sir i think something is wrong in the options",
        windowChanged: windowChange,
      }),
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "OK") {
          setResult(response.data.result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    intervalRef.current = interval;

    axios
      .get(`student/exam/${id}`)
      .then((response) => {
        setExamInfo(response.data.result.data);
        console.log("examinfo", response.data.result.data);
        setSeconds(
          response.data.result.data.mcqQuestions[index].mcqQuestionId.time
        );

        let examTimeEndAfter = 0;

        examTimeEndAfter =
          Math.round(
            new Date(response.data.result.data.date).getTime() / 1000
          ) +
          response.data.result.data.totalTime -
          Math.round(Date.now() / 1000);

        console.log(examTimeEndAfter);

        if (examTimeEndAfter > 0) examTimeEndAfter = examTimeEndAfter * 1000;
        else examTimeEndAfter = 0;

        console.log(examTimeEndAfter);

        const timeout = setTimeout(() => {
          clearInterval(intervalRef.current);
          setdisableNextButton(true);
          submitAnswers();
          // alert("Exam Timeout!");
        }, examTimeEndAfter);

        // const timer = setTimeout(() => {
        //   // setCount("Timeout called!");
        //   // clearInterval(intervalRef.current);
        //   alert("Hello");
        //   console.log("Timeout worked after ", examTimeEndAfter);
        //   // submitAnswers();
        // }, examTimeEndAfter * 1000);
        // return () => {
        //   clearTimeout(timer);
        // };

        // return () => clearTimeout(timeout);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (examinfo) {
    const nextQuestion = (event) => {
      console.log(
        "Ans : ",
        index,
        value,
        examinfo.mcqQuestions[index].mcqQuestionId._id
      );
      studentAnswers.push({
        mcqQuestion: examinfo.mcqQuestions[index].mcqQuestionId._id,
        studentAnswer: value,
      });

      if (index + 1 < examinfo.mcqQuestions.length) {
        console.log("Index", index + 1, examinfo.mcqQuestions.length);
        setSeconds(
          (seconds) => examinfo.mcqQuestions[index + 1].mcqQuestionId.time
        );
        setIndex(index + 1);
      } else {
        submitAnswers();
        clearInterval(intervalRef.current);
      }
    };

    if (seconds < 0) nextQuestion();

    document.addEventListener("visibilitychange", function () {
      // document.title = document.hidden ? "I'm am cheating" : "I'm here";
      // var mp3_url =
      //   "https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3";

      // new Audio(mp3_url).play();
      setwindowChange((windowChange) => windowChange + 1);
      handleClick();
    });
    if (result) {
      return <Result result={result} />;
    } else
      return (
        <div>
          <Snackbar
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            // anchorPosition ={ { right: 10, top: 100 }}
          >
            <Alert onClose={handleClose} severity="warning">
              Please Don't Leave Tab During Exam!
            </Alert>
          </Snackbar>
          <Container fluid className="root ">
            <Row className="justify-content-center">
              <Col xs={7} className="exam">
                <Row className="exam__title justify-content-center">
                  <Col xs="auto">
                    <h4>{examinfo.name}</h4>
                  </Col>
                </Row>
                <Row className="exam__question">
                  <Col>
                    <h5>
                      {examinfo.mcqQuestions[index].mcqQuestionId.description}
                    </h5>
                  </Col>
                </Row>
                <Row className="exam__question">
                  <Col>
                    <h5>
                      {examinfo.mcqQuestions[index].mcqQuestionId.mainQuestion}
                    </h5>
                  </Col>
                </Row>
                <Row className="exam__options">
                  <Col xs={12}>
                    <FormControl component="fieldset" fullWidth>
                      <RadioGroup
                        aria-label="ans"
                        name="ans"
                        value={value}
                        onChange={handleChange}
                      >
                        <Row className="option" xs={12}>
                          <Col xs={12}>
                            <FormControlLabel
                              value={
                                examinfo.mcqQuestions[index].mcqQuestionId
                                  .options[0].option
                              }
                              control={<Radio color="primary" />}
                              label={
                                examinfo.mcqQuestions[index].mcqQuestionId
                                  .options[0].option
                              }
                            />
                          </Col>
                        </Row>
                        <Row className="option">
                          <Col xs={12}>
                            <FormControlLabel
                              value={
                                examinfo.mcqQuestions[index].mcqQuestionId
                                  .options[1].option
                              }
                              control={<Radio color="primary" />}
                              label={
                                examinfo.mcqQuestions[index].mcqQuestionId
                                  .options[1].option
                              }
                            />
                          </Col>
                        </Row>
                        <Row className="option">
                          <Col xs={12}>
                            <FormControlLabel
                              value={
                                examinfo.mcqQuestions[index].mcqQuestionId
                                  .options[2].option
                              }
                              control={<Radio color="primary" />}
                              label={
                                examinfo.mcqQuestions[index].mcqQuestionId
                                  .options[2].option
                              }
                            />
                          </Col>
                        </Row>
                        <Row className="option">
                          <Col xs={12}>
                            <FormControlLabel
                              value={
                                examinfo.mcqQuestions[index].mcqQuestionId
                                  .options[3].option
                              }
                              control={<Radio color="primary" />}
                              label={
                                examinfo.mcqQuestions[index].mcqQuestionId
                                  .options[3].option
                              }
                            />
                          </Col>
                        </Row>
                      </RadioGroup>
                    </FormControl>
                  </Col>
                </Row>
                <Row className="exam__buttons d-flex justify-content-between">
                  <Col>
                    <span className="timer">
                      <b>
                        {/* <div id="countdown"></div> */}
                        {seconds == 0 ? "Exam Finished!" : seconds}
                      </b>
                    </span>
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="contained"
                      color="default"
                      onClick={nextQuestion}
                      disableElevation
                      disabled={disableNextButton}
                      // disabled={
                      //   index + 1 == examinfo.mcqQuestions.length && true
                      // }
                    >
                      Next
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      );
  } else
    return (
      <LinearIndeterminate/>
    );
}
