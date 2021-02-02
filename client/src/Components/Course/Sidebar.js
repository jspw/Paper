import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import "./Course.scss";

export default function Sidebar(props) {
    console.log(props.courseData)

    return (
        <aside className="sidebar">
            <header className="sidebar__header">{props.courseData.name}</header>
            <ul>
                <li><Link className="sidebar__link">Create Exam</Link></li>
                <li><Link className="sidebar__link">Exams</Link></li>
                <li><Link className="sidebar__link">Students</Link></li>
                <li><Link className="sidebar__link">Teacher</Link></li>
            </ul>
{/*             <div className="btn">
            <KeyboardArrowRightIcon style={{color: "white"}} />
            </div> */}
        </aside>
    );
}