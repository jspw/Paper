import React, { useState } from "react";
import { Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Forms from "./Forms";
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import "./SignIn.css";

const apiDomain = "";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(2),
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignUp() {
  const classes = useStyles();

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "error",
  });

  const obj = {
    email: values.email,
    password: values.password,
  };

  const body = JSON.stringify(obj);

  const handleSignIn = (e) => {
    fetchData();
    e.preventDefault();
  };
  const fetchData = async () => {
    const endpoint = "";
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
  return (
    <Container>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ marginTop: "4%" }}
      >
        <Grid container justify="center" alignItems="center">
          <Grid item className={classes.textField}>
            <h3>Welcome Back!!</h3>
            <p>Please sign into your account</p>
          </Grid>
        </Grid>
        {values.error !== "" ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <Alert elevation={0} severity="error" fullWidth>
                This is an error message!
              </Alert>
            </Grid>
          </Grid>
        ) : null}
        <form onSubmit={handleSignIn}>
          <Grid item xs={12}>
            <Forms
              id="email"
              type="text"
              label="Email Address"
              labelWidth={110}
              classes={classes}
              values={values.email}
              handleChange={handleChange}
              required={true}
            />
          </Grid>
          <Grid item xs={12}>
            <Forms
              id="password"
              label="Password"
              type="password"
              labelWidth={80}
              classes={classes}
              values={values.password}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <Link href="#">
                <b>Forgot Password?</b>
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.textField}>
            <Button variant="contained" value="Sign In" type="submit" fullWidth>
              Sign In
            </Button>
            <Grid item xs={12} className={classes.textField}>
              <Typography>
                Don't have an account?{" "}
                <Link href="#">
                  <b>Sign Up</b>
                </Link>{" "}
                instead
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}
