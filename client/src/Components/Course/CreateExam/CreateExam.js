import React from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import Question from "./Question";
import axios from "axios";
import { Toast } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Forms from "../../Generic/Forms";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import './CreateExam.scss';

const { TabPane } = Tabs;

export default class CreateCourse extends React.Component {
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

    this.totalMarks += parseInt(marks, 10);
    this.totalTime += time;
    this.questionIDs.push({
      mcqQuestionId: id,
    });
    console.log("mcq Question Id !", id);
    console.log("Mark !", this.totalMarks);
    console.log("Time!", this.totalTime);
  };

  createExam = (date, examName) => {
    console.log("Date ", date);
    console.log("Name ", examName);

    axios({
      method: "POST",
      url: "teacher/exam/mcq/create",

      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        course: this.props.courseData._id,
        mcqQuestions: this.questionIDs,
        totalTime: this.totalTime,
        totalMarks: this.totalMarks,
        date: date,
        name: examName,
      }),
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
        // examType={this.state.examType}
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
    examType: '',
  };
  handleChange = (event) => {
    this.setState({
      examType: event.target.value,
    })
    console.log(event.target.value);
  }
  handleSubmit = () => {
    this.setState({
      create: false,
    })
  }
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
          examType = {this.state.examType}
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
        {this.state.create ? (
          <Row>
            <Col>
              <Row>
                <Col xs={12} md={12}>
                  <h3>Create Exam</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4>Instructions</h4>
                  <ul>
                    <li>
                      Select exam type from below form and then click Create
                      Exam to proceed.
                    </li>
                    <li>You can create as many queston as you like.</li>
                    <li>
                      For every queston you have to set a specific time limit
                      for your student to answer that question.
                    </li>
                    <li>Also you have to specify marks for every question.</li>
                    <li>When your question set is ready click Lock Exam.</li>
                    <li>
                      Then you'll need to give your exam a name and a start
                      schedule.
                    </li>
                  </ul>
                </Col>
              </Row>
              <form onSubmit={this.handleSubmit}>
                <Row>
                  <Col xs={12} md={12}>
                    <FormControl style={{ minWidth: "10rem" }} required>
                      <InputLabel id="examType">Exam Type</InputLabel>
                      <Select
                        id="examType"
                        value={this.state.examType}
                        onChange={this.handleChange}
                      >
                        <MenuItem disabled>Exam Type</MenuItem>
                        <MenuItem value="mcq">MCQ</MenuItem>
                        <MenuItem value="CQ">CQ</MenuItem>
                      </Select>
                    </FormControl>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} lg={{ span: 2, offset: 5 }} style={{ marginTop: "2rem" }}>
                    <Button variant="outlined" color="primary" type="submit">
                      Create Exam
                    </Button>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        ) : (
          <>
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
                <TabPane
                  tab={pane.title}
                  key={pane.key}
                  closable={pane.closable}
                >
                  {pane.content}
                </TabPane>
              ))}
            </Tabs>
          </>
        )}
      </Container>
    );
  }
}
