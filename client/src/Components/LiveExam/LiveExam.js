import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@material-ui/core/Button';
import './LiveExam.scss';


export default function LiveExam(props) {
  const [value, setValue] = React.useState("");
  const [index, setIndex] = React.useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  const questions = [
    {
      q: "what is the question?",
      optA: "option a",
      optB: "option b",
      optC: "option c",
      optD: "option d",
    },
    {
      q: "what is the question? 2",
      optA: "option a",
      optB: "option b",
      optC: "option c",
      optD: "option d",
    },
  ];

  const nextQuestion = (event) => {
      if(index <= questions.length) setIndex(index + 1);
      else setIndex(index);
  }

  return (
    <Container fluid className="root ">
      <Row className="justify-content-center">
        <Col xs={7} className="exam">
          <Row className="exam__title justify-content-center">
            <Col xs="auto">
              <h4>Exam Name</h4>
            </Col>
          </Row>
          <Row className="exam__question">
            <Col>
              <h5>{questions[index].q}</h5>
            </Col>
          </Row>
          <Row className="exam__options">
            <Col xs={12}>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  aria-label="ans"
                  name="ans"
                  value={value}
                  onChange={handleChange}
                >
                  <Row className="option" xs={12}>
                    <Col xs={12}>
                      <FormControlLabel
                        value="optA"
                        control={<Radio color="primary" />}
                        label="Option A"
                      />
                    </Col>
                  </Row>
                  <Row className="option">
                    <Col xs={12}>
                      <FormControlLabel
                        value="optB"
                        control={<Radio color="primary" />}
                        label="Option B"
                      />
                    </Col>
                  </Row>
                  <Row className="option">
                    <Col xs={12}>
                      <FormControlLabel
                        value="optC"
                        control={<Radio color="primary" />}
                        label="Option C"
                      />
                    </Col>
                  </Row>
                  <Row className="option">
                    <Col xs={12}>
                      <FormControlLabel
                        value="optD"
                        control={<Radio color="primary" />}
                        label="Option D"
                      />
                    </Col>
                  </Row>
                </RadioGroup>
              </FormControl>
            </Col>
          </Row>
          <Row className="exam__buttons d-flex justify-content-between">
            <Col>
              <span className="timer">
                <b>00:00</b>
              </span>
            </Col>
            <Col xs="auto">
              <Button variant="contained" color="default" onClick={nextQuestion} disableElevation disabled={index+1 == questions.length && true}>
                Next
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}