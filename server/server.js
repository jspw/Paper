const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

const mongodbUrl = process.env.MONGO_URL;

const PORT = process.env.SERVER_PORT;

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Mongodb Connected!");

    const server = app.listen(PORT, () => {
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
