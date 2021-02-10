const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

const socketIo = require("socket.io");

const http = require("http");

const examController = require("./controllers/exam");
const notificationController = require("./controllers/notification");

const mongodbUrl = process.env.MONGO_URL;

const PORT = process.env.SERVER_PORT;

let interval;

const getApiAndEmit = (socket) => {
  const response = new Date();
  // if (response.getSeconds() > 30)
  socket.emit("mcqTimeLimit", response.getSeconds());
  // io.emit("mcqTimeLimit", response.getSeconds());
};

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Mongodb Connected!");

    const server = http.createServer(app);

    const io = socketIo(server, {
      cors: true,
      origin: ["*"],
    });

    // var clients = 0;

    // examController(io);
    // notificationController(io);


      io.on("connection", (socket) => {
        console.log("New client Connected!");
        // const ip = socket.handshake.headers || socket.conn.remoteAddress;
        // console.log(ip);

        // console.log("Socket ID : ", socket.id);
        // console.log("Clients connected : ", clients);

        // app.use((req, res, next) => {
        //   req.socket = socket;
        //   next();
        // });

        app.set("socketIO",io);

        socket.on("disconnect", (reason) => {
          console.log("Client Disconnected!");
          console.log("Reason", reason);
        });
      });

    server.listen(PORT, () => {
      console.log(`Server is listening at localhost:${PORT}`);

    });

    // Handle Unhandled Rejections

    process.on("unhandledRejection", (err) => {
      console.log("Unhandled Rejection! Shutting down the server...");
      console.error(err);

      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((error) => console.log(error));
