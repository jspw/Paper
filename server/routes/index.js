const express = require("express");
const router = express.Router();

const studentRouter = require("./studentRoutes");
const teacherRouter = require("./teacherRoutes");
const authRouter = require("./authoRoutes");
const universityRouter = require("./univesityRoutes");

const errorHandler = require("../controllers/error");

router.use("/auth", authRouter);
router.use("/university", universityRouter);
router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);

router.all(errorHandler);

module.exports = router;
