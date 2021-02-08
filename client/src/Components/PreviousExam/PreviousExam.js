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

import axios from "axios";

import "./PreviousExam.css";

import MarkSheet from "./MarkSheet";

import MenuItem from "@material-ui/core/MenuItem";

import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Box,
  CardContent,
  MenuList,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router-dom";

import ExamInfo from "./ExamInfo";

const PreviousExam = (props) => {
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

  const userId = props.userInfo._id;

  const role = props.userInfo.role;

  const [mcqExamData, setMcqExamData] = useState(null);
  const [cqExamData, setCqExamData] = useState(null);
  const [mcqExamsData, setMcqExamsData] = useState(null);
  const [cqExamsData, setCqExamsData] = useState(null);

  useEffect(() => {
    let examType = "mcq";

    let endpoint;
    if (role === "Teacher") endpoint = `teacher/exam/${examType}/submits/${id}`;
    else endpoint = `${role}/exam/${examType}/submit/${id}`;

    axios
      .get(endpoint)
      .then((response) => {
        console.log(response.data);
        if (response.data.status == "OK") {
          if (role === "Teacher") setMcqExamsData(response.data.result.data);
          else setMcqExamData(response.data.result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    examType = "cq";
    if (role === "Teacher") endpoint = `teacher/exam/${examType}/submits/${id}`;
    else endpoint = `${role}/exam/${examType}/submit/${id}`;

    axios
      .get(endpoint)
      .then((response) => {
        console.log(response.data);
        if (response.data.status == "OK") {
          if (role === "Teacher") setCqExamsData(response.data.result.data);
          else setCqExamData(response.data.result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let mcq;
  let cq;

  if (mcqExamData)
    mcq = mcqExamData.studentAnswers.map((test) => {
      return (
        <div>
          <Card>
            <Box fontWeight="fontWeightBold" m={1}>
              {" "}
              Question :{" "}
            </Box>
            <div className="card card-body bg-light">
              <Typography>{test.mcqQuestion.description}</Typography>
              {/* <Alert variant="primary"> */}
              <Typography>{test.mcqQuestion.mainQuestion}</Typography>
              {/* </Alert> */}
            </div>

            <CardContent>
              {/* <Box fontWeight="fontWeightBold" m={1}> Options :  </Box> */}
              <MenuList>
                {test.mcqQuestion.options.map((op) => {
                  if (test.mcqQuestion.correctAnswers[0].answer === op.option)
                    return <Alert variant="success">{op.option}</Alert>;
                  if (test.studentAnswer === op.option)
                    return <Alert variant="danger">{op.option}</Alert>;

                  return <MenuItem>{op.option}</MenuItem>;
                })}
              </MenuList>
            </CardContent>
          </Card>
          <br></br>
        </div>
      );
    });

  if (cqExamData)
    cq = cqExamData.studentAnswers.map((test) => {
      return (
        <din>
          <Card>
            <Box fontWeight="fontWeightBold" m={1}>
              {" "}
              Question :{" "}
            </Box>
            <div className="card card-body bg-light">
              <Typography>{test.cqQuestion.description}</Typography>
              {/* <Alert variant="primary"> */}
              <Typography>{test.cqQuestion.mainQuestion}</Typography>
              {/* </Alert> */}
            </div>

            <CardContent>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  <Box fontWeight="fontWeightBold" m={1}>
                    Ans :{" "}
                  </Box>
                </Form.Label>
                <Form.Control
                  value={test.studentAnswer}
                  disabled
                  as="textarea"
                  rows={3}
                />
              </Form.Group>

              {/* <Alert variant="success">{test.studentAnswer}</Alert> */}
            </CardContent>
          </Card>
          <br></br>
        </din>
      );
    });

  if (mcqExamsData) {
    return (
      <Tab.Container
        className="scroll-off"
        id="list-group-tabs-example"
        defaultActiveKey="#link1"
      >
        <Row>
          <Col sm={2} >
            <ListGroup variant="flush" className='align-items-center'>
              <ListGroup.Item action href="#link1">
                Exam Info
              </ListGroup.Item>
              <ListGroup.Item action href="#link2">
                Mark Sheet
              </ListGroup.Item>
              <ListGroup.Item action href="#link3">
                Reviews
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
                <ExamInfo mcqExamData={mcqExamsData[0]} />
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                <MarkSheet mcqExamsData={mcqExamsData} />
              </Tab.Pane>
              <Tab.Pane eventKey="#link3">Reports</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  } else if (mcqExamData || cqExamData)
    return (
      <Container style={{ marginTop: "5px" }}>
        <Alert variant="light">
          <h1 className="text-center">
            {mcqExamData ? mcqExamData.mcqExam.name : cqExamData.cqExam.name}
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
                      <td>Participated On</td>
                      <td>
                        {new Date(
                          mcqExamData
                            ? mcqExamData.submitOn
                            : cqExamData.submitOn
                        ).getDate()}
                        th{" "}
                        {
                          months[
                            new Date(
                              mcqExamData
                                ? mcqExamData.submitOn
                                : cqExamData.submitOn
                            ).getMonth()
                          ]
                        }
                        ,
                        {new Date(
                          mcqExamData
                            ? mcqExamData.submitOn
                            : cqExamData.submitOn
                        ).getFullYear()}{" "}
                        (
                        {
                          days[
                            new Date(
                              mcqExamData
                                ? mcqExamData.submitOn
                                : cqExamData.submitOn
                            ).getDay()
                          ]
                        }
                        )
                      </td>
                    </tr>
                    <tr>
                      <td>At</td>
                      <td>
                        {new Date(
                          mcqExamData
                            ? mcqExamData.mcqExam.date
                            : cqExamData.cqExam.date
                        ).getHours() < 10
                          ? "0" +
                            new Date(
                              mcqExamData
                                ? mcqExamData.mcqExam.date
                                : cqExamData.cqExam.date
                            ).getHours()
                          : new Date(
                              mcqExamData
                                ? mcqExamData.mcqExam.date
                                : cqExamData.cqExam.date
                            ).getHours()}
                        :
                        {new Date(
                          mcqExamData
                            ? mcqExamData.mcqExam.date
                            : cqExamData.cqExam.date
                        ).getMinutes() < 10
                          ? "0" +
                            new Date(
                              mcqExamData
                                ? mcqExamData.mcqExam.date
                                : cqExamData.cqExam.date
                            ).getMinutes()
                          : new Date(
                              mcqExamData
                                ? mcqExamData.mcqExam.date
                                : cqExamData.cqExam.date
                            ).getMinutes()}{" "}
                      </td>
                    </tr>
                    <tr>
                      <td>Total Time</td>
                      <td>
                        {mcqExamData
                          ? mcqExamData.mcqExam.totalTime
                          : cqExamData.cqExam.totalTime}{" "}
                        min
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
                      <td>
                        {mcqExamData ? mcqExamData.mark : cqExamData.mark}/
                        {mcqExamData
                          ? mcqExamData.mcqExam.totalMarks
                          : cqExamData.cqExam.totalMarks}
                      </td>
                    </tr>

                    <tr>
                      <td>Solved</td>
                      <td>{mcqExamData ? mcqExamData.solved : ""}</td>
                    </tr>

                    <tr>
                      <td>Wrong</td>
                      <td>{mcqExamData ? mcqExamData.wrong : ""}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col></Col>

          <Col></Col>
        </Row>
        {mcq ? mcq : cq}
      </Container>
    );
  else return <CircularProgress />;
};

export default PreviousExam;
