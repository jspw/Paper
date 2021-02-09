import { useRef, useState, useEffect } from "react";

import "./Timer.css";

import { BrowserRouter as Router, Link } from "react-router-dom";

const Timer = (props) => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  //   console.log(props.deadline)
  let interval = useRef();

  const timer = (props) => {
    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const deadline = new Date(props.deadline).getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = deadline - now;
      if (timeLeft < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(Math.floor(timeLeft / days));
        setTimerHours(Math.floor((timeLeft % days) / hours));
        setTimerMinutes(Math.floor((timeLeft % hours) / minutes));
        setTimerSeconds(Math.floor((timeLeft % minutes) / seconds));
      }
    }, 1000);
  };

  useEffect(() => {
    timer(props);
    return () => {
      clearInterval(interval.current);
    };
  });

  if (timerDays && timerHours && timerMinutes && timerSeconds)
    return (
      <div className="timer-container">
        <Link
          to={`/live-exam/${props.examID}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <button className="btn btn-primary">Enter Exam</button>
        </Link>
      </div>
    );
  else
    return (
      <div className="timer-container">
        <ul>
          <li>
            <span id="days">{timerDays}</span> Days
          </li>
          <li>
            <span id="hours">{timerHours}</span> Hours
          </li>
          <li>
            <span id="minutes">{timerMinutes}</span> Minutes
          </li>
          <li>
            <span id="seconds">{timerSeconds}</span> Seconds
          </li>
        </ul>
      </div>
    );
};

export default Timer;
