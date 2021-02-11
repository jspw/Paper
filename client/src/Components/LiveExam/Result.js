import { Button } from "@material-ui/core";
import React from "react";
import { Col, Container, Row, Alert } from "react-bootstrap";
import LinearIndeterminate from "../Generic/Loader";
import "./LiveExam.scss";

const Result = (props) => {
  if (props.result)
    return (
      <Container fluid className="root ">
        <Row className="justify-content-center">
          <Col xs={7} className="exam">
            <Row className="justify-content-center">
              <Col xs="auto">
                <br></br>
                {/* <Jumbotron> */}
                <h1>Exam Finished!</h1>
                <p>
                  <div className="justify-content-center">
                    {props.examType === "mcq" ? (
                      <Alert
                        variant={props.result.mark > 0 ? "success" : "danger"}
                      >
                        {props.result.mark > 0
                          ? `Congrats You have Scored ${props.result.mark}`
                          : `Oho! You have Scored ${props.result.mark}`}
                      </Alert>
                    ) : (
                      <Alert variant="info">
                        You will be notified when result publish.
                      </Alert>
                    )}
                  </div>
                  <div className="justify-content-center">
                    <Button
                      variant="outlined"
                      href={`/previous-exam/${props.examID}`}
                    >
                      View Detail
                    </Button>
                  </div>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  else return <LinearIndeterminate />;
};

export default Result;
