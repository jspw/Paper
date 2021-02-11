import React from "react";
import {  Container } from "react-bootstrap";

import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const MarkSheet = (props) => {
  const mcqExamsData = props.mcqExamsData;
  const cqExamsData = props.cqExamsData;

  let tableBody;
  let x = 1;

  if (mcqExamsData) {
    mcqExamsData.sort(function (a, b) {
      return a.mark - b.mark;
    });

    console.log("Exam Data", mcqExamsData);

    tableBody = mcqExamsData.map((data) => {
      console.log(data);
      return (
        <>
          <tr>
            <td>{x++}</td>
            <td>
              <span class="crown badge" style={{ fontSize: "20px" }}>
                {x == 2 ? "👑" : ""}
              </span>
              {`${data.student.firstName ? data.student.firstName : ""} ${
                data.student.lastName ? data.student.lastName : ""
              } ${data.student.username}`}
            </td>
            <td>{data.student.registrationNo}</td>

            <td>
              <a href={`mailto: ${data.student.email}`}>{data.student.email}</a>
            </td>
            <td>{data.solved}</td>
            <td>{data.wrong}</td>
            <td>{data.mark}</td>
            <td>
              <a href={`${data.student._id}`}>View</a>
            </td>
          </tr>
        </>
      );
    });
  } else if (cqExamsData) {
    cqExamsData.sort(function (a, b) {
      return a.mark - b.mark;
    });

    console.log("Exam Data", cqExamsData);

    tableBody = cqExamsData.map((data) => {
      console.log(data);
      return (
        <>
          <tr>
            <td>{x++}</td>
            <td>
              <span class="crown badge" style={{ fontSize: "20px" }}>
                {x == 2 ? "👑" : ""}
              </span>
              {`${data.student.firstName ? data.student.firstName : ""} ${
                data.student.lastName ? data.student.lastName : ""
              } ${data.student.username}`}
            </td>
            <td>{data.student.registrationNo}</td>

            <td>
              <a href={`mailto: ${data.student.email}`}>{data.student.email}</a>
            </td>
            <td>{data.totalMarks}</td>
            <td>{data.wrong}</td>
            <td>{data.mark}</td>
            <td>
              <a href={`/examine/${data.cqExam._id}`}>View</a>
            </td>
          </tr>
        </>
      );
    });
  }

  if (mcqExamsData || cqExamsData)
    return (
      <table
        className="table table-hover table-striped table-light"
        style={{ textAlign: "center" }}
      >
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Registration No</th>
            <th>Email</th>
            <th>Solved</th>
            <th>Wrong</th>
            <th>Mark</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>{tableBody}</tbody>
      </table>
    );
  else
    return (
      <Container>
        <div className="d-flex justify-content-center">
          <Alert variant="warning">No Participants</Alert>
        </div>
      </Container>
    );
};

export default MarkSheet;
