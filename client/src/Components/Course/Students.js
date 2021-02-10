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

const Students = (props) => {
  console.log(props.userInfo);
  console.log(props.courseData);

  let x = 1;
  const tableBody = props.courseData.students.map((students) => {
    return (
      <>
        <tr>
          <td>{x++}</td>
          {/* <td> */}
          {/* <span class="crown badge" style={{ fontSize: "20px" }}>
              {x == 2 ? "👑" : ""}
            </span> */}
          {/* {students.student} */}
          {/* </td> */}
          {/*   <td>{exam.examType}</td>
          <td>{exam.totalMarks}</td>
          <td>{`${Math.round(exam.totalTime / 60)} min : ${
            exam.totalTime % 60
          } sec`}</td>
          <td>{exam.when}</td>
          <td>{exam.date.toString()}</td>
          {props.userInfo.role === "Teacher" ? (
            <td>
              <Button href={`/profile/${tudents.student}`} variant="primary">
                Examine
              </Button>
            </td>
          ) : (
            null
          )} */}

          <td>
            <Button href={`/profile/${students.student}`} variant="primary">
              Examine
            </Button>
          </td>

          {/* <td>
            <Button href={`/${exam.when}-exam/${exam._id}`} variant="info">
              View
            </Button>
          </td> */}
        </tr>
      </>
    );
  });

  return (
    <table
      className="table table-hover table-striped table-light"
      style={{ textAlign: "center" }}
    >
      <thead className="thead-dark">
        <tr>
          <th>#</th>
          {/* <th>Exam Name</th>
          <th>Exam Type</th>
          <th>Total Marks</th>
          <th>Total Time</th>

          <th>Condition</th>
          <th>Date</th>
          {props.userInfo.role === "Teacher" ? <th>Check</th> : null} */}
          <th>Action</th>
        </tr>
      </thead>

      <tbody>{tableBody}</tbody>
    </table>
  );
};

export default Students;
