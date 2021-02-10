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
const ENDPOINT = "http://localhost:8080";

let navElements;

export default function Navigation(props) {
  let history = useHistory();
  const [showSign, setShowSign] = useState(true);
  const navChange = () => setShowSign(false);

  const [notifications, setnotifications] = useState(null);

  if (props.notifications) setnotifications(props.notifications);

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const [anchor, setAnchor] = React.useState(null);
  const isNotificationOpen = Boolean(anchor);

  const [response, setResponse] = useState("");

  let socketRef = useRef(null);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    if (props.userInfo) {
      console.log(props.userInfo.department);
      socket.on(props.userInfo.department, (data) => {
        // setResponse(data);
        console.log("data from socket", data);
      });
    }
  }, [ENDPOINT, props.userInfo]);

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

  const renderNotificationMenu = (
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
      <MenuItem onClick={handleMenuClose}>
        {response ? response : "No Notifications"}
      </MenuItem>
    </Menu>
  );

  console.log("Login status", props.loginStatus);

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
          <Badge badgeContent={17} color="secondary">
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
