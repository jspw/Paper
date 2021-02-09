import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import LockIcon from "@material-ui/icons/Lock";
import Grid from "@material-ui/core/Grid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Forms from "../../Generic/Forms";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getRenderPropValue } from "antd/lib/_util/getRenderPropValue";
import axios from "axios";
import { Toast } from "react-bootstrap";
import "./CreateExam.scss";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(3),
  },
  leftTextField: {
    marginTop: theme.spacing(6),
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(10),
    // backgroundColor: '#3F7CAC',
  },
}));

const leftStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(3.5),
  },
  timeField: {
    marginTop: theme.spacing(2.9),
  },
}));

export default function Question(props) {
  const classes = useStyles();
  const leftClasses = leftStyles();

  let questionsCreated = 0;

  const [values, setValues] = useState({
    description: "",
    question: null,
    optA: null,
    optB: null,
    optC: null,
    optD: null,
    ans: null,
    marks: null,
    min: null,
    sec: null,
    date: Date.now(),
    name: null,
  });
  const [open, setOpen] = React.useState(false);

  const [questionEditDisable, setQuestionEditDisable] = useState(false);

  const [showToast, setShowToast] = useState(false);

  console.log("questionEditDisable", questionEditDisable);

  const handleClickOpen = () => {
    if (
      values.question &&
      values.optA &&
      values.optB &&
      values.optC &&
      values.optD &&
      values.ans &&
      values.marks &&
      values.min &&
      values.sec
    ) {
      setOpen(true);
    } else {
      setShowToast(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createExam = () => {
    console.log(values.name);
    if (values.name) {
      props.createExam(values.date, values.name);
      setOpen(false);
    }
  };

  const handleChange = (prop) => (event) => {
    console.log("Triggered", event.target.value);
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleQuestionAdd = (id) => {
    props.onAdd(
      id,
      values.marks,
      parseInt(values.min, 10) * 60 + parseInt(values.sec, 10)
    );
  };

  function sendQuestion(e) {
    e.preventDefault();

    console.log("Form Values ", values);

    axios({
      method: "POST",
      url: "teacher/question/mcq/create",

      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        description: values.description,
        mainQuestion: values.question,
        options: [
          {
            option: values.optA,
          },
          {
            option: values.optB,
          },
          {
            option: values.optC,
          },
          {
            option: values.optD,
          },
        ],
        correctAnswers: [
          {
            answer:
              values.ans === "A"
                ? values.optA
                : values.ans === "B"
                ? values.optB
                : values.ans === "C"
                ? values.optC
                : values.optD,
          },
        ],
        time: parseInt(values.min, 10) * 60 + parseInt(values.sec, 10),
        marks: parseInt(values.marks, 10),
      }),
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "OK") {
          handleQuestionAdd(response.data.result.data._id);
          setQuestionEditDisable(true);
          questionsCreated++;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const mcq = (
    <Row>
      <Col xs={12} lg={6}>
        <Col lg={12}>
          <Row className="justify-content-flex-start">
            <Col xs={12}>
              <Forms
                id="description"
                type="textField"
                label="Description"
                labelWidth={80}
                values={values.description}
                handleChange={handleChange}
                rows={4}
                classes={classes}
              />
            </Col>
          </Row>
          <Row className="justify-content-flex-start">
            <Col xs={12}>
              <Forms
                id="question"
                type="textField"
                label="Question"
                labelWidth={75}
                values={values.question}
                handleChange={handleChange}
                required={true}
                rows={3}
                classes={classes}
              />
            </Col>
          </Row>
          <Row className="justify-content-flex-start">
            <Col xs={6}>
              <Forms
                id="optA"
                type="text"
                label="Option A"
                labelWidth={75}
                values={values.optA}
                handleChange={handleChange}
                required={true}
                classes={classes}
              />
            </Col>
            <Col xs={6}>
              <Forms
                id="optB"
                type="text"
                label="Option B"
                labelWidth={75}
                values={values.optB}
                handleChange={handleChange}
                required={true}
                classes={classes}
              />
            </Col>
          </Row>
          <Row className="justify-content-flex-start">
            <Col xs={6}>
              <Forms
                id="optC"
                type="text"
                label="Option C"
                labelWidth={75}
                values={values.optC}
                handleChange={handleChange}
                required={true}
                classes={classes}
              />
            </Col>
            <Col xs={6}>
              <Forms
                id="optD"
                type="text"
                label="Option D"
                labelWidth={75}
                values={values.optD}
                handleChange={handleChange}
                required={true}
                classes={classes}
              />
            </Col>
          </Row>
        </Col>
      </Col>
      <Col>
        <Row className="justify-content-flex-start">
          <Col>
            <FormControl
              component="fieldset"
              className={classes.textField}
              required
            >
              <FormLabel component="legend">Select Correct Ans</FormLabel>
              <RadioGroup
                aria-label="ans"
                name="ans"
                value={values.ans}
                onChange={handleChange("ans")}
              >
                <FormControlLabel
                  value="A"
                  control={<Radio color="primary" />}
                  label="A"
                />
                <FormControlLabel
                  value="B"
                  control={<Radio color="primary" />}
                  label="B"
                />
                <FormControlLabel
                  value="C"
                  control={<Radio color="primary" />}
                  label="C"
                />
                <FormControlLabel
                  value="D"
                  control={<Radio color="primary" />}
                  label="D"
                />
              </RadioGroup>
            </FormControl>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <TextField
              type="number"
              label="Marks"
              variant="outlined"
              value={values.marks}
              onChange={handleChange("marks")}
              className={leftClasses.textField}
              required
            />
          </Col>
        </Row>
        <Row className="justify-content-flex-start">
          <Col xs={4}>
            <TextField
              id="min"
              type="number"
              placeholder="00"
              label="Minutes"
              variant="outlined"
              value={values.min}
              onChange={handleChange("min")}
              className={classes.textField}
              required
            />
          </Col>
          <Col xs={4}>
            <TextField
              id="sec"
              min="0"
              type="number"
              max="59"
              placeholder="00"
              label="Seconds"
              variant="outlined"
              value={values.sec}
              onChange={handleChange("sec")}
              className={classes.textField}
              required
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
  const cq = (
    <Row className="justify-content-center">
      <Col xs={12} lg={6}>
        <Row>
          <Col xs={12}>
            <Forms
              id="description"
              type="textField"
              label="Description"
              labelWidth={80}
              values={values.description}
              handleChange={handleChange}
              rows={4}
              classes={classes}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Forms
              id="question"
              type="textField"
              label="Question"
              labelWidth={75}
              values={values.question}
              handleChange={handleChange}
              required={true}
              rows={4}
              classes={classes}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={4}>
            <TextField
              type="number"
              label="Marks"
              variant="outlined"
              value={values.marks}
              onChange={handleChange("marks")}
              className={classes.textField}
              required
            />
          </Col>
          <Col xs={12} sm={6} md={4}>
            <TextField
              id="min"
              type="number"
              placeholder="00"
              label="Minutes"
              variant="outlined"
              value={values.min}
              onChange={handleChange("min")}
              className={classes.textField}
              required
            />
          </Col>
          <Col xs={12} sm={6} md={4}>
            <TextField
              id="sec"
              min="0"
              type="number"
              max="59"
              placeholder="00"
              label="Seconds"
              variant="outlined"
              value={values.sec}
              onChange={handleChange("sec")}
              className={classes.textField}
              required
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
  console.log(props.examType);
  return (
    <Container fluid className="justify-content-flex-start">
      <Toast
        className="toast-modify"
        autohide
        onClose={() => setShowToast(false)}
        show={showToast}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Alert Message</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>You Have To Create At Least One Question!</Toast.Body>
      </Toast>
      <Row className="justify-content-center">
        <Col xs="auto">
          <h3>Create Your Question Here</h3>
        </Col>
      </Row>
      <form onSubmit={sendQuestion}>
        {cq}
        <Row className="justify-content-center">
          <ButtonGroup size="large" color="primary">
            <Button
              color="primary"
              className={classes.button}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              disabled={questionEditDisable}
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<SaveIcon />}
              type="submit"
            >
              Save
            </Button>
            <Button
              color="primary"
              className={classes.button}
              startIcon={<LockIcon />}
              onClick={handleClickOpen}
            >
              Lock Exam
            </Button>
          </ButtonGroup>
        </Row>
      </form>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Lock This Exam</DialogTitle>
        <DialogContent>
          <TextField
            id="exam-name"
            type="text"
            label="Exam Name"
            value={values.name}
            onChange={handleChange("name")}
            required={true}
            classes={classes.textField}
          />

          <br /><br/>

          <TextField
            id="datetime-local"
            label="Schedule Exam"
            type="datetime-local"
            value={values.date}
            onChange={handleChange("date")}
            defaultValue="2021-05-01T10:30"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <DialogContentText>
            <br />
            Total Marks: {props.totalMarks}
            <br />
            Total Time: {props.totalTime}
            <br />
            <br />
            By clicking confirm this exam will be created as schedule.
            <br />
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createExam} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
