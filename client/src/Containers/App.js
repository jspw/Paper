import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../Components/Navbar/Navbar";
// import  MCQ  from "../Components/Exam/MCQs/MCQ/MCQ";
import SignIn from "../Components/Authentication/SignIn";
import SignUp from "../Components/Authentication/SignUp";
// import  MCQ  from "../Components/Exam/MCQs/MCQ/MCQ";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route path="/signUp" component={SignUp} />
          <Route path="/signIn" component={SignIn} />
        </Switch>
        {/* <SignIn /> */}
        {/* <SignUp /> */}
        {/* <MCQ /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
