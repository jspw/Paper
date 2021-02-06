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
} from "react-bootstrap";

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  CardContent,
  CardHeader,
  List,
  ListItem,
  Menu,
  MenuList,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router-dom";

const PreviousExam = (props) => {

  const id = useParams();

  const examData = {
    _id: "60158e6e5e798487dd0d985f",
    name: "Compipitive Programming TT1",
    totalMarks: 10,
    totalTime: 30,
    mcqQuestions: [
      {
        mcqQuestionId: {
          description:
            "Jokhon porbe na mor payer chinho ei pothe.Ami baibo na baibonago kheya tori ei ghat e.Jokhon porbe na mor payer chinho ei pothe.Ami baibo na baibonago kheya tori ei ghat eJokhon porbe na mor payer chinho ei pothe.Ami baibo na baibonago kheya tori ei ghat e",
          mainQuestion: "What is the name of the movie?",
          marks: 2,
          options: [
            {
              option: "Sania",
            },
            {
              option: "Vxd",
            },
            {
              option: "Abul",
            },
            {
              option: "Vxd",
            },
          ],
          selected: "Vxd",
          correctAnswer: "Sania",
        },
      },
      {
        mcqQuestionId: {
          description: "How are doy ? ds soow ad . sda sdsda",
          mainQuestion: "What is your name ?",
          marks: 2,
          options: [
            {
              option: "Abul",
            },
            {
              option: "Vxd",
            },
            {
              option: "Shifat",
            },
          ],
          selected: "Abul",
          correctAnswer: "Shifat",
        },
      },
      {
        mcqQuestionId: {
          description: "",
          mainQuestion: "What is your name ?",
          marks: 2,
          options: [
            {
              option: "Abul",
            },
            {
              option: "Vxd",
            },
          ],
          selected: "Vxd",
          correctAnswer: "Vxd",
        },
      },
    ],
  };

  const mcq = examData.mcqQuestions.map((exam) => {
    return (
      <Card>
        <Jumbotron>
          <Typography>{exam.mcqQuestionId.description}</Typography>
          {/* <Alert variant="primary"> */}
          <Typography>{exam.mcqQuestionId.mainQuestion}</Typography>
          {/* </Alert> */}
        </Jumbotron>

        <CardContent>
          <MenuList>
            {exam.mcqQuestionId.options.map((op) => {
              if (exam.mcqQuestionId.correctAnswer === op.option)
                return <Alert variant="success">{op.option}</Alert>;
              if (exam.mcqQuestionId.selected === op.option)
                return <Alert variant="danger">{op.option}</Alert>;
              return <MenuItem>{op.option}</MenuItem>;
            })}
          </MenuList>
        </CardContent>
      </Card>
    );
  });

  return (
    <Container>
      <h1 className="text-center">{examData.name}</h1>
      <Row>
        <Col></Col>

        <Col></Col>
      </Row>
      {mcq}
    </Container>
  );
};

export default PreviousExam;
