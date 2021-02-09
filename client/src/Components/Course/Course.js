import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Course.scss";
import LinearIndeterminate from '../Generic/Loader';

export default function Course(props) {
  let { id } = useParams();

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    if (props.userInfo)
      axios
        .get(`${props.userInfo.role.toLowerCase()}/course/${id}`)
        .then((response) => {
          const data = response.data;
          console.log(data);
          if (data.status === "OK") setCourseData(data.result.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  if (courseData) return <div className="course"><Sidebar courseData={courseData} /></div>;
  else return <LinearIndeterminate></LinearIndeterminate>;
}
