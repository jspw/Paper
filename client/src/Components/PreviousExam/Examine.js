import React, { useEffect, useState } from "react";

import {
  Button,
  Col,
  Container,
  Row,
  Modal,
  Form,
  Spinner,
  Card,
  Alert,
  Jumbotron,
  Table,
  Tab,
  TabContainer,
  ListGroup,
  TabContent,
  TabPane,
} from "react-bootstrap";

import TextField from "@material-ui/core/TextField";

import axios from "axios";

import MarkSheet from "./MarkSheet";

import MenuItem from "@material-ui/core/MenuItem";
import LinearIndeterminate from "../Generic/Loader";

import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Box,
  CardContent,
  Grid,
  MenuList,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router-dom";

import ExamInfo from "./ExamInfo";

const Examine = (props) => {
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
  const { id } = useParams();

  let userdata;
  userdata = localStorage.getItem("data");
  userdata = JSON.parse(userdata);

  let role;

  role = userdata.role;

  const [cqExamsData, setCqExamsData] = useState(null);

  const [onlyExamInfo, setOnlyExamInfo] = useState(null);

  const [index, setindex] = useState(0);
  const [mark, setmark] = useState("");

  const marks = [];

  let cq;

  useEffect(() => {
    let examType = "mcq";
    const endpoint = `teacher/exam/cq/submits/${id}`;

    axios
      .get(endpoint)
      .then((response) => {
        console.log(response.data);
        if (response.data.status == "OK") {
          setCqExamsData(response.data.result.data);
        }
      })
      .catch((error) => {
        console.log(error);
        axios
          .get(`teacher/exam/${id}`)
          .then((response) => {
            setOnlyExamInfo(response.data.result.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, []);

  const addMark = (id) => {
    console.log(cqExamsData[index].cqExam._id, " X ", mark);
    if (mark)
      marks.push({
        cqQuestion: cqExamsData[index].cqExam._id,
        mark: parseInt(mark, 10),
      });
  };

  const handleChange =  (e) =>{
      setmark(e.target.value);
  }

  const postMarks = () => {
    const url = `teacher/exam/cq/submits/${id}`;

    const data = JSON.stringify({
      marks: marks,
    });

    axios({
      method: "POST",
      url: url,

      headers: { "Content-Type": "application/json" },
      data: data,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "OK") {
          setindex((index) => index + 1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (cqExamsData) {
    const examInfoUI = (
      <Container fluid style={{ marginTop: "5px" }}>
        <Alert variant="light">
          <h1 className="text-center">
            Exam Name : {cqExamsData[0].cqExam.name}
          </h1>
        </Alert>
        <Row>
          <Col>
            <Row>
              <Col>
                <Table
                  // variant="dark"
                  responsive
                  hover
                  bordered
                  size="sm"
                  bsPrefix="table"
                >
                  <tbody>
                    <tr>
                      <td>Date</td>
                      <td>
                        {new Date(cqExamsData[0].cqExam.date).getDate()}
                        th{" "}
                        {
                          months[
                            new Date(cqExamsData[0].cqExam.date).getMonth()
                          ]
                        }
                        ,{new Date(cqExamsData[0].cqExam.date).getFullYear()} (
                        {days[new Date(cqExamsData[0].cqExam.date).getDay()]})
                      </td>
                    </tr>
                    <tr>
                      <td>At</td>
                      <td>
                        {new Date(cqExamsData[0].cqExam.date).getHours() < 10
                          ? "0" +
                            new Date(cqExamsData[0].cqExam.date).getHours()
                          : new Date(cqExamsData[0].cqExam.date).getHours()}
                        :
                        {new Date(cqExamsData[0].cqExam.date).getMinutes() < 10
                          ? "0" +
                            new Date(cqExamsData[0].cqExam.date).getMinutes()
                          : new Date(
                              cqExamsData[0].cqExam.date
                            ).getMinutes()}{" "}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>

          <Col>
            <Row>
              <Col></Col>
              <Col>
                <Table
                  // variant="dark"
                  responsive
                  hover
                  bordered
                  size="sm"
                  bsPrefix="table"
                >
                  <tbody>
                    <tr>
                      <td>Total Marks</td>
                      <td>{cqExamsData[0].totalMarks}</td>
                    </tr>

                    <tr>
                      <td>Total Time</td>
                      <td>{cqExamsData[0].totalTime} min</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );

    cq = cqExamsData[index].cqExam.cqQuestions.map((cqx, i) => {
      return (
        <div>
          <Card>
            <Grid justify="space-between">
              <Box fontWeight="fontWeightBold" m={1}>
                {" "}
                Question : [ {`Marks : ${cqx.cqQuestionId.marks} || `}
                {`Time : ${cqx.cqQuestionId.time / 60}  min  ${
                  cqx.cqQuestionId.time % 60
                } sec `}
                ]
              </Box>
            </Grid>

            <div className="card card-body bg-light">
              <Typography>
                {" "}
                {cqx.cqQuestionId.description
                  ? cqx.cqQuestionId.description
                  : ""}
              </Typography>

              <Typography> {cqx.cqQuestionId.mainQuestion} </Typography>
            </div>
            <CardContent>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  <Box fontWeight="fontWeightBold" m={1}>
                    Ans :{" "}
                  </Box>
                </Form.Label>
                <Form.Control
                  value={
                    cqExamsData[0].studentAnswers[i]
                      ? cqExamsData[0].studentAnswers[i].studentAnswer
                      : ""
                  }
                  disabled
                  as="textarea"
                  rows={3}
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <TextField
                  label="Mark"
                  id={cqExamsData[0].cqExam._id}
                  //   defaultValue="Small"
                  type="Number"
                  value={mark}
                  variant="outlined"
                  onChange= {handleChange}
                  size="small"
                  required
                />
                <button onClick = {addMark} type="input" className="btn btn-info">
                  {" "}
                  Add{" "}
                </button>
              </Form.Group>
            </CardContent>
          </Card>
          <br></br>
        </div>
      );
    });

    return (
      <Container>
        {examInfoUI}
        {cq}
        <button onClick={postMarks} className="btn btn-primary">
          Submit
        </button>
        <br />
        <br />
      </Container>
    );
  }

  if (onlyExamInfo) {
    cq = onlyExamInfo.cqQuestions.map((questions) => {
      return (
        <div>
          <Card>
            <Box fontWeight="fontWeightBold" m={1}>
              {" "}
              Question :{" "}
            </Box>
            <div className="card card-body bg-light">
              <Typography>{questions.cqQuestionId.description}</Typography>
              {/* <Alert variant="primary"> */}
              <Typography>{questions.cqQuestionId.mainQuestion}</Typography>
              {/* </Alert> */}
            </div>
          </Card>
          <br></br>
        </div>
      );
    });

    return (
      <Container fluid style={{ marginTop: "5px" }}>
        <Container>
          <div className="d-flex justify-content-center">
            <Alert variant="warning">No Participants</Alert>
          </div>
        </Container>

        <Alert variant="light">
          <h1 className="text-center">Exam Name : {onlyExamInfo.name}</h1>
        </Alert>
        <Row>
          <Col>
            <Row>
              <Col>
                <Table
                  // variant="dark"
                  responsive
                  hover
                  bordered
                  size="sm"
                  bsPrefix="table"
                >
                  <tbody>
                    <tr>
                      <td>Date</td>
                      <td>
                        {new Date(onlyExamInfo.date).getDate()}
                        th {months[new Date(onlyExamInfo.date).getMonth()]},
                        {new Date(onlyExamInfo.date).getFullYear()} (
                        {days[new Date(onlyExamInfo.date).getDay()]})
                      </td>
                    </tr>
                    <tr>
                      <td>At</td>
                      <td>
                        {new Date(onlyExamInfo.date).getHours() < 10
                          ? "0" + new Date(onlyExamInfo.date).getHours()
                          : new Date(onlyExamInfo.date).getHours()}
                        :
                        {new Date(onlyExamInfo.date).getMinutes() < 10
                          ? "0" + new Date(onlyExamInfo.date).getMinutes()
                          : new Date(onlyExamInfo.date).getMinutes()}{" "}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>

          <Col>
            <Row>
              <Col></Col>
              <Col>
                <Table
                  // variant="dark"
                  responsive
                  hover
                  bordered
                  size="sm"
                  bsPrefix="table"
                >
                  <tbody>
                    <tr>
                      <td>Total Marks</td>
                      <td>{onlyExamInfo.totalMarks}</td>
                    </tr>

                    <tr>
                      <td>Total Time</td>
                      <td>{onlyExamInfo.totalTime} min</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
        <Container>{cq}</Container>
      </Container>
    );
  } else return <LinearIndeterminate />;
};

export default Examine;
