import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../Components/Navbar/Navbar";
// import  MCQ  from "../Components/Exam/MCQs/MCQ/MCQ";
import SignIn from "../Components/Authentication/SignIn";
import SignUp from "../Components/Authentication/SignUp";
// import  MCQ  from "../Components/Exam/MCQs/MCQ/MCQ";
import axios from "axios";
import Home from "../Components/Home/Home";

let userdata = localStorage.getItem("data");
userdata = JSON.parse(userdata);

function App() {
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    if (userdata) {
      axios
        .get(`${userdata.role}/user/${userdata.id}`)
        .then((result) => {
          setIsLogin(result.data.status);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">

        <Navigation login = {{isLogin}}  />
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route path="/signUp" component={SignUp} />
          <Route path="/signIn" component={SignIn} />
        </Switch>
        {/* <SignIn /> */}
        {/* <SignUp /> */}
        {/* <MCQ /> */}

        <Home login = {{isLogin}} />
      </div>
    </BrowserRouter>
  );
}

export default App;
