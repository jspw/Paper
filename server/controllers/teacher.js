const TeacherModel = require("../models/teacher");
const CourseModel = require("../models/course");
const McqQuestionModel = require("../models/mcqQuestion");
const McqExamModel = require("../models/mcqExam");
const UniversityModel = require("../models/university");

const CqQuestionModel = require("../models/cqQuestion");
const CqExamModel = require("../models/cqExam");

const OnMcqExamModel = require("../models/onMcqExam");
const OnCqExamModel = require("../models/onCqExam");

const NotificationModel = require("../models/notification");

const errorHandler = require("../middleware/errorHandler");
const apiResponseInJson = require("../middleware/apiResponseInJson");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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
            jwt: {
              token: jwt.sign(
                {
                  _id: teacher._id,
                },

                process.env.JWT_SECRET_TOKEN,

                {
                  expiresIn: process.env.JWT_EXPIRES_IN,
                }
              ),
              expiresIn: process.env.JWT_EXPIRES_IN,
            },
            id: teacher._id,
            role: role,
            email: email,
            username: username,
            firstName: firstName,
            lastName: lastName,
            department: department,
            designation: designation,
            varsity: teacher.varsity.shortform,
            courses: teacher.courses,
            registered_at: registered_at,
          },
        },
      });
    })
    .catch((error) => {
      console.log(error);

      errorHandler.validationError(res, 400, "Teacher not found.");
    });
};

exports.getEditTeacher = (req, res, next) => {
  if (req.user._id == req.params.id) {
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
              varsity: teacher.varsity.shortform,
              registered_at: registered_at,
            },
          },
        });
      })
      .catch((error) => {
        console.log(error);

        errorHandler.validationError(res, 400, "Teacher not found.");
      });
  } else {
    errorHandler.unauthorizedAccess(res);
  }
};

exports.postEditTeacher = (req, res, next) => {
  if (req.user._id == req.params.id) {
    let updatedEmail = req.body.email;
    let updatedUsername = req.body.username;
    let updatedFirstName = req.body.firstName;
    let updatedLastName = req.body.lastName;
    let updatedDesignation = req.body.designation;
    let updatedPassword = req.body.password;
    let updatedRepassword = req.body.repassword;
    let university;

    // console.log(updatedEmail);

    TeacherModel.findById(req.params.id)
      .then((teacher) => {
        if (updatedPassword) {
          console.log("entered password");
          if (updatedPassword == updatedRepassword) {
            if (updatedEmail) {
              console.log("entered email");
              UniversityModel.findOne({
                "emails.email": updatedEmail,
              })
                .then((varsity) => {
                  university = varsity;

                  if (
                    varsity &&
                    varsity._id.toString() == req.user.varsity.toString()
                  ) {
                    bcrypt
                      .hash(updatedPassword, 10)
                      .then((hash) => {
                        teacher.email = updatedEmail;
                        teacher.password = hash;
                        if (updatedUsername) teacher.username = updatedUsername;
                        if (updatedFirstName)
                          teacher.firstName = updatedFirstName;
                        if (updatedLastName) teacher.lastName = updatedLastName;
                        if (updatedDesignation)
                          teacher.designation = updatedDesignation;

                        teacher
                          .save()
                          .then((teacher) => {
                            let department;
                            let role = teacher.role;
                            let email = teacher.email;
                            let username = teacher.username;
                            let firstName = teacher.firstName;
                            let lastName = teacher.lastName;
                            let varsity = university.shortform;
                            let designation = teacher.designation;
                            let registered_at = teacher.registered_at;

                            university.departments.forEach((dept) => {
                              if (dept.id == req.user.department) {
                                department = dept.shortform;
                              }
                            });

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
                                  varsity: varsity,
                                },
                              },
                            });

                            // apiResponseInJson(res, 200, teacher);
                          })
                          .catch((error) => {
                            console.log(error);
                            console.log("New teacher Account Update Failed!");
                            let errorMessage;
                            if (error.code == 11000) {
                              if (error.keyPattern.username)
                                errorMessage = "Username Already Exists";
                              else if (error.keyPattern.email)
                                errorMessage = "Email Address Already Exists";
                            } else errorMessage = error;

                            errorHandler.validationError(
                              res,
                              400,
                              errorMessage
                            );
                          });
                      })
                      .catch((error) => {
                        console.log(error);
                        errorHandler.serverError(res);
                      });
                  } else {
                    console.log("Email not authorized!");
                    errorHandler.unauthorizedEmail(res);
                  }
                })
                .catch((error) => {
                  console.log(error);
                  errorHandler.serverError(req);
                });
            } else {
              console.log("without email but have passs");
              if (updatedUsername) teacher.username = updatedUsername;
              if (updatedFirstName) teacher.firstName = updatedFirstName;
              if (updatedLastName) teacher.lastName = updatedLastName;
              if (updatedDesignation) teacher.designation = updatedDesignation;
              teacher
                .save()
                .then((teacher) => {
                  UniversityModel.findById(req.user.varsity)
                    .then((university) => {
                      let department;
                      let role = teacher.role;
                      let email = teacher.email;
                      let username = teacher.username;
                      let firstName = teacher.firstName;
                      let lastName = teacher.lastName;
                      let varsity = university.shortform;
                      let designation = teacher.designation;
                      let registered_at = teacher.registered_at;

                      university.departments.forEach((dept) => {
                        if (dept.id == req.user.department) {
                          department = dept.shortform;
                        }
                      });

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
                            varsity: varsity,
                            registered_at: registered_at,
                          },
                        },
                      });
                    })
                    .catch((error) => {
                      console.log(error);

                      errorHandler.serverError(res);
                    });
                })
                .catch((error) => {
                  console.log(error);
                  console.log("New teacher Account Update Failed!");
                  let errorMessage;
                  if (error.code == 11000) {
                    if (error.keyPattern.username)
                      errorMessage = "Username Already Exists";
                    else if (error.keyPattern.email)
                      errorMessage = "Email Address Already Exists";
                  } else errorMessage = error;

                  errorHandler.validationError(res, 400, errorMessage);
                });
            }
          } else
            errorHandler.validationError(res, 403, "Passwords Have To Match");
        } else {
          console.log("Without password");
          if (updatedEmail) {
            console.log("email password");
            UniversityModel.findOne({
              "emails.email": updatedEmail,
            }).then((varsity) => {
              if (varsity && varsity._id == req.user.varsity) {
                university = varsity;
                teacher.email = updatedEmail;

                if (updatedUsername) teacher.username = updatedUsername;
                if (updatedFirstName) teacher.firstName = updatedFirstName;
                if (updatedLastName) teacher.lastName = updatedLastName;
                if (updatedDesignation)
                  teacher.designation = updatedDesignation;
                teacher
                  .save()
                  .then((teacher) => {
                    let department;
                    let role = teacher.role;
                    let email = teacher.email;
                    let username = teacher.username;
                    let firstName = teacher.firstName;
                    let lastName = teacher.lastName;
                    let varsity = university.shortform;
                    let designation = teacher.designation;
                    let registered_at = teacher.registered_at;

                    university.departments.forEach((dept) => {
                      if (dept.id == req.user.department) {
                        department = dept.shortform;
                      }
                    });

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
                          varsity: varsity,
                        },
                      },
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                    console.log("New teacher Account Update Failed!");
                    let errorMessage;
                    if (error.code == 11000) {
                      if (error.keyPattern.username)
                        errorMessage = "Username Already Exists";
                      else if (error.keyPattern.email)
                        errorMessage = "Email Address Already Exists";
                    } else errorMessage = error;

                    errorHandler.validationError(res, 400, errorMessage);
                  });
              } else {
                errorHandler.unauthorizedEmail(res);
              }
            });
          } else {
            console.log("without password & email");
            if (updatedUsername) teacher.username = updatedUsername;
            if (updatedFirstName) teacher.firstName = updatedFirstName;
            if (updatedLastName) teacher.lastName = updatedLastName;
            if (updatedDesignation) teacher.designation = updatedDesignation;
            teacher
              .save()
              .then((teacher) => {
                UniversityModel.findById(req.user.varsity)
                  .then((university) => {
                    let department;
                    let role = teacher.role;
                    let email = teacher.email;
                    let username = teacher.username;
                    let firstName = teacher.firstName;
                    let lastName = teacher.lastName;
                    let varsity = university.shortform;
                    let designation = teacher.designation;
                    let registered_at = teacher.registered_at;

                    university.departments.forEach((dept) => {
                      if (dept.id == req.user.department) {
                        department = dept.shortform;
                      }
                    });

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
                          varsity: varsity,
                          registered_at: registered_at,
                        },
                      },
                    });
                  })
                  .catch((error) => {
                    console.log(error);

                    errorHandler.serverError(res);
                  });
              })
              .catch((error) => {
                console.log(error);
                console.log("New teacher Account Update Failed!");
                let errorMessage;
                if (error.code == 11000) {
                  if (error.keyPattern.username)
                    errorMessage = "Username Already Exists";
                  else if (error.keyPattern.email)
                    errorMessage = "Email Address Already Exists";
                } else errorMessage = error;

                errorHandler.validationError(res, 400, errorMessage);
              });
          }
        }
      })
      .catch((error) => {
        console.log(error);

        errorHandler.validationError(res, 400, "Teacher not found.");
      });
  } else {
    errorHandler.unauthorizedAccess(res);
  }
};

exports.postCreateCourse = (req, res, next) => {
  const { name, code, department, varsity } = req.body;

  const teacher = req.user._id;

  if (req.user.role == "Teacher") {
    const courseModel = new CourseModel({
      name: name,
      code: code,
      department: department,
      varsity: varsity,
      createdBy: teacher,
    });
    courseModel
      .save()
      .then((course) => {
        console.log(course.department.name);

        const notificationModel = new NotificationModel({
          varsity: course.varsity.name,
          department: course.department.name,
          type: "course",
          typeID: course._id,
          name: course.name,
        });

        notificationModel.save().then((result) => {
          var io = req.app.get("socketIO");

          io.emit(course.department.name, result);
        });

        req.user.courses.push({
          course: course._id,
        });

        req.user
          .save()
          .then((result) => {
            console.log(result);
            apiResponseInJson(res, 201, course);
          })
          .catch((error) => {
            console.log(error);
            errorHandler.validationError(res, 401, error);
          });
      })
      .catch((error) => {
        console.log(error);
        errorHandler.validationError(res, 401, error);
      });
  } else {
    console.log(error);
    errorHandler.unauthorizedAccess(res);
  }
};

exports.postCreateMcqQuestion = (req, res, next) => {
  if (req.user.role == "Teacher") {
    console.log(req.body);
    const mcqQuestionModel = new McqQuestionModel(req.body);
    mcqQuestionModel
      .save()
      .then((mcqQuestion) => {
        console.log("MCQ Question Created!");

        apiResponseInJson(res, 201, mcqQuestion);
      })
      .catch((error) => {
        console.log(error);
        errorHandler.validationError(res, 400, error);
      });
  } else {
    // console.log(error);
    errorHandler.unauthorizedAccess(res);
  }
};

exports.postCreateCqQuestion = (req, res, next) => {
  if (req.user.role == "Teacher") {
    const cqQuestionModel = new CqQuestionModel(req.body);
    cqQuestionModel
      .save()
      .then((cqQuestion) => {
        console.log("CQ Question Created!");

        apiResponseInJson(res, 201, cqQuestion);
      })
      .catch((error) => {
        errorHandler.validationError(res, 401, error);
      });
  } else {
    errorHandler.unauthorizedAccess(res);
  }
};

exports.postCreateCqExam = (req, res, next) => {
  if (req.user.role == "Teacher") {
    const cqExamModel = new CqExamModel(req.body);
    cqExamModel
      .save()
      .then((cqExam) => {
        console.log("CQ Exam Created!");

        CourseModel.findById(req.body.course)
          .then((course) => {
            console.log(course);
            course.cqExams.push({
              examId: cqExam.id,
            });
            course
              .save()
              .then((result) => {
                console.log(result);

                const notificationModel = new NotificationModel({
                  varsity: result.varsity.name,
                  department: result.department.name,
                  type: "exam",
                  typeID: cqExam._id,
                  name: result.name,
                });

                notificationModel.save().then((notification) => {
                  var io = req.app.get("socketIO");

                  io.emit(course.department.name, notification);
                });

                apiResponseInJson(res, 201, cqExam);
              })
              .catch((error) => {
                console.log("Course save", error);
                errorHandler.serverError(res);
              });
          })
          .catch((error) => {
            console.log("Course find", error);
            errorHandler.serverError(res);
          });
      })
      .catch((error) => {
        errorHandler.validationError(res, 401, error);
      });
  } else {
    errorHandler.unauthorizedAccess(res);
  }
};

exports.postCreateMcqExam = (req, res, next) => {
  if (req.user.role == "Teacher") {
    const mcqExamModel = new McqExamModel(req.body);
    mcqExamModel
      .save()
      .then((mcqExam) => {
        console.log("MCQ Exam Created!");

        CourseModel.findById(req.body.course)
          .then((course) => {
            console.log(course);
            course.mcqExams.push({
              examId: mcqExam.id,
            });
            course
              .save()
              .then((result) => {
                console.log(result);

                const notificationModel = new NotificationModel({
                  varsity: result.varsity.name,
                  department: result.department.name,
                  type: "exam",
                  typeID: mcqExam._id,
                  name: result.name,
                });

                notificationModel.save().then((notification) => {
                  var io = req.app.get("socketIO");

                  io.emit(course.department.name, notification);
                });

                apiResponseInJson(res, 201, mcqExam);
              })
              .catch((error) => {
                console.log("Course save", error);
                errorHandler.serverError(res);
              });
          })
          .catch((error) => {
            console.log("Course find", error);
            errorHandler.serverError(res);
          });
      })
      .catch((error) => {
        console.log("Course find", error);
        errorHandler.validationError(res, 401, error);
      });
  } else {
    console.log("Course find", error);
    errorHandler.unauthorizedAccess(res);
  }
};

exports.getExam = (req, res, next) => {
  McqExamModel.findById(req.params.id)
    .then((exam) => {
      console.log("EH?", exam);
      if (exam) apiResponseInJson(res, 200, exam);
      else {
        CqExamModel.findById(req.params.id)
          .then((result) => {
            console.log("CQExam", result);
            apiResponseInJson(res, 200, result);
          })
          .catch((error) => {
            console.log(error);
            console.log("CQ EXAM Not Found");
            errorHandler.validationError(res, 400, "Exam Not Found");
          });
      }
    })
    .catch((error) => {
      console.log(error);

      errorHandler.serverError(res);
    });
};

exports.getCourse = (req, res, next) => {
  CourseModel.findById(req.params.id)
    // .populate("students.student.course").exec()
    .then((course) => {
      console.log("Course ", course);
      if (course) {
        // course.mcqExams.forEach((exam) => {
        //   exam.examId.mcqQuestions = undefined;
        // });

        // course.cqExams.forEach((exam) => {
        //   exam.examId.cqQuestions = undefined;
        // });

        // course.createdBy.courses = undefined;

        // course.students.forEach((student) => {
        //   student.student.varsity = undefined;
        //   student.student.courses = undefined;
        // });

        apiResponseInJson(res, 200, course);
      } else errorHandler.validationError(res, 400, "No Course Found");
    })
    .catch((error) => {
      console.log(error);
      errorHandler.serverError(res);
    });
};

exports.getMcqSubmits = (req, res, next) => {
  console.log(req.user.role);
  if (req.user.role === "Teacher") {
    OnMcqExamModel.find({
      mcqExam: req.params.id,
    })
      .sort("mark")
      .then((result) => {
        console.log(result);
        if (result.length > 0) apiResponseInJson(res, 200, result);
        else errorHandler.validationError(res, 404, "No Participate Found");
      })
      .catch((error) => {
        console.log(error);
        errorHandler.validationError(res, 400, error);
      });
  } else errorHandler.unauthorizedAccess(res);
};

exports.getCqSubmits = (req, res, next) => {
  console.log(req.user.role);
  if (req.user.role === "Teacher") {
    OnCqExamModel.find({
      cqExam: req.params.id,
    })
      .then((result) => {
        if (result.length > 0) apiResponseInJson(res, 200, result);
        else errorHandler.validationError(res, 404, "No Participate Found");
      })
      .catch((error) => {
        console.log(error);
        errorHandler.validationError(res, 400, error);
      });
  } else errorHandler.unauthorizedAccess(res);
};

exports.postCqExamine = (req, res, next) => {
  if (req.user.role == "Teacher") {
    console.log(req.body);

    OnCqExamModel.findById(req.params.id).then((onCqExamModel) => {
      console.log("onCqExamModel", onCqExamModel);

      onCqExamModel.totalMarks = req.body.totalMarks;
      onCqExamModel.examineBy = req.user._id;

      // req.body.marks.forEach((x) => {
      //   x.cqQuestion = mongoose.Types.ObjectId(x.cqQuestion);
      // });

      onCqExamModel.marks = req.body.marks;

      onCqExamModel
        .save()
        .then((result) => {
          console.log("OnCQ", result.cqExam.course.varsity.name);

          const varsity = result.cqExam.course.varsity.name;

          const department = result.cqExam.course.department.name;

          const notificationModel = new NotificationModel({
            varsity: varsity,
            department: department,
            type: "result",
            typeID: result.cqExam._id,
            name: result.cqExam.name,
          });

          notificationModel.save().then((notification) => {
            var io = req.app.get("socketIO");

            io.emit(department, notification);
          });

          apiResponseInJson(res, 200, result);
        })
        .catch((error) => {
          console.log(error);
          errorHandler.validationError(res, 400, error);
        });
    });
  } else {
    errorHandler.unauthorizedAccess(res);
  }
};

exports.getAllExams = (req, res, next) => {
  McqExamModel.findOne({
    course: req.params.id,
  })
    .then((mcqExams) => {
      CqExamModel.findOne({
        course: req.params.id,
      })
        .then((cqExams) => {
          console.log(mcqExams);
          console.log(cqExams);

          // if(req.user.role === "Student"){
          //   mcqExams.
          // }

          const result = {
            mcqExams: mcqExams,
            cqExams: cqExams,
          };

          apiResponseInJson(res, 200, result);
        })
        .catch((error) => {
          console.log(error);
          errorHandler.serverError(res);
        });
    })
    .cathc((error) => {
      console.log(error);
      errorHandler.serverError(res);
    });
};
