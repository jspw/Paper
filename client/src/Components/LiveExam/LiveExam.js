import React, { useEffect, useRef, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@material-ui/core/Button";
import LinearIndeterminate from "../Generic/Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LinearProgress, makeStyles, Snackbar } from "@material-ui/core";
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
  const [seconds, setSeconds] = useState(2);

  const [windowChange, setwindowChange] = useState(0);

  const studentAnswers = [];

  const [result, setResult] = useState(0);

  const intervalRef = useRef();
  const [disableNextButton, setdisableNextButton] = useState(false);

  const [openFeedback, setOpenFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [answer, setAnswer] = useState("");

  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (event) => {
    setAnswer(event.target.value);
  };

  const handleFeedbackOpen = () => {
    setOpenFeedback(true);
  };

  const handleFeedbackClose = () => {
    setOpenFeedback(false);
  };

  const handleFeedback = (event) => {
    setFeedback(event.target.value);
  };
  // console.log(feedback);
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

        if (response.data.result.data.mcqQuestions) {
          setSeconds(
            response.data.result.data.mcqQuestions[index].mcqQuestionId.time
          );
        } else
          setSeconds(
            response.data.result.data.cqQuestions[index].mcqQuestionId.time
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
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log("examinfo", examinfo);

  const submitAnswers = () => {
    let url;
    let data;

    setShowResult(true);

    console.log(examinfo);

    if (examinfo) {
      if (examinfo.mcqQuestions) {
        console.log("studentAnswers", studentAnswers);
        url = `student/exam/mcq/submit/${id}`;
        data = JSON.stringify({
          studentAnswers: studentAnswers,
          feedback: feedback,
          windowChanged: windowChange,
        });
      } else {
        console.log("studentAnswers", studentAnswers);
        url = `student/exam/cq/submit/${id}`;

        data = JSON.stringify({
          studentAnswers: studentAnswers,
          feedback: feedback,
          windowChanged: windowChange,
        });
      }

      // setResult("Loading");
      axios({
        method: "POST",
        url: url,

        headers: { "Content-Type": "application/json" },
        data: data,
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
    }
  };

  const nextQuestion = (event) => {
    // console.log(
    //   "Ans : ",
    //   index,
    //   answer,
    //   examinfo.cqQuestions[index].cqQuestionId._id
    // );

    

    if (examinfo.mcqQuestions)
      studentAnswers.push({
        mcqQuestion: examinfo.mcqQuestions[index].mcqQuestionId._id,
        studentAnswer: value,
      });
    else {
      studentAnswers.push({
        cqQuestion: examinfo.cqQuestions[index].cqQuestionId._id,
        studentAnswer: answer,
      });
    }
    setValue('');
    setAnswer('');
    if (examinfo.mcqQuestions) {
      if (index + 1 < examinfo.mcqQuestions.length) {
        console.log("Index", index + 1, examinfo.mcqQuestions.length);
        setSeconds(
          (seconds) => examinfo.mcqQuestions[index + 1].mcqQuestionId.time
        );
        setIndex(index + 1);
      } else {
        clearInterval(intervalRef.current);
        submitAnswers();
      }
    } else if (examinfo.cqQuestions) {
      if (index + 1 < examinfo.cqQuestions.length) {
        console.log("Index", index + 1, examinfo.cqQuestions.length);
        setSeconds(
          (seconds) => examinfo.cqQuestions[index + 1].cqQuestionId.time
        );
        setIndex(index + 1);
      } else {
        submitAnswers();
        clearInterval(intervalRef.current);
      }
    }
  };

  document.addEventListener("visibilitychange", function () {
    // document.title = document.hidden ? "I'm am cheating" : "I'm here";
    // var mp3_url =
    //   "https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3";

    // new Audio(mp3_url).play();
    setwindowChange((windowChange) => windowChange + 1);
    handleClick();
  });

  if (examinfo) {
    let des;
    if (examinfo.cqQuestions) {
      des = examinfo.cqQuestions[index].cqQuestionId.description ? (
        <Row className="exam__description">
          <Col>
            <h5>{examinfo.cqQuestions[index].cqQuestionId.description}</h5>
          </Col>
        </Row>
      ) : null;
    }

    if (examinfo.mcqQuestions) {
      des = examinfo.mcqQuestions[index].mcqQuestionId.description ? (
        <Row className="exam__description">
          <Col>
            <h5>{examinfo.mcqQuestions[index].mcqQuestionId.description}</h5>
          </Col>
        </Row>
      ) : null;
    }

    if (seconds < 0) nextQuestion();
    if (result || showResult) {
      return (
        <Result
          result={result}
          examType={examinfo.mcqQuestions ? "mcq" : "cq"}
        />
      );
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
          <Container fluid className="root noselect">
            <Row className="justify-content-center">
              <Col xs={7} className="exam">
                <Row className="exam__title justify-content-center">
                  <Col xs="auto">
                    <h4>{examinfo.name}</h4>
                  </Col>
                </Row>

                {des}

                <Row className="d-flex justify-content-between exam__question">
                  <Col>
                    <h5>
                      {examinfo.mcqQuestions
                        ? examinfo.mcqQuestions[index].mcqQuestionId
                            .mainQuestion
                        : examinfo.cqQuestions[index].cqQuestionId.mainQuestion}
                    </h5>
                  </Col>
                  <Col xs="auto">
                    <p style={{ fontSize: "1vw" }}>
                      Marks:{" "}
                      {examinfo.mcqQuestions
                        ? examinfo.mcqQuestions[index].mcqQuestionId.marks
                        : examinfo.cqQuestions[index].cqQuestionId.marks}
                    </p>
                  </Col>
                </Row>
                <Row className="exam__options">
                  <Col xs={12}>
                    {examinfo.mcqQuestions ? (
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
                    ) : (
                      <TextField
                        id="ans"
                        label="Answer"
                        autoFocus
                        margin="dense"
                        fullWidth
                        multiline
                        rows={5}
                        variant="standard"
                        value={answer}
                        onChange={handleAnswer}
                      />
                    )}
                  </Col>
                </Row>
                <Row className="feedback">
                  <Col>
                    <p>
                      Something wrong with this question?
                      <a onClick={handleFeedbackOpen}>
                        <b> Give Feedback</b>
                      </a>
                    </p>
                    <Dialog
                      open={openFeedback}
                      onClose={handleClose}
                      aria-labelledby="form-dialog-title"
                    >
                      <DialogContent>
                        <DialogTitle>
                          Let your teacher know what is wrong
                        </DialogTitle>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="feedback"
                          label="Feedback"
                          fullWidth
                          multiline
                          rows={3}
                          variant="outlined"
                          value={feedback}
                          onChange={handleFeedback}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleFeedbackClose} color="default">
                          Cancel
                        </Button>
                        <Button onClick={handleFeedbackClose} color="primary">
                          Send
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Col>
                </Row>
                <Row className="exam__buttons d-flex justify-content-between">
                  <Col>
                    <span className="timer">
                      <b>
                        {/* <div id="countdown"></div> */}
                        {seconds <= 0 ? "Timeout!" : seconds}
                      </b>
                    </span>
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={nextQuestion}
                      disableElevation
                      disabled={disableNextButton}
                      style={{ backgroundColor: "#3F7CAC" }}
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
  } else return <LinearIndeterminate />;
}
