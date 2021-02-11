import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import './style.css'
import { Container } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Error404 = () => {
  const classes = useStyles();
  return (
    <>
      <Container>
        <div  className={`${classes.root} center`}>
          <Alert severity="error">404 Page Not Found!</Alert>
        </div>
      </Container>
    </>
  );
};

export default Error404;
