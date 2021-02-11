import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Containers/App";
import reportWebVitals from "./reportWebVitals";

import axios from "axios";

let userdata = localStorage.getItem("data");
userdata = JSON.parse(userdata);
console.log(userdata);

axios.defaults.baseURL = "http://localhost:8080/";

if (userdata) {
  axios.defaults.headers.common["Authorization"] = "Token " + userdata.jwt.token;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
