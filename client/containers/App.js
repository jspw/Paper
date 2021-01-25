import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../Components/Navbar/Navbar";
import SignIn from "../Components/Sign/SignIn";
import SignUp from "../Components/Sign/SignUp";
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
