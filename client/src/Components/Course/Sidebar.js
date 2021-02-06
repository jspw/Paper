import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { IoClipboard } from "react-icons/io5";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
/* import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'; */
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CreateCourse from './CreateCourse/CreateCourse';
import "./Sidebar.scss";
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
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}
export default function Sidebar(props) {

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <>
        <aside className={sidebar ? "sidebar active" : "sidebar"}>
          <ul className="sidebar__nav">
            <li className="sidebar__logo">
              <Row>
                <Link className="sidebar__item__link" onClick={showSidebar}>
                  <Col xs={4} className="sidebar__item__text">
                    {props.courseData.name}
                  </Col>
                  <Col xs={sidebar ? { span: 4, offset: 2 } : {}}>
                    <FaAngleDoubleRight className="sidebar__item__icon" />
                  </Col>
                </Link>
              </Row>
            </li>
            <li className="sidebar__item">
              <Link className="sidebar__item__link">
                <IoCreate className="sidebar__item__icon" />
                <span className="sidebar__item__text">Create Exam</span>
              </Link>
            </li>
            <li className="sidebar__item">
              <Link className="sidebar__item__link">
                <IoClipboard className="sidebar__item__icon" />
                <span className="sidebar__item__text">Exams</span>
              </Link>
            </li>
            <li className="sidebar__item">
              <Link className="sidebar__item__link">
                <FaUsers className="sidebar__item__icon" />
                <span className="sidebar__item__text">Students</span>
              </Link>
            </li>
            <li className="sidebar__item">
              <Link className="sidebar__item__link">
                <FaChalkboardTeacher className="sidebar__item__icon" />
                <span className="sidebar__item__text">Teacher</span>
              </Link>
            </li>
            <li className="sidebar__item">
              <Link className="sidebar__item__link">
                <FaInfoCircle className="sidebar__item__icon" />
                <span className="sidebar__item__text">Course Info</span>
              </Link>
            </li>
          </ul>
        </aside>
        <div className={sidebar ? "content__small" : "content__large"}>
          <CreateCourse/>
        </div>
      </>
    );
}