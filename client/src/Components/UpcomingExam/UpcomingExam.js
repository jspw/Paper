import React from "react";
import Timer from "../Timer/Timer";
import {
  Col,
  Container,
  Row,
  Alert,
  Table,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

const UpcomingExam = (props) => {
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

  console.log(props.userInfo);
  // console.log(id);

  let examInfo;
  props.userInfo.courses.map((course) => {
    //   console.log(course);
    course.course.cqExams.map((exam) => {
      //   console.log(exam.examId._id);
      if (exam.examId._id == id) {
        //   console.log(exam);
        examInfo = exam.examId;
      }
    });
    course.course.mcqExams.map((exam) => {
      //   console.log(exam.examId._id);
      if (exam.examId._id == id) examInfo = exam.examId;
    });
  });

  console.log(examInfo);

  return (
    <Container style={{backgroundColor: "white", paddingBottom: "3%"}}>
      <Alert variant="primary">
        <p className="text-center">Exam Has Not Started Yet</p>
      </Alert>
      {/* <Alert variant="light"> */}
      <h1 className="text-center">{examInfo.name}</h1>
      {/* </Alert> */}

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
                    <td>Time</td>
                    <td>
                      {new Date(examInfo.date).getHours() < 10
                        ? "0" + new Date(examInfo.date).getHours()
                        : new Date(examInfo.date).getHours()}
                      :
                      {new Date(examInfo.date).getMinutes() < 10
                        ? "0" + new Date(examInfo.date).getMinutes()
                        : new Date(examInfo.date).getMinutes()}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>
                      {new Date(examInfo.date).getDate()}th{" "}
                      {months[new Date(examInfo.date).getMonth()]},
                      {new Date(examInfo.date).getFullYear()} (
                      {days[new Date(examInfo.date).getDay()]})
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
                    <td>{examInfo.totalMarks}</td>
                  </tr>
                  <tr>
                    <td>Total Time</td>
                    <td>{examInfo.totalTime} min</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
      <Timer deadline={examInfo.date} />
    </Container>
  );
};

export default UpcomingExam;
