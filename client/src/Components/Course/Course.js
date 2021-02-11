import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Course.scss";
import LinearIndeterminate from "../Generic/Loader";

let userdata = localStorage.getItem("data");
userdata = JSON.parse(userdata);

export default function Course(props) {
  let { id } = useParams();

  const [courseData, setCourseData] = useState(null);

  console.log(userdata);

  useEffect(() => {
    if (userdata)
      axios
        .get(`${userdata.role}/course/${id}`)
        .then((response) => {
          const data = response.data;
          console.log(data);
          if (data.status === "OK") setCourseData(data.result.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  if (courseData)
    return (
      <div className="course">
        <Sidebar courseData={courseData} userInfo={userdata} />
      </div>
    );
  else return <LinearIndeterminate></LinearIndeterminate>;
}
