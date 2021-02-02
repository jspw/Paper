const CourseModel = require("../models/course");
const McqExamModel = require("../models/mcqExam");
const CqExamModel = require("../models/cqExam");

let interval;

const notificationController = (io) => {
  io.on("connection", (socket) => {
    CourseModel.watch().on("change", (data) => {
      console.log(data);
      io.emit("notification", data);
    });
  });

  //   io.on("connection", (socket) => {
  //     console.log("New client Connected!");
  //     const ip = socket.handshake.headers || socket.conn.remoteAddress;
  //     console.log(ip);
  //     console.log("Socket ID : ", socket.id);

  //     if (interval) clearInterval(interval);

  //     // interval = setInterval(() => getApiAndEmit(socket), 1000);

  //     interval = setInterval(() => {
  //       const response = new Date();
  //       io.emit("test", response.getSeconds());
  //     }, 1000);

  //     let exams =[] ;

  //     McqExamModel.find()
  //       .then((result) => {
  //         console.log(result);

  //         result.forEach(element => {

  //             exams.push(element);

  //         });

  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });

  //     socket.on("disconnect", (reason) => {
  //       console.log("Client Disconnected!");
  //       console.log("Reason", reason);
  //       clearInterval(interval);
  //     });
  //   });
};

module.exports = notificationController;
