import React from "react";
import {
  Col,
  Container,
  Row,
  Alert,
} from "react-bootstrap";
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
                      <Alert
                        variant={props.result.mark > 0 ? "success" : "danger"}
                      >
                        {props.result.mark > 0
                          ? `Congrats You have Scored ${props.result.mark}`
                          : `Oho! You have Scored ${props.result.mark}`}
                      </Alert>
                    </div>
                  </p>
                {/* </Jumbotron> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
};

export default Result;
