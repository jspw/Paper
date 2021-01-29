import React, { useEffect, useState } from "react";

import {
  Button,
  Col,
  Container,
  Row,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";

import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:8080/";

const Layout = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [response, setResponse] = useState(1);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("mcqTimeLimit", (data) => {
      setResponse(data);
      console.log("Socket", data);
    });
    // return socket.disconnect();
  }, []);

  console.log("OO",response);

  const SelectForm = () => {
    let items = [];

    if (props.universityInfo) {
      props.universityInfo.forEach((element) => {
        if (element.shortform === props.userInfo.varsity) {
          element.departments.forEach((dept) => {
            // console.log(dept);
            items.push({
              id: dept._id,
              value: dept.shortform,
            });
          });
        }
      });
    }

    const menuItems = items.map((item, i) => {
      // console.log(items);
      return (
        <MenuItem key={i} value={item.id}>
          {item.value}
        </MenuItem>
      );
    });

    return (
      <FormControl variant="outlined" fullWidth required>
        <InputLabel>{props.label}</InputLabel>
        <Select value={props.values} label={props.label}>
          <MenuItem disabled>
            <em>{props.label}</em>
          </MenuItem>
          {menuItems}
        </Select>
      </FormControl>
    );
  };

  const createCourseModal = (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Control placeholder="Course Name" />
            </Col>
            <Col>
              <Form.Control placeholder="Code" />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                readOnly
                defaultValue={
                  props.userInfo ? props.userInfo.varsity : "Loading"
                }
              />
            </Col>
            <Col>
              <SelectForm />
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>
  );
  if (props.userInfo)
    return (
      <Container bg="light" fluid>
      {/* //   {createCourseModal}
      //   <Row>
      //     <Col md={3}>Courses</Col>
      //     <Col md={6} backgroundColor="success">
      //       All Events
      //       <Button className="pull-right light" onClick={handleShowModal}>
      //         Create Course
      //       </Button> */}
            <div
              className={
                response < 10
                  ? "alert alert-info"
                  : response < 20
                  ? "alert alert-success"
                  : response < 30
                  ? "alert alert-primary"
                  : response < 40
                  ? "alert alert-secondary"
                  : "alert alert-danger"
              }
            >
              Time countdown : <strong>{response}</strong>
            </div>
      {/* //     </Col>
      //   </Row> */}
       </Container>
    );
  else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Please Login First</h1>
      </div>
    );
  }
};

export default Layout;
