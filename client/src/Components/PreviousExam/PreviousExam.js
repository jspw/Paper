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
import LinearIndeterminate from "../Generic/Loader";

import CircularProgress from "@material-ui/core/CircularProgress";
import { Box, CardContent, MenuList, Typography } from "@material-ui/core";
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

  let userdata;
  userdata = localStorage.getItem("data");
  userdata = JSON.parse(userdata);

  let role ;
  
  role = userdata.role;

  const [mcqExamData, setMcqExamData] = useState(null);
  const [cqExamData, setCqExamData] = useState(null);
  const [mcqExamsData, setMcqExamsData] = useState(null);
  const [cqExamsData, setCqExamsData] = useState(null);

  const [onlyExamInfo, setOnlyExamInfo] = useState(null);

  let mcq;
  let cq;

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
        axios
          .get(`${role}/exam/${id}`)
          .then((response) => {
            setOnlyExamInfo(response.data.result.data);
          })
          .catch((error) => {
            console.log(error);
          });
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
        axios
          .get(`${role}/exam/${id}`)
          .then((response) => {
            setOnlyExamInfo(response.data.result.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, []);

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
  else if (cqExamData)
    cq = cqExamData.cqExam.cqQuestions.map((cqx, i) => {
      console.log(cqExamData);
      return (
        <div>
          <Card>
            <Box fontWeight="fontWeightBold" m={1}>
              {" "}
              Question : [ {`Marks : ${cqx.cqQuestionId.marks} || `}
              {`Time : ${cqx.cqQuestionId.time / 60}  min  ${
                cqx.cqQuestionId.time % 60
              } sec `}
              ]
            </Box>

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
                  value={cqExamData.studentAnswers[i] ? cqExamData.studentAnswers[i].studentAnswer : ''}
                  disabled
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
            </CardContent>
          </Card>
          <br></br>
        </div>
      );
    });

  if (role === "Teacher" && (mcqExamsData || onlyExamInfo || cqExamData)) {
    return (
      <Tab.Container
        className="scroll-off"
        id="list-group-tabs-example"
        defaultActiveKey="#exam-info"
      >
        <Row>
          <Col sm={2}>
            <ListGroup variant="flush" className="align-items-center">
              <ListGroup.Item action href="#exam-info">
                Exam Info
              </ListGroup.Item>
              <ListGroup.Item action href="#mark-sheet">
                Mark Sheet
              </ListGroup.Item>
              <ListGroup.Item action href="#reviews">
                Reviews
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="#exam-info">
                <ExamInfo
                  onlyExamInfo={onlyExamInfo}
                  mcqExamData={mcqExamsData ? mcqExamsData[0] : null}
                  cqExamData={cqExamsData ? cqExamsData[0] : null}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="#mark-sheet">
                <MarkSheet
                  mcqExamsData={mcqExamsData}
                  cqExamsData={cqExamsData}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="#reviews">Reports</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
  // else if()
  else if (role === "Student" && (mcqExamData || cqExamData))
    return (
      <Container style={{ marginTop: "5px", backgroundColor: "white" }}>
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
        <Container fluid>{mcq ? mcq : cq}</Container>
      </Container>
    );
  else if (onlyExamInfo && role === "Student")
    return (
      <Container>
        <div className="d-flex justify-content-center">
          <Alert variant="danger">You Haven't Participated In This Exam</Alert>
        </div>
        <ExamInfo onlyExamInfo={onlyExamInfo} />
      </Container>
    );
  else return <LinearIndeterminate />;
};

export default PreviousExam;
