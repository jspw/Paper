import React, { useEffect, useState } from "react";

import { Col, Container, Row, Form, Card, Table } from "react-bootstrap";

import { Alert, AlertTitle } from "@material-ui/lab";

import TextField from "@material-ui/core/TextField";

import axios from "axios";

import MarkSheet from "./MarkSheet";
import { makeStyles } from "@material-ui/core/styles";
import LinearIndeterminate from "../Generic/Loader";

import CircularProgress from "@material-ui/core/CircularProgress";
import { Box, Button, CardContent, Grid, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

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

  const [cqExamsData, setCqExamsData] = useState(null);

  const [onlyExamInfo, setOnlyExamInfo] = useState(null);

  const [examined, setExamined] = useState(false);

  const [index, setindex] = useState(0);
  const [mark, setmark] = useState([]);

  const [marks, setmarks] = useState([]);

  let cq;

  useEffect(() => {
    let examType = "mcq";
    const endpoint = `teacher/exam/cq/submits/${id}`;

    axios
      .get(endpoint)
      .then((response) => {
        console.log(response.data);
        if (response.data.status == "OK") {
          console.log("ONCQ?", response.data.result.data);
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
    console.log(id, " X ", mark);
    if (mark)
      marks.push({
        cqQuestion: id,
        mark: parseInt(mark, 10),
      });

    console.log("marks", marks);
  };

  const handleChange = (e) => {
    setmark(e.target.value);
  };

  const postMarks = () => {
    const url = `teacher/examine/cq/${cqExamsData[index]._id}`;

    let totalMarks = 0;

    marks.forEach((marxk) => {
      console.log(marxk.mark);
      totalMarks += parseInt(marxk.mark, 10);
    });
    console.log(marks);

    const data = JSON.stringify({
      student: cqExamsData[index].student._id,
      marks: marks,
      totalMarks: totalMarks,
    });

    console.log("submit data", data);

    axios({
      method: "POST",
      url: url,

      headers: { "Content-Type": "application/json" },
      data: data,
    })
      .then((response) => {
        console.log(response.data);
        setmark("");
        setmarks([]);
        if (response.data.status === "OK") {
          if (index + 1 < cqExamsData.length) setindex((index) => index + 1);
          else setExamined(true);
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
                {`Time : ${Math.round(cqx.cqQuestionId.time / 60)}  min  ${
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
                    cqExamsData[index].studentAnswers[i]
                      ? cqExamsData[index].studentAnswers[i].studentAnswer
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
                  id={cqx.cqQuestionId._id}
                  //   defaultValue="Small"
                  type="Number"
                  value={mark}
                  variant="outlined"
                  onChange={handleChange}
                  size="small"
                  required
                />
                <button
                  onClick={() => addMark(cqx.cqQuestionId._id)}
                  type="input"
                  className="btn btn-info"
                >
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

        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          Anonymous Student Account —{" "}
          <strong>check it out and give score!</strong>
        </Alert>

        {/* {studentInfo} */}

        {examined ? (
          <>
            <h2>All papers are checked!</h2>{" "}
            <Button variant='contained' color='secondary' href={`/previous-exam/${cqExamsData[0].cqExam._id}`}>
              View All
            </Button>
          </>
        ) : (
          cq
        )}

        {examined ? (
          ""
        ) : (
          <button onClick={postMarks} className="btn btn-primary">
            Submit
          </button>
        )}

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
