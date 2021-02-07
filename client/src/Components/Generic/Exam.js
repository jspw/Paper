import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Exam(props) {
  // const { match } = props;

  // console.log("Exam id",match);
  console.log("props... ", props);

  let { id } = useParams();
  console.log("ID", id);

  const [examData, setExamData] = useState(null);

  const [timer, setTimer] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    if (props.userInfo)
      axios.get(`${props.userInfo.role}/exam/${id}`).then((response) => {
        const data = response.data;
        setExamData(data.result.data);
      });
  }, []);

  console.log("Exam Data", examData);

  let examQuestionUi;

  if (examData && examData.mcqQuestions) {
    examQuestionUi = examData.mcqQuestions.map((question) => {
      return (
        <Card>
          <CardContent>
            <Typography>{question.mcqQuestionId.description}</Typography>

            <Typography>{question.mcqQuestionId.mainQuestion}</Typography>

            <List>
              {question.mcqQuestionId.options.map((options) => {
                return (
                  <ListItem>
                    <CardActions Button>{options.option}</CardActions>
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
          <Divider />
        </Card>
      );
    });
  } else if (examData && examData.cqQuestions) {
    examQuestionUi = examData.cqQuestions.map((question) => {
      return (
        <Card>
          <CardContent>
            <Typography>{question.cqQuestionId.description}</Typography>

            <Typography>{question.cqQuestionId.mainQuestion}</Typography>
            <TextField
              id="outlined-textarea"
              label="Ans"
              placeholder="Write here"
              multiline
              variant="outlined"
            />
          </CardContent>
          <Divider />
        </Card>
      );
    });
  }

  let x = 0;

  if (examData)
    setInterval(() => {
      const date = new Date();
      setTimer(date.getSeconds());
    }, 1000);

  if (examData)
    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper>
              <Typography variant="h2" component="h2">
                {examData.name}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              {" "}
              <h3>{timer}</h3>
            </Paper>
          </Grid>
        </Grid>

        <Grid>{examQuestionUi}</Grid>
        <Button onClick={() => x++}>Next</Button>
      </Container>
    );
  else return <CircularProgress />;
}
