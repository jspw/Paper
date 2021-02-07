import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import Grid from "@material-ui/core/Grid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Forms from "../../Generic/Forms";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { getRenderPropValue } from "antd/lib/_util/getRenderPropValue";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(3),
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#3F7CAC',
  },
}));

export default function Question() {
  const classes = useStyles();

  const [values, setValues] = useState({
    description: "",
    question: "",
    optA: "",
    optB: "",
    optC: "",
    optD: "",
    ans: "A",
    marks: "",
    min: null,
    sec: null,
  });
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
                <FormControl component="fieldset" className={classes.textField}>
                  <FormLabel component="legend">Select Correct Ans</FormLabel>
                  <RadioGroup
                    aria-label="ans"
                    name="ans"
                    value={values.ans}
                    onChange={handleChange("ans")}
                  >
                    <FormControlLabel value="A" control={<Radio />} label="A" />
                    <FormControlLabel value="B" control={<Radio />} label="B" />
                    <FormControlLabel value="C" control={<Radio />} label="C" />
                    <FormControlLabel value="D" control={<Radio />} label="D" />
                  </RadioGroup>
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Forms
                  id="marks"
                  type="text"
                  label="Marks"
                  labelWidth={60}
                  values={values.marks}
                  handleChange={handleChange}
                  required={true}
                  classes={classes}
                />
              </Col>
            </Row>
            <Row className="justify-content-flex-start">
              <Col>
                <FormLabel component="legend">Time Limit</FormLabel>
              </Col>
            </Row>
            <Row className="justify-content-flex-start">
              <Col xs={4}>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="number"
                    id="min"
                    name="min"
                    min="0"
                    max="5"
                    placeholder="00"
                    value={values.min}
                    onChange={handleChange}
                  />
                  <div class="input-group-prepend">
                    <span class="input-group-text">min</span>
                  </div>
                </div>
              </Col>
              <Col xs={4}>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="number"
                    id="sec"
                    name="sec"
                    min="0"
                    max="59"
                    placeholder="00"
                    value={values.sec}
                    onChange={handleChange}
                  />
                  <div class="input-group-prepend">
                    <span class="input-group-text">sec</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<SaveIcon />}
              type="submit"
            >
              Save
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
}
