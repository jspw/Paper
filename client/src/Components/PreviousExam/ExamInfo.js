import React from "react";
import { Col, Container, Row, Card, Alert, Table } from "react-bootstrap";
import MenuItem from "@material-ui/core/MenuItem";
import { Box, CardContent, MenuList, Typography } from "@material-ui/core";

import {
  Button,
  Modal,
  Form,
  Spinner,
  Jumbotron,
  Tab,
  TabContainer,
  ListGroup,
  TabContent,
  TabPane,
} from "react-bootstrap";

import "./PreviousExam.css";

const ExamInfo = (props) => {
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

  const mcqExamData = props.mcqExamData;
  const cqExamData = props.cqExamData;
  const onlyExamInfo = props.onlyExamInfo;
  let mcq;
  let cq;

  console.log("mcqExamData", mcqExamData);
  console.log("cqExamData", cqExamData);
  console.log("onlyExamInfo", onlyExamInfo);

  if (mcqExamData) {
    mcq = mcqExamData.mcqExam.mcqQuestions.map((questions) => {
      return (
        <div>
          <Card>
            <Box fontWeight="fontWeightBold" m={1}>
              {" "}
              Question :{" "}
            </Box>
            <div className="card card-body bg-light">
              <Typography>{questions.mcqQuestionId.description}</Typography>
              {/* <Alert variant="primary"> */}
              <Typography>{questions.mcqQuestionId.mainQuestion}</Typography>
              {/* </Alert> */}
            </div>

            <CardContent>
              {/* <Box fontWeight="fontWeightBold" m={1}> Options :  </Box> */}
              <MenuList>
                {questions.mcqQuestionId.options.map((op) => {
                  if (
                    questions.mcqQuestionId.correctAnswers[0].answer ===
                    op.option
                  )
                    return <Alert variant="success">{op.option}</Alert>;

                  return <MenuItem>{op.option}</MenuItem>;
                })}
              </MenuList>
            </CardContent>
          </Card>
          <br></br>
        </div>
      );
    });
  } else if (cqExamData) {
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
                  value={
                    cqExamData.studentAnswers[i]
                      ? cqExamData.studentAnswers[i].studentAnswer
                      : ""
                  }
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
  }

  if (onlyExamInfo) {
    if (onlyExamInfo.mcqQuestions)
      mcq = onlyExamInfo.mcqQuestions.map((questions) => {
        return (
          <div>
            <Card>
              <Box fontWeight="fontWeightBold" m={1}>
                {" "}
                Question :{" "}
              </Box>
              <div className="card card-body bg-light">
                <Typography>{questions.mcqQuestionId.description}</Typography>
                {/* <Alert variant="primary"> */}
                <Typography>{questions.mcqQuestionId.mainQuestion}</Typography>
                {/* </Alert> */}
              </div>

              <CardContent>
                {/* <Box fontWeight="fontWeightBold" m={1}> Options :  </Box> */}
                <MenuList>
                  {questions.mcqQuestionId.options.map((op) => {
                    if (
                      questions.mcqQuestionId.correctAnswers[0].answer ===
                      op.option
                    )
                      return <Alert variant="success">{op.option}</Alert>;

                    return <MenuItem>{op.option}</MenuItem>;
                  })}
                </MenuList>
              </CardContent>
            </Card>
            <br></br>
          </div>
        );
      });

    if (onlyExamInfo.cqQuestions)
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

              {/* <CardContent>
              <MenuList>
                {questions.mcqQuestionId.options.map((op) => {
                  if (
                    questions.mcqQuestionId.correctAnswers[0].answer ===
                    op.option
                  )
                    return <Alert variant="success">{op.option}</Alert>;

                  return <MenuItem>{op.option}</MenuItem>;
                })}
              </MenuList>
            </CardContent> */}
            </Card>
            <br></br>
          </div>
        );
      });

    return (
      <Container fluid style={{ marginTop: "5px" }}>
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
        <Container>{mcq ? mcq : cq}</Container>
      </Container>
    );
  } else
    return (
      <Container fluid style={{ marginTop: "5px" }}>
        <Alert variant="light">
          <h1 className="text-center">
            Exam Name :{" "}
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
                      <td>Date</td>
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
                        {mcqExamData
                          ? mcqExamData.mcqExam.totalMarks
                          : cqExamData.cqExam.totalMarks}
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
        </Row>
        <Container className="scroll">{mcq}</Container>
      </Container>
    );
};

export default ExamInfo;
