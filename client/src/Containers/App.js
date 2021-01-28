import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../Components/Navbar/Navbar";
// import  MCQ  from "../Components/Exam/MCQs/MCQ/MCQ";
import SignIn from "../Components/Authentication/SignIn";
import SignUp from "../Components/Authentication/SignUp";
// import  MCQ  from "../Components/Exam/MCQs/MCQ/MCQ";
import axios from "axios";

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
        <Route
          path="/"
          exact
          render={(props) => <Navigation login={{ isLogin }} />}
        />
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route path="/signUp" exact component={SignUp} />
          <Route path="/signIn" exact component={SignIn} />
        </Switch>
        {/* <SignIn /> */}
        {/* <SignUp /> */}
        {/* <MCQ /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
