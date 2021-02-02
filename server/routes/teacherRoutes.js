const express = require("express");
const teacherController = require("../controllers/teacher");
const authenticateJWT = require("../middleware/authenticateJWS");

const router = express.Router();

router.route("/user/:id").get(authenticateJWT, teacherController.getTeacher);

router
  .route("/user/edit/:id")
  .get(authenticateJWT, teacherController.getEditTeacher)
  .post(authenticateJWT, teacherController.postEditTeacher);

router
  .route("/course/create")
  .post(authenticateJWT, teacherController.postCreateCourse);

router
  .route("/question/mcq/create")
  .post(authenticateJWT, teacherController.postCreateMcqQuestion);

router
  .route("/exam/mcq/create")
  .post(authenticateJWT, teacherController.postCreateMcqExam);

router
  .route("/question/cq/create")
  .post(authenticateJWT, teacherController.postCreateCqQuestion);

router
  .route("/exam/cq/create")
  .post(authenticateJWT, teacherController.postCreateCqExam);

router.route("/exam/:id").get(authenticateJWT, teacherController.getExam);


module.exports = router;
