import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../Components/Navbar/Navbar";
// import  MCQ  from "../Components/Exam/MCQs/MCQ/MCQ";
// import SignIn from "../Components/Authentication/SignIn";
// import SignUp from "../Components/Authentication/SignUp";
import Home from "../Components/Home/Home";
import axios from "axios";

let userdata = localStorage.getItem("data");
userdata = JSON.parse(userdata);

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (userdata) {
      axios
        .get(`${userdata.role}/user/${userdata.id}`)
        .then((result) => {
          if(result.data.status === "OK") setIsLogin(true) ;
        })
        .catch((error) => console.log(error));
    }
  }, []);
// console.log(isLogin)
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation isLogin={isLogin} />
{/*         <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signUp" exact component={SignUp} />
          <Route path="/signIn" exact component={SignIn} />
        </Switch> */}
        <Home isLogin={isLogin} />
      </div>
    </BrowserRouter>
  );
}

export default App;
