import React, { useEffect, useState } from "react";

import {
  Button,
  Col,
  Container,
  Row,
  Modal,
  Form,
  Spinner,
  Card,
  Alert,
  Jumbotron,
  Table,
  TabContainer,
  ListGroup,
  TabContent,
  TabPane,
} from "react-bootstrap";

import axios from "axios";
import "./LiveExam.scss";

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Box,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Menu,
  MenuList,
  Paper,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import {
  DataGrid,
  getNumericColumnOperators,
  PreferencePanelsValue,
} from "@material-ui/data-grid";

const Result = (props) => {
  if (props.result)
    return (
      <Container fluid className="root ">
        <Row className="justify-content-center">
          <Col xs={7} className="exam">
            <Row className="justify-content-center">
              <Col xs="auto">
                {/* <Jumbotron>
                  <h1>Exam Finished!</h1>
                  <p>
                    <Alert
                      variant={props.result.mark > 0 ? "success" : "danger"}
                    >
                      {!props.result.mark
                        ? ""
                        : props.result.mark > 0
                        ? `Congrats You have Scored ${props.result.mark}`
                        : `Oho! You have Scored ${props.result.mark}`}
                    </Alert>
                  </p>
                </Jumbotron> */}

                <Tabs
                  value={
                    !props.result.mark
                      ? ""
                      : props.result.mark > 0
                      ? `Congrats! You have Scored ${props.result.mark}`
                      : `Oho! You have Scored ${props.result.mark}`
                  }
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Exam Finished!" />
                </Tabs>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
};

export default Result;
