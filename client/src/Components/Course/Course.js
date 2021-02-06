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
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "90%",
  },
}));

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

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (courseData) return <Sidebar courseData={courseData} />;
  else return <CircularProgress></CircularProgress>;
}
