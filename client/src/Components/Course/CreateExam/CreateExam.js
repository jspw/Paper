import React from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import axios from "axios";
import { Toast } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Question from "./Question";
import "./CreateExam.scss";

const { TabPane } = Tabs;

export default class CreateCourse extends React.Component {
  constructor(props) {
    super(props);
  }

  questionIDs = [];
  newTabIndex = 0;
  quesNo = 2;
  totalMarks = 0;
  totalTime = 0;

  addQuestion = (id, marks, time) => {
    this.setState({
      showToast: true,
      examCreateMessage: "Question Created Successfully",
    });

    console.log("mcq Question Id !", id);
    console.log("Mark !", marks);
    console.log("Time!", time);

    this.totalMarks += marks
    this.totalTime += time;

    if (this.props.examType === "CQ")
      this.questionIDs.push({
        cqQuestionId: id,
      });
    else {
      this.questionIDs.push({
        mcqQuestionId: id,
      });
    }

    console.log(this.questionIDs);
  };

  createExam = (date, examName) => {
    console.log("Date ", date);
    console.log("Name ", examName);

    let data;

    if (this.props.examType === "CQ")
      data = JSON.stringify({
        course: this.props.courseData._id,
        cqQuestions: this.questionIDs,
        totalTime: this.totalTime,
        totalMarks: this.totalMarks,
        date: date,
        name: examName,
      });
    else
      data = JSON.stringify({
        course: this.props.courseData._id,
        mcqQuestions: this.questionIDs,
        totalTime: this.totalTime,
        totalMarks: this.totalMarks,
        date: date,
        name: examName,
      });

    axios({
      method: "POST",
      url: `teacher/exam/${this.props.examType === "CQ" ? "cq" : "mcq"}/create`,

      headers: { "Content-Type": "application/json" },

      data: data,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "OK") {
          this.setState({
            showToast: true,
            examCreateMessage: "Exam Created Successfully",
          });
        } else
          this.setState({
            showToast: true,
            examCreateMessage: "Exam Created Successfully",
          });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          showToast: true,
          examCreateMessage: "Something Went Wrong!",
        });
      });
  };

  initialPanes = [
    {
      title: "Question 1",
      content: (
        <Question
          onAdd={this.addQuestion}
          createExam={this.createExam}
          totalMarks={this.totalMarks}
          totalTime={this.totalTime}
          examType={this.props.examType}
        />
      ),
      key: "1",
      closable: false,
    },
  ];

  state = {
    activeKey: this.initialPanes[0].key,
    panes: this.initialPanes,
    showToast: false,
    examCreateMessage: null,
    create: true,
  };

  onChange = (activeKey) => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `question${this.newTabIndex++}`;
    const newPanes = [...panes];
    newPanes.push({
      title: `Question ${this.quesNo++}`,
      content: (
        <Question
          onAdd={this.addQuestion}
          createExam={this.createExam}
          totalMarks={this.totalMarks}
          totalTime={this.totalTime}
          examType={this.props.examType}
        />
      ),
      key: activeKey,
    });
    this.setState({
      panes: newPanes,
      activeKey,
    });
  };

  remove = (targetKey) => {
    const { panes, activeKey } = this.state;
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    this.setState({
      panes: newPanes,
      activeKey: newActiveKey,
    });
  };

  render() {
    const { panes, activeKey } = this.state;
    return (
      <Container fluid className="justify-content-center">
        <Toast
          autohide
          className="toast-modify"
          onClose={() => this.setState({ showToast: false })}
          show={this.state.showToast}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Create Message</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{this.state.examCreateMessage}</Toast.Body>
        </Toast>
        <Tabs
          type="editable-card"
          onChange={this.onChange}
          activeKey={activeKey}
          onEdit={this.onEdit}
        >
          {panes.map((pane) => (
            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
              {pane.content}
            </TabPane>
          ))}
        </Tabs>
      </Container>
    );
  }
}
