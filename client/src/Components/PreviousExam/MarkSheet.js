import React from "react";

const MarkSheet = (props) => {
  const mcqExamsData = props.mcqExamsData;
  let x = 1;

  const tableBody = mcqExamsData.map((data) => {
    console.log(data);
    return (
      <>
        <tr>
          <td>{x++}</td>
          <td>
            <span class="crown badge" style={{ fontSize: "20px" }}>
              {x == 2 ? "👑" : ""}
            </span>
            {`${data.student.firstName} ${data.student.lastName} ${data.student.username}`}
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
};

export default MarkSheet;
