import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../Components/Navbar/Navbar";
// import SignIn from "../Components/Authentication/SignIn";
import SignUp from "../Components/Authentication/SignUp";
// import  MCQ  from "../Components/Exam/MCQs/MCQ/MCQ";
function App() {
  return (
    <div className="App">
      <Navigation />
      {/* <SignIn /> */}
      <SignUp />
      {/* <MCQ /> */}
    </div>
  );
}

export default App;
