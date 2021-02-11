import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './LandingPage.scss';

export default function(){
    return (
      <Container fluid className="root">
        <Row>
          <Col>
            <Row className="header">
              <Col className="heading" xs="auto">
                <h1 className="heading">paper</h1>
              </Col>
              <Col>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
} 