import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import socketIOClient from "socket.io-client";
import Navigation from "../Components/Navbar/Navbar";
import SignIn from "../Components/Authentication/SignIn";
import SignUp from "../Components/Authentication/SignUp";
import Home from "../Components/Home/Home";
import axios from "axios";
import Layout from "../Components/Layout/Layout";
import Course from "../Components/Course/Course";
import Exam from "../Components/Exam/Exam";
import LiveExam from "../Components/LiveExam/LiveExam";
import PreviousExam from "../Components/PreviousExam/PreviousExam";
import UpcomingExam from "../Components/UpcomingExam/UpcomingExam";
import "./App.css";

let userdata = localStorage.getItem("data");
userdata = JSON.parse(userdata);

function App() {
  const [loginStatus, setloginStatus] = useState(null);

  const [universityInfo, setUniversityInfo] = useState(null);

  const [userInfo, setUserInfo] = useState(null);

  const ENDPOINT = "http://127.0.0.1:8080/";

  const [notifications, setnotifications] = useState(null);

  let socketRef = useRef(null);

  useEffect(() => {
    if (userdata) {
      axios
        .get(`${userdata.role}/user/${userdata.id}`)
        .then((result) => {
          setloginStatus(result.data.status);
          setUserInfo(result.data.result.data);
          console.log("UserInfo api call", result);
        })
        .catch((error) => {
          setloginStatus("Failed");
          console.log("Error api call", error);
        });
    } else setloginStatus("Failed");
    axios
      .get("university/all")
      .then((response) => {
        const data = response.data;

        if (data.status === "OK") {
          setUniversityInfo(data.result.data.universities);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation loginStatus={loginStatus} notifications={notifications} />
        <Route
          path="/test"
          exact
          render={() => (
            <Layout universityInfo={universityInfo} userInfo={userInfo} />
          )}
        />

        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Home universityInfo={universityInfo} userInfo={userInfo} />
            )}
          />

          <Route path="/signUp" exact component={SignUp} />
          <Route path="/signIn" exact component={SignIn} />
          <Route
            path="/course/:id"
            render={() => (
              <Course universityInfo={universityInfo} userInfo={userInfo} />
            )}
          />

          <Route
            path="/live-exam/:id"
            exact
            render={() => <LiveExam userInfo={userInfo} />}
          />

          <Route
            path="/exam/:id"
            exact
            render={() => <Exam userInfo={userInfo} />}
          />
          <Route
            path="/previous-exam/:id"
            exact
            render={() => <PreviousExam userInfo={userInfo} />}
          />
          <Route
            path="/upcoming-exam/:id"
            exact
            render={() => <UpcomingExam userInfo={userInfo} />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
