const express = require("express");
const teacherController = require("../controllers/teacher");
const authenticateJWT = require("../middleware/authenticateJWS");

const router = express.Router();

router.route("/:id").get(authenticateJWT, teacherController.getTeacher);

router
  .route("/create-course")
  .post(authenticateJWT, teacherController.postCreateCourse);

router
  .route("/create-mcq-question")
  .post(authenticateJWT, teacherController.postCreateMcqQuestion);

router
  .route("/create-mcq-exam")
  .post(authenticateJWT, teacherController.postCreateMcqExam);

router
  .route("/create-cq-question")
  .post(authenticateJWT, teacherController.postCreateCqQuestion);

router
  .route("/create-cq-exam")
  .post(authenticateJWT, teacherController.postCreateCqExam);

module.exports = router;
