const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const xssClean = require("xss-clean");
const compression = require("compression");

const socketIO = require("socket.io");

const router = require("./routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(xssClean());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.set("view engine", "ejs");

app.set("view", "view");



app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res, next) => {
  res.status(202).send("Hello");
  next();
});

app.use(router);

module.exports = app;
