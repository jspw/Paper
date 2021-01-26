const TeacherModel = require("../models/teacher");
const CourseModel = require("../models/course");
const McqQuestionModel = require("../models/mcqQuestion");
const errorHandler = require("../middleware/errorHandler");
const apiResponseInJson = require("../middleware/apiResponseInJson");

exports.getTeacher = (req, res, next) => {
  TeacherModel.findById(req.params.id)
    .populate("varsity")
    .exec()
    .then((teacher) => {
      let {
        role,
        email,
        username,
        firstName,
        lastName,
        designation,
        varsity,
        registered_at,
      } = teacher;

      let department;

      teacher.varsity.departments.forEach((dept) => {
        if (dept.id == teacher.department) {
          department = dept.shortform;
        }
      });

      console.log("Teacher User Found");

      return res.status(200).json({
        status: "OK",
        result: {
          data: {
            id: teacher._id,
            role: role,
            email: email,
            username: username,
            firstName: firstName,
            lastName: lastName,
            department: department,
            designation: designation,
            registered_at: registered_at,
            varsity: teacher.varsity.shortform,
          },
        },
      });
    })
    .catch((error) => {
      console.log(error);

      errorHandler.validationError(res, 400, "Student not found.");
    });
};

exports.postCreateCourse = (req, res, next) => {
  if (req.user.role == "Teacher") {
    const courseModel = new CourseModel(req.body);
    courseModel
      .save()
      .then((course) => {
        console.log(course);

        apiResponseInJson(res, 201, course);
      })
      .catch((error) => {
        errorHandler.validationError(res, 401, error);
      });
  } else {
    errorHandler.unauthorizedAccess(res);
  }
};

exports.postCreateMcqQuestion = (req, res, next) => {
  if (req.user.role == "Teacher") {
    const mcqQuestionModel = new McqQuestionModel(req.body);
    mcqQuestionModel
      .save()
      .then((mcqQuestion) => {
        console.log(mcqQuestion);

        apiResponseInJson(res, 201, mcqQuestion);
      })
      .catch((error) => {
        errorHandler.validationError(res, 401, error);
      });
  } else {
    errorHandler.unauthorizedAccess(res);
  }
};
