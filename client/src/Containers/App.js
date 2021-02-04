import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../Components/Navbar/Navbar";
// import  MCQ  from "../Components/Exam/MCQs/MCQ/MCQ";
import SignIn from "../Components/Authentication/SignIn";
import SignUp from "../Components/Authentication/SignUp";
import Home from "../Components/Home/Home";
import axios from "axios";
import Layout from "../Components/Layout/Layout";
import Course from "../Components/Course/Course";
import Exam from "../Components/Exam/Exam";

let userdata = localStorage.getItem("data");
userdata = JSON.parse(userdata);

function App() {
  const [loginStatus, setloginStatus] = useState(null);

  const [universityInfo, setUniversityInfo] = useState(null);

  const [userInfo, setUserInfo] = useState(null);

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
  // console.log(isLogin)
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation loginStatus={loginStatus} />
                <Route
          path="/test"
          exact
          render={(props) => (
            <Layout universityInfo={universityInfo} userInfo={userInfo} />
          )}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/"
            exact
            render={(props) => (
              <Home universityInfo={universityInfo} userInfo={userInfo} />
            )}
          />
          <Route path="/signUp" exact component={SignUp} />
          <Route path="/signIn" exact component={SignIn} />
          <Route path="/exam/:id" component={Exam} />
          <Route
            path="/course/:id"
            render={(props) => (
              <Course universityInfo={universityInfo} userInfo={userInfo} />
            )}
          />
          <Route
            path="/exam/:id"
            exact
            render={(props) => <Exam userInfo={userInfo}/>}
          />
        </Switch>
        {/* <Course /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
