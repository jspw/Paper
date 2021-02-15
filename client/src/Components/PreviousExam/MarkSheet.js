import React from "react";
import { Container } from "react-bootstrap";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MarkSheet = (props) => {
  const mcqExamsData = props.mcqExamsData;
  const cqExamsData = props.cqExamsData;

  let tableBody;
  let x = 1;

  const saveMarksheet = () => {
    html2canvas(document.querySelector("#resulttable")).then((canvas) => {
      // document.body.appendChild(canvas); // if you want see your screenshot in body.
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("marksheet.pdf");
    });
  };

  if (mcqExamsData) {
    mcqExamsData.sort(function (a, b) {
      return b.mark - a.mark;
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
            <td>{data.windowChanged}</td>
            <td>
              <a href={`${data.student._id}`}>View</a>
            </td>
          </tr>
        </>
      );
    });
  } else if (cqExamsData) {
    cqExamsData.sort(function (a, b) {
      return b.totalMarks - a.totalMarks;
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
            <td>{data.totalMarks}</td>
            <td>{data.windowChanged}</td>
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
      <div>
        <table
          id="resulttable"
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
              <th>Marks</th>
              <th>Window Changed</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>{tableBody}</tbody>
        </table>
        <button
          style={{ margin: "10px", position: "fixed", bottom: "0", right: "0" }}
          type="button"
          className="btn btn-outline-info btn-lg"
          onClick={saveMarksheet}
        >
          Print
        </button>
      </div>
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
