import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Forms from "../../Generic/Forms";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Button } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(3),
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
}));

export default function Question(props) {
  const classes = useStyles();

  const [values, setValues] = useState({
    description: "",
    question: "",
    error: "",
    option: "",
  });
  const [value, setValue] = React.useState("");
  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleQuestionAdd = (id) => {
    props.addQuestion(id);
  };

  const sendQuestion = () => {
    handleQuestionAdd(200);
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
                    values={values.email}
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
                    values={values.email}
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
                    values={values.email}
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
                    values={values.email}
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
                    values={values.email}
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
                    values={values.email}
                    handleChange={handleChange}
                    required={true}
                    classes={classes}
                  />
                </Col>
              </Row>
            </Col>
          </Col>
          <Col>
            <Row>
              <FormControl component="fieldset" className={classes.textField}>
                <FormLabel component="legend">Select Correct Ans</FormLabel>
                <RadioGroup
                  aria-label="option"
                  name="opt"
                  value={value}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="optA"
                    control={<Radio />}
                    label="A"
                  />
                  <FormControlLabel
                    value="optB"
                    control={<Radio />}
                    label="B"
                  />
                  <FormControlLabel
                    value="optC"
                    control={<Radio />}
                    label="C"
                  />
                  <FormControlLabel
                    value="optD"
                    control={<Radio />}
                    label="D"
                  />
                </RadioGroup>
              </FormControl>
            </Row>
            <Row>
              <h6 className={classes.textField}>Time Limit</h6>
            </Row>
            <Row>
              <Col xs="auto">
                <div class="input-group">
                  {/* <label class="form-control" for="quantity">Minutes : </label> */}
                  {/* <FormLabel value="min"  /> */}

                  <input
                    class="form-control"
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="0"
                    max="5"
                    placeholder="00"
                  />
                  <div class="input-group-prepend">
                    <span class="input-group-text">min</span>
                  </div>
                </div>
              </Col>
              <Col xs="auto">
                <div class="input-group">
                  {/* <label class="mr-sm-2" for="quantity">Seconds :</label> */}

                  <input
                    class="form-control"
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="0"
                    max="59"
                    placeh
                    older="00"
                  />
                  <div class="input-group-prepend">
                    <span class="input-group-text">sec</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </form>
    </Container>
  );
}
