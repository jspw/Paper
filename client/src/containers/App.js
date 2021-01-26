import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../Components/Navbar/Navbar";
import SignIn from "../Components/Auth/SignIn";
import SignUp from "../Components/Auth/SignUp";
import  MCQ  from "../Components/Exam/MCQs/MCQ/MCQ";
function App() {
  return (
    <div className="App">
      <Navigation />
      <SignUp />
      {/* <MCQ /> */}
    </div>
  );
}

export default App;
