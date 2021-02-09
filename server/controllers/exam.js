const UniversityModel = require("../models/university");
const StudentModel = require("../models/student");
const TeacherModel = require("../models/teacher");
const CourseModel = require("../models/course");
const McqQuestionModel = require("../models/mcqQuestion");
const McqExamModel = require("../models/mcqExam");
const CqQuestionModel = require("../models/cqQuestion");
const CqExamModel = require("../models/cqExam");

let interval;

const examController = (io) => {
  io.on("connection", (socket) => {

    // console.log("New client Connected!");
    // const ip = socket.handshake.headers || socket.conn.remoteAddress;
    // console.log(ip);
    // console.log("Socket ID : ", socket.id);
    // let interval;

    // if (interval) clearInterval(interval);

    // interval = setInterval(() => getApiAndEmit(socket), 1000);

    // interval = setInterval(() => {
    //   const response = new Date();
    //   io.emit("test", response.getSeconds());
    // }, 1000);

    // let exams = [];

    // McqExamModel.find()
    //   .then((result) => {
    //     // console.log(result);

    //     result.forEach((element) => {
    //       exams.push(element);
    //     });

    //     setInterval(() => {
    //       const date = new Date();
    //       console.log(date.getTime(), exams[0].date.getTime());

    //       if (exams[0].date.getHours() == date.getHours() ) {
    //         console.log("HE");
    //       }
    //     }, 500);

    //     io.emit("exam", exams);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    socket.on("disconnect", (reason) => {
      console.log("Client Disconnected!");
      console.log("Reason", reason);
      clearInterval(interval);
    });
  });
};

module.exports = examController;
