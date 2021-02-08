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

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Box,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Menu,
  MenuList,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router-dom";

import {
  DataGrid,
  getNumericColumnOperators,
  PreferencePanelsValue,
} from "@material-ui/data-grid";

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

  const mcq = mcqExamData.studentAnswers.map((test) => {
    return (
      <din>
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

                return <MenuItem>{op.option}</MenuItem>;
              })}
            </MenuList>
          </CardContent>
        </Card>
        <br></br>
      </din>
    );
  });

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
                        mcqExamData ? mcqExamData.submitOn : cqExamData.submitOn
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
                        mcqExamData ? mcqExamData.submitOn : cqExamData.submitOn
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
      <Container className ="scroll">{mcq}</Container>
    </Container>
  );
};

export default ExamInfo;
