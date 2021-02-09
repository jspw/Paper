import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Modal,
  Form,
} from "react-bootstrap";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const Layout = (props) => {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

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

  return (
    <Container>
      <Button onClick={handleShowModal}>Create Course </Button>;
    </Container>
  );
};

export default Layout;
