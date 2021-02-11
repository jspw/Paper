const express = require("express");
const router = express.Router();
const NotificationModel = require("../models/notification");

const studentRouter = require("./studentRoutes");
const teacherRouter = require("./teacherRoutes");
const authRouter = require("./authoRoutes");
const universityRouter = require("./univesityRoutes");

const errorHandler = require("../controllers/error");
const authenticateJWS = require("../middleware/authenticateJWS");
const apiResponseInJson = require("../middleware/apiResponseInJson");
const { serverError } = require("../middleware/errorHandler");

router.use("/auth", authRouter);
router.get(
  "/notifications",
  (authenticateJWS,
  (req, res, next) => {
    NotificationModel.find()
      .then((notifications) => {
        console.log(notifications);
        apiResponseInJson(res, 200, notifications);
      })
      .catch((error) => {
        console.log(error);
        serverError(res);
      });
  })
);
router.use("/university", universityRouter);
router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);

router.all(errorHandler);

module.exports = router;
