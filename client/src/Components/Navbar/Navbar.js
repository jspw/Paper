import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { FaUserAlt } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import socketIOClient from "socket.io-client";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Button, makeStyles, Snackbar } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Alert from "@material-ui/lab/Alert";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
const ENDPOINT = "http://localhost:8080";

let navElements;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

export default function Navigation(props) {
  const classes = useStyles();
  let history = useHistory();
  const [showSign, setShowSign] = useState(true);
  const navChange = () => setShowSign(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const [anchor, setAnchor] = React.useState(null);
  const isNotificationOpen = Boolean(anchor);

  const [response, setResponse] = useState([]);

  const [notifies, setnotifies] = useState([]);

  let socketRef = useRef(null);

  const [opensnack, setopensnack] = React.useState(false);

  const [snackbarMsg, setsnackbarMsg] = useState(false);

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setopensnack(false);
  };

  console.log(notifies);

  let userdata;

  useEffect(() => {
    userdata = localStorage.getItem("data");
    userdata = JSON.parse(userdata);
    // if (userdata) userdata = userdata;
  }, []);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    axios
      .get("/notifications")
      .then((result) => {
        console.log("Notifications ", result.data.result.data);
        setnotifies(result.data.result.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });

    if (userdata) {
      console.log(userdata.department);
      socket.on(userdata.department, (data, error) => {
        // setResponse(data);
        console.log("data from socket", data);
        console.log("data from socket", error);
        if (userdata.role === "Student") {
          // const bal = notifies;
          // bal.push(data);
          // setnotifies(data);

          if (userdata.role === "Student") {
            if (data.type === "course") {
              setopensnack(true);
              setsnackbarMsg(`New Course '${data.name}' Invitation For You.`);
              setTimeout(function () {
                window.location.reload();
              }, 2000);
            } else if (data.type === `exam`) {
              setopensnack(true);
              setsnackbarMsg(
                `A new exam  '${data.name}' is set to your course.`
              );
              setTimeout(function () {
                window.location.reload();
              }, 2000);
            } else if (data.type === `result`) {
              setopensnack(true);
              setsnackbarMsg(
                `Your CQ Exam '${data.name}' result has been published.`
              );
              setTimeout(function () {
                window.location.reload();
              }, 2000);
            }
          }
        }
      });
    }
  }, []);

  const joinCourse = (courseID) => {
    handleMenuClose();

    axios({
      method: "POST",
      url: `student/course/add`,

      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        course: courseID,
      }),
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "OK") {
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // if (props.notifications) {
  //   props.notifications.forEach((notification) => {
  //     // notifies.push(notification);
  //     setnotifies(props.notifications);
  //   });
  // }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchor(null);
  };

  const handleSignout = () => {
    // props.login.isLogin = "Failed";

    history.push("/signIn");
    window.location.reload();
  };
  let notificationsUI;

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      id="profile-menu"
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      style={{ width: "340px" }}
    >
      <MenuItem
        style={{ textDecoration: "none", color: "black" }}
        component={Link}
        to="/profile"
        onClick={handleMenuClose} /*style={{width: "340px"}}*/
      >
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My Schedule</MenuItem>
      <MenuItem onClick={handleMenuClose} onClick={handleSignout}>
        Sign Out
      </MenuItem>
    </Menu>
  );
  let x = 0;
  if (notifies.length > 0)
    notificationsUI = notifies.map((not) => {
      if (not.type === "course")
        return (
          <MenuItem>
            <Grid item sm={10}>
              You are invited to a new course {not.name}
            </Grid>

            <Grid item sm={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => joinCourse(not.typeID)}
                href={`/course/${not.typeID}`}
                // startIcon={<AddRoundedIcon />}
              >
                Join
              </Button>
            </Grid>
          </MenuItem>
        );
      else if (not.type === "exam") {
        return (
          <MenuItem>
            <Grid item sm={10}>
              A new exam is created '{not.name}'.
            </Grid>

            <Grid item sm={2}>
              <Button
                variant="contained"
                // color="primary"
                href={`/previous-exam/${not.typeID}`}
              >
                View
              </Button>
            </Grid>
          </MenuItem>
        );
      } else if (not.type === "result") {
        return (
          <MenuItem>
            <Grid item sm={10}>
              Your CQ Exam '{not.name}' result has been published.
            </Grid>

            <Grid item sm={2}>
              <Button variant="contained" href={`/previous-exam/${not.typeID}`}>
                View
              </Button>
            </Grid>
          </MenuItem>
        );
      }
    });

  let renderNotificationMenu;

  renderNotificationMenu = (
    <Menu
      anchorEl={anchor}
      id={`{notification menu}{x++}`}
      open={isNotificationOpen}
      onClose={handleMenuClose}
      // onClick={joinCourse}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {notifies ? notificationsUI : <MenuItem>No Notifications</MenuItem>}
    </Menu>
  );

  if (props.loginStatus == null) {
    navElements = (
      <>
        <Spinner animation="grow" />
      </>
    );
  } else if (props.loginStatus == "OK") {
    navElements = (
      <>
        <IconButton
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={handleNotificationMenuOpen}
        >
          <Badge
            badgeContent={notifies ? notifies.length : 0}
            color="secondary"
          >
            <FaBell style={{ color: "white" }} />
          </Badge>
        </IconButton>
        <IconButton
          edge="end"
          aria-label="account of current user"
          // aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <FaUserAlt style={{ color: "white" }} />
        </IconButton>
        {/* <MenuItem onClick={handleSignout}>Signout</MenuItem> */}
        {renderNotificationMenu}
        {renderProfileMenu}
      </>
    );
  } else {
    navElements = (
      <>
        <Link to="signUp" onClick={navChange}>
          <MenuItem> Sign Up</MenuItem>
        </Link>
        <Link to="signIn" onClick={navChange}>
          <MenuItem>Sign In</MenuItem>
        </Link>
      </>
    );
  }

  return (
    <>
      <Snackbar
        open={opensnack}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        // anchorPosition ={ { right: 10, top: 100 }}
      >
        <Alert onClose={handleSnackClose} severity="info">
          {snackbarMsg}
        </Alert>
      </Snackbar>
      <Navbar bg="" style={{ backgroundColor: "#010302" }} variant="dark">
        <Navbar.Brand href="/" className={showSign ? null : "m-auto"}>
          <>
            <img
              src={"/static/paper.png"}
              width={"38"}
              height={"38"}
              className={"d-inline-block align-top"}
              className="nav__logo"
              alt={"logo"}
            />
            <span className="nav__heading" style={{ fontSize: "122%" }}>
              paper
            </span>
          </>
        </Navbar.Brand>
        {showSign ? <Nav className="ml-auto">{navElements}</Nav> : null}
      </Navbar>
    </>
  );
}
