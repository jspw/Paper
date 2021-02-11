import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function(props) {
    const name = props.courseData.name;
    return (
      <Container>
        <Row>
          <Col>
            <h1>Course Info</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Name</h5>
          </Col>
          <Col>
            <h5>{name}</h5>
          </Col>
        </Row>
        <Row>
        <Col>
            <h5>Department</h5>
          </Col>
          <Col>
            <h5>{props.userInfo.department}</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>University</h5>
          </Col>
          <Col>
            <h5>{props.userInfo.varsity}</h5>
          </Col>
        </Row>
      </Container>
    );
}