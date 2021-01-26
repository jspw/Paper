const express = require("express");
const teacherController = require("../controllers/teacher");
const authenticateJWT = require("../middleware/authenticateJWS");

const router = express.Router();

router.route("/:id").get(authenticateJWT, teacherController.getTeacher);

router
  .route("/create-course")
  .post(authenticateJWT, teacherController.postCreateCourse);

router
  .route("/create-mcq")
  .post(authenticateJWT, teacherController.postCreateMcqQuestion);

module.exports = router;
