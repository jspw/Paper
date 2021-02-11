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
import axios from "axios";
const ENDPOINT = "http://localhost:8080";

let navElements;

export default function Navigation(props) {
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

  console.log(notifies);

  let userdata;

  useEffect(() => {
    userdata = localStorage.getItem("data");
    userdata = JSON.parse(userdata);
    // if (userdata) userdata = userdata;
  }, []);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    if (userdata) {
      console.log(userdata.department);
      socket.on(userdata.department, (data, error) => {
        // setResponse(data);
        console.log("data from socket", data);
        console.log("data from socket", error);
        if (userdata.role === "Student") {
          notifies.push(data);
        }
      });
    }
  }, [ENDPOINT, userdata]);

  const joinCourse = (courseID) => {
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
          handleMenuClose();
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
    localStorage.clear();
    // props.login.isLogin = "Failed";
    window.location.reload();
    history.push("/");
  };
  let notificationUI;

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
      <MenuItem onClick={handleMenuClose} /*style={{width: "340px"}}*/>
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My Schedule</MenuItem>
      <MenuItem onClick={handleMenuClose} onClick={handleSignout}>
        Sign Out
      </MenuItem>
    </Menu>
  );

  let renderNotificationMenu;
  if (notifies)
    renderNotificationMenu = notificationUI = notifies.map((not) => {
      if (not.type === "course")
        return (
          <Menu
            anchorEl={anchor}
            id="notification menu"
            open={isNotificationOpen}
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
          >
            <MenuItem>
              You are invited to a new course {not.name}.<br></br>
              <div className="btn-group">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={joinCourse(not.typeID)}
                >
                  Join
                </button>
                <p> </p>
                <button type="button" class="btn btn-warning">
                  Reject
                </button>
              </div>
            </MenuItem>
          </Menu>
        );
      else if (not.type === "exam") {
        return (
          <Menu
            anchorEl={anchor}
            id="notification menu"
            open={isNotificationOpen}
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
          >
            <MenuItem>
              <a href={`/course/${not.typeID}`}>
                A new exam is created {not.name}.
              </a>
            </MenuItem>
          </Menu>
        );
      } else if (not.type === "result") {
        return (
          <Menu
            anchorEl={anchor}
            id="notification menu"
            open={isNotificationOpen}
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
          >
            <MenuItem>
              <a href={`/course/${not.typeID}`}>
                Your CQ Exam {not.name} has been published.
              </a>
            </MenuItem>
          </Menu>
        );
      }
    });

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
  );
}
