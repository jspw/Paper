import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import { makeStyles } from "@material-ui/core/styles";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Forms from "../Generic/Forms";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import "./Profile.scss";
import { LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    // margin: theme.spacing(1),
  },
  textField: {
    // width: "15vw",
    // margin: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  shadows: ["none"],
}));

export default function Profile(props) {
  let userdata;

  useEffect(() => {
    userdata = localStorage.getItem("data");
    userdata = JSON.parse(userdata);
    // if (userdata) userdata = userdata;
  }, []);

  console.log(props.userInfo);
  const classes = useStyles();

  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    error: "",
  });
  console.log(values.firstName);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  if (props.userInfo)
    return (
      <Container>
        <Row>
          <Col>
            <Row className="userName">
              <Col>
                <h3>{props.userInfo.firstName + ' ' + props.userInfo.lastName}</h3>
                <p>{props.userInfo.role}</p>
              </Col>
            </Row>
            <Row className="about">
              <Col>
                <h4>About</h4>
                <hr />
                <form>
                  <Row>
                    <Col>
                      <Forms
                        id="firstName"
                        type="textField"
                        label="First Name"
                        labelWidth={78}
                        classes={classes}
                        handleChange={handleChange}
                        required={false}
                        defaultValue={props.userInfo.firstName}
                      />
                    </Col>
                    <Col>
                      <Forms
                        id="lastName"
                        type="textField"
                        label="Last Name"
                        labelWidth={78}
                        classes={classes}
                        defaultValue={props.userInfo.lastName}
                        handleChange={handleChange}
                        required={false}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Forms
                        id="regNo"
                        type="textField"
                        label="Registration No"
                        labelWidth={120}
                        classes={classes}
                        defaultValue={props.userInfo.registrationNo}
                        handleChange={handleChange}
                        disabled={true}
                      />
                    </Col>
                    <Col>
                      <Forms
                        id="session"
                        type="textField"
                        label="Session"
                        labelWidth={117}
                        classes={classes}
                        handleChange={handleChange}
                        defaultValue={props.userInfo.session}
                        disabled={true}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Forms
                        id="university"
                        type="textField"
                        label="University"
                        labelWidth={117}
                        classes={classes}
                        handleChange={handleChange}
                        defaultValue={props.userInfo.varsity}
                        disabled={true}
                      />
                    </Col>
                    <Col>
                      <Forms
                        id="department"
                        type="textField"
                        label="Department"
                        labelWidth={120}
                        classes={classes}
                        defaultValue={props.userInfo.department}
                        handleChange={handleChange}
                        disabled={true}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Forms
                        id="designation"
                        type="textField"
                        label="Designation"
                        labelWidth={117}
                        classes={classes}
                        handleChange={handleChange}
                        defaultValue={
                          props.userInfo.role === "Student"
                            ? props.userInfo.role
                            : props.userInfo.designation
                        }
                        disabled={true}
                      />
                    </Col>
                    <Col>
                      <Forms
                        id="email"
                        type="textField"
                        label="Email Address"
                        labelWidth={120}
                        classes={classes}
                        defaultValue={props.userInfo.email}
                        handleChange={handleChange}
                        disabled={true}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Forms
                        id="password"
                        label="Password"
                        type="password"
                        labelWidth={80}
                        classes={classes}
                        values={values.password}
                        handleChange={handleChange}
                      />
                    </Col>
                    <Col>
                      <Forms
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        labelWidth={140}
                        classes={classes}
                        values={values.confirmPassword}
                        handleChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col xs="auto">
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        type="submit"
                        style={{
                          marginTop: "15%",
                          marginBottom: "10%",
                          backgroundColor: "#3F7CAC",
                        }}
                      >
                        Save Changes
                      </Button>
                    </Col>
                  </Row>
                </form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  else return <LinearProgress />;
}
