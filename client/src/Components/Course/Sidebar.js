import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { IoClipboard } from "react-icons/io5";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import "./Course.scss";

export default function Sidebar(props) {

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
      <aside className={sidebar ? 'sidebar active' : 'sidebar'}>
        <ul className="sidebar__nav">
          <li className="sidebar__logo">
            <Link className="sidebar__item__link" onClick={showSidebar}>
              <span className="sidebar__item__text">SWE111</span>
              <AiOutlineDoubleRight className="sidebar__item__icon" />
            </Link>
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
    );
}