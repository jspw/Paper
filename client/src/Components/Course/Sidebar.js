import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IoCreate } from "react-icons/io5";
import { IoClipboard } from "react-icons/io5";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import "./Sidebar.scss";
import ExamType from "./CreateExam/ExamType";
import Students from './Students';
import Exams from "./Exams";

export default function Sidebar(props) {
  let displayContent;

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [content, setContent] = useState("");
  const handleClick = (prop) => (event) => {
    setContent(prop);
  };
  console.log(content);
  if (content === "createExam")
    displayContent = (
      <ExamType className="content" courseData={props.courseData} />
    );
  else if (content === "exams")
    displayContent = (
      <Exams
        className="content"
        userInfo={props.userInfo}
        courseData={props.courseData}
      />
    );
  else if (content === "students")
    displayContent = (
      <Students
        className="content"
        userInfo={props.userInfo}
        courseData={props.courseData}
      />
    );

  return (
    <div className="parent">
      <div className={sidebar ? "sidebar active" : "sidebar"}>
        <ul className="sidebar__nav">
          <li className="sidebar__logo">
            <Row>
              <span className="sidebar__item__link" onClick={showSidebar}>
                <Col xs={4} className="sidebar__item__text">
                  {props.courseData.code}
                </Col>
                <Col xs={sidebar ? { span: 4, offset: 2 } : {}}>
                  <FaAngleDoubleRight className="sidebar__item__icon" />
                </Col>
              </span>
            </Row>
          </li>
          {props.userInfo.role === "Teacher" ? (
            <li className="sidebar__item">
              <a
                href="#create-exam"
                id="create-exam"
                className="sidebar__item__link"
                onClick={handleClick("createExam")}
              >
                <IoCreate className="sidebar__item__icon" />
                <span className="sidebar__item__text">Create Exam</span>
              </a>
            </li>
          ) : (
            ""
          )}
          <li className="sidebar__item">
            <a
              href="#exams"
              id="exams"
              className="sidebar__item__link"
              onClick={handleClick("exams")}
            >
              <IoClipboard className="sidebar__item__icon" />
              <span className="sidebar__item__text">Exams</span>
            </a>
          </li>
          <li className="sidebar__item">
            <a
              href="#students"
              id="students"
              className="sidebar__item__link"
              onClick={handleClick("students")}
            >
              <FaUsers className="sidebar__item__icon" />
              <span className="sidebar__item__text">Students</span>
            </a>
          </li>
          <li className="sidebar__item">
            <a
              href="#teacher"
              id="teacher"
              className="sidebar__item__link"
              onClick={handleClick("teacher")}
            >
              <FaChalkboardTeacher className="sidebar__item__icon" />
              <span className="sidebar__item__text">Teacher</span>
            </a>
          </li>
          <li className="sidebar__item">
            <a
              href="#info"
              id="info"
              className="sidebar__item__link"
              onClick={handleClick("info")}
            >
              <FaInfoCircle className="sidebar__item__icon" />
              <span className="sidebar__item__text">Course Info</span>
            </a>
          </li>
        </ul>
      </div>
      <div className={sidebar ? "content__small" : "content__large"}>
        {displayContent}
      </div>
    </div>
  );
}
