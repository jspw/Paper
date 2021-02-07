import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import LockIcon from '@material-ui/icons/Lock';
import Grid from "@material-ui/core/Grid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Forms from "../../Generic/Forms";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getRenderPropValue } from "antd/lib/_util/getRenderPropValue";

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
}))

export default function Question() {
  const classes = useStyles();
  const leftClasses = leftStyles();

  
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
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (
      values.question &&
      values.optA &&
      values.optB &&
      values.optc &&
      values.optD &&
      values.ans &&
      values.marks &&
      values.min &&
      values.sec
    ) {setOpen(true);}
    else {setOpen(false); console.log(open)}
  };
  console.log(open)

  const handleClose = () => {
    setOpen(false);
  };
/*   const [value, setValue] = React.useState("");
  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };
 */
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <Container fluid className="justify-content-flex-start">
      <Row className="justify-content-center">
        <Col xs="auto">
          <h3>Create Your Question Here</h3>
        </Col>
      </Row>
      <form>
        <Row>
          <Col xs={6}>
            <Col lg={12}>
              <Row className="justify-content-flex-start">
                <Col xs={12} md={6} lg={12}>
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
                <Col xs={12} md={6} lg={12}>
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
            {/*             <Row className="justify-content-flex-start">
              <Col>
                <FormLabel component="legend" className={leftClasses.timeField}>
                  Time Limit
                </FormLabel>
              </Col>
            </Row> */}
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
            id="datetime-local"
            label="Exam Schedule"
            type="datetime-local"
            defaultValue="2021-05-01T10:30"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <DialogContentText>
          <br />
            Total Marks: 50
            <br />
            Total Time: 20mins
            <br />
            <br />
            By clicking confirm this exam will be created as schedule.<br/><br/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
