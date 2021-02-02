import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Course(props) {
  let { id } = useParams();

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    if (props.userInfo)
      axios.get(`${props.userInfo.role.toLowerCase()}/course/${id}`).then((response) => {
        const data = response.data;
        console.log(data);
        if (data.status === "OK") setCourseData(data.result.data);
      }).catch(error=>{
        console.log(error);
      });
  }, []);

  console.log("Course Data", courseData);

  if (courseData) return <Sidebar courseData={courseData} />;
  else return <CircularProgress></CircularProgress>;
}
