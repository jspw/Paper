import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { FaUserAlt } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import socketIOClient from "socket.io-client";
import axios from "axios";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
const ENDPOINT = "http://localhost:8080";

export default function Notifications(params) {

    const [notifies, setnotifies] = useState(null);


    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        axios
          .get("/notifications")
          .then((result) => {
            console.log("Notifications ", result.data.result.data);
            setnotifies(result.data.result.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
        // if (userdata) {
        // console.log(userdata.department);
        // socket.on(userdata.department, (data, error) => {
        //   // setResponse(data);
        //   console.log("data from socket", data);
        //   console.log("data from socket", error);
        //   if (userdata.role === "Student") {
        //     const bal = notifies;
        //     bal.push(data);
        //     // setnotifies(data);
    
        //     if (userdata.role === "Teacher") {
        //       if (data.type === "course")
        //         setsnackbarMsg(`New Course ${data.name} Invitation For You.`);
        //       else if (data.type === `exam`)
        //         setsnackbarMsg(`A new exam  ${data.name} is set to your course.`);
        //       else if (data.type === `result`)
        //         setsnackbarMsg(
        //           `Your CQ Exam (${data.name}) result has been published.`
        //         );
        //     }
        //   }
        // });
        // }
      }, []);

      const joinCourse = (courseID) => {

    console.log(courseID);
    
        axios({
          method: "POST",
          url: `student/course/add`,
    
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({
            course: courseID,
          }),
        })
          .then((response) => {
            console.log(response.data);
            if (response.data.status === "OK") {
            //   window.location.reload();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

      let notificationsUI ;
    if (notifies)
    notificationsUI = notifies.map((not) => {
        if (not.type === "course")
          return (
            <div>
              You are invited to a new course {not.name}.<br></br>
              <div className="btn-group btn-group-sm">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => joinCourse(not.typeID)}
                >
                  Join
                </button>
                <p> </p>
                <button type="button" class="btn btn-warning">
                  Reject
                </button>
              </div>
            </div>
          );
        else if (not.type === "exam") {
          return (
            <div>
              <a href={`/course/${not.typeID}`}>
                A new exam is created {not.name}.
              </a>
            </div>
          );
        } else if (not.type === "result") {
          return (
            <div>
              <a href={`/course/${not.typeID}`}>
                Your CQ Exam {not.name} result has been published.
              </a>
            </div>
          );
        }
      });

      if(notifies){
          return (notificationsUI)
      }
  
    return (<h1>Loading</h1>)
}