import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import CreateExam from "./CreateExam";
import "./CreateExam.scss";

const ExamType = (props) => {
  const [examType, setexamType] = useState("");
  const [create, setcreate] = useState(false);

  const handleChange = (event) => {
    setexamType(event.target.value);
    console.log(event.target.value);
  };
  const handleSubmit = () => {
    setcreate(true);
  };

  console.log(examType, create);

  if (!create) {
    return (
      <Row>
        {console.log("Hello")}
        <Col>
          <Row>
            <Col xs={12}>
              <h3>Create Exam</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Instructions</h4>
              <ul>
                <li>
                  Select exam type from below form and then click Create Exam to
                  proceed.
                </li>
                <li>You can create as many queston as you like.</li>
                <li>
                  For every queston you have to set a specific time limit for
                  your student to answer that question.
                </li>
                <li>Also you have to specify marks for every question.</li>
                <li>When your question set is ready click Lock Exam.</li>
                <li>
                  Then you'll need to give your exam a name and a start
                  schedule.
                </li>
              </ul>
            </Col>
          </Row>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12}>
                <FormControl style={{ minWidth: "13%" }} required>
                  <InputLabel id="examType">Exam Type</InputLabel>
                  <Select
                    id="examType"
                    value={examType}
                    onChange={handleChange}
                  >
                    <MenuItem disabled>Exam Type</MenuItem>
                    <MenuItem value="mcq">MCQ</MenuItem>
                    <MenuItem value="CQ">CQ</MenuItem>
                  </Select>
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 2, offset: 5 }}>
                <Button variant="outlined" color="primary" type="submit">
                  Create Exam
                </Button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    );
  } else
    return <CreateExam examType={examType} courseData={props.courseData} />;
};

export default ExamType;
