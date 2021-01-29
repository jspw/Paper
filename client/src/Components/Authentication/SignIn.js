import React, { useState } from "react";
import { Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Forms from "./Forms";
import Grid from "@material-ui/core/Grid";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import "./SignIn.css";
import { useHistory } from "react-router-dom";

const apiDomain = "http://localhost:8080/";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(2),
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignUp() {
  const classes = useStyles();

  let history = useHistory();

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
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
    const endpoint = "auth/login";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    };
    const response = await fetch(`${apiDomain}${endpoint}`, requestOptions);
    const data = await response.json();

    if (data.status === "OK") {
      const userdata = {
        token: data.result.jwt.token,
        role: data.result.data.role.toLowerCase(),
        id: data.result.data.id,
      };
      localStorage.setItem("data", JSON.stringify(userdata));
      history.push("/");
      window.location.reload();
      
    } else {
      setValues({ ...values, error: data.result });
    }
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
                {values.error}
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
              <Link to="#">
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
                <Link to="/signUp">
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
