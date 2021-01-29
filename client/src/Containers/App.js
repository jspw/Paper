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

let userdata = localStorage.getItem("data");
userdata = JSON.parse(userdata);

function App() {
  const [loginStatus, setloginStatus] = useState(null);

  const [universityInfo, setUniversityInfo] = useState(null);

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
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

    if (userdata) {
      axios
        .get(`${userdata.role}/user/${userdata.id}`)
        .then((result) => {
          setloginStatus(result.data.status);
          setUserInfo(result.data.result.data);
          console.log(result);
        })
        .catch((error) => console.log(error));
    } else setloginStatus("Failed");
  }, []);
  // console.log(isLogin)
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation loginStatus={loginStatus} />
{/*         <Route
          path="/"
          exact
          render={(props) => (
            <Layout universityInfo={universityInfo} userInfo={userInfo} />
          )}
        /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signUp" exact component={SignUp} />
          <Route path="/signIn" exact component={SignIn} />
        </Switch>{" "}
      </div>
    </BrowserRouter>
  );
}

export default App;
