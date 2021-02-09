import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
/* import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab'; */
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
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

  // console.log("Course Data", courseData);

  if (courseData) return <div className="course"><Sidebar courseData={courseData} /></div>;
  else return <LinearIndeterminate></LinearIndeterminate>;
}
