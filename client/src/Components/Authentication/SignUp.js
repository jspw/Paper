import React, { useState } from "react";
import { Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Forms from "./Forms";
import Grid from '@material-ui/core/Grid';
import "./SignIn.css";

const apiDomain = "http://95572ad1dd4e.ngrok.io/";

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
    marginTop: theme.spacing(1),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    role: "",
    designation: "",
    university: "",
    department: "",
    session: "",
    regNo: "",
    result: "",
  });

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: apiDomain + "university/all",
  //   })
  //     .then((response) => {
  //       // console.log("All Universites..");

  //       // console.log(response.data);

  //       const data = response.data;

  //       if (data.status === "OK") {
  //         setUniversities(data.result.data);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  // console.log("API CALL DATA", universities);

  const obj = {
    role: values.role,
    username: values.username,
    email: values.email,
    password: values.password,
    repassword: values.confirmPassword,
    firstName: values.firstName,
    lastName: values.lastName,
    department: values.department,
    registrationNo: parseInt(values.regNo, 10),
    session: values.session,
    varsity: values.university,
  };

  const body = JSON.stringify(obj);

  const handleSignUp = (e) => {
    temp();
    e.preventDefault();
  };
  const temp = async () => {
    let endpoint;
    if (values.role === "teacher") endpoint = "auth/create-teacher";
    else endpoint = "auth/create-student";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    };
    const response = await fetch(`${apiDomain}${endpoint}`, requestOptions);
    const data = await response.json();
    console.log(data);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  // if (universities)
  return (
    <Container>
      {/*         <Grid item alignItems="flex-start" justify="flex-start">
          <h2>Hello There!!</h2>
          <p>Lets Sign Up to continue</p>
        </Grid> */}
      <Grid container justify="center" alignItems="center">
        <form onSubmit={handleSignUp}>
          <Grid item xs={12}>
            <Forms
              id="role"
              type="select"
              label="Role"
              labelWidth={112}
              classes={classes}
              values={values.role}
              handleChange={handleChange}
            />
          </Grid>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <Forms
                id="university"
                type="select"
                label="University"
                labelWidth={112}
                classes={classes}
                values={values.university}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Forms
                selectedUniversity={values.university}
                id="department"
                type="select"
                label="Department"
                labelWidth={112}
                classes={classes}
                values={values.department}
                handleChange={handleChange}
              />
            </Grid>
          </Grid>
          {values.role !== "Teacher" ? (
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} sm={6}>
                <Forms
                  id="session"
                  type="select"
                  label="Session"
                  labelWidth={112}
                  classes={classes}
                  values={values.session}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Forms
                  id="regNo"
                  type="text"
                  label="Registration No"
                  labelWidth={112}
                  classes={classes}
                  values={values.regNo}
                  handleChange={handleChange}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Forms
                id="designation"
                type="select"
                label="Designation"
                labelWidth={112}
                classes={classes}
                values={values.designation}
                handleChange={handleChange}
              />
            </Grid>
          )}
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <Forms
                id="firstName"
                type="text"
                label="First Name"
                labelWidth={78}
                classes={classes}
                values={values.firstName}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Forms
                id="lastName"
                type="text"
                label="Last Name"
                labelWidth={78}
                classes={classes}
                values={values.lastName}
                handleChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <Forms
                id="username"
                type="text"
                label="Username"
                labelWidth={73}
                classes={classes}
                values={values.username}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Forms
                id="email"
                type="text"
                label="Email Address"
                labelWidth={102}
                classes={classes}
                values={values.email}
                handleChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <Forms
                id="password"
                label="Password"
                type="password"
                labelWidth={70}
                classes={classes}
                values={values.password}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Forms
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                labelWidth={135}
                classes={classes}
                values={values.confirmPassword}
                handleChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.textField}>
            <Button variant="contained" value="Sign Up" type="submit" fullWidth>
              Sign Up
            </Button>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
  // else return <h1>Loading</h1>;
}
