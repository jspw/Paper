const errorHandler = require("../middleware/errorHandler");
const StudentModel = require("../models/student");
const UniversityModel = require("../models/university");
const CourseModel = require("../models/course");
const McqExamModel = require("../models/mcqExam");
const CqExamModel = require("../models/cqExam");
const OnMcqExamModel = require("../models/onMcqExam");
const OnCqExamModel = require("../models/onCqExam");
const bcrypt = require("bcryptjs");
const apiResponseInJson = require("../middleware/apiResponseInJson");

exports.getStudent = (req, res, next) => {
  StudentModel.findById(req.params.id)
    .then((student) => {
      let {
        role,
        email,
        username,
        firstName,
        lastName,
        registrationNo,
        varsity,
        session,
        registered_at,
      } = student;

      let department;

      student.varsity.departments.forEach((dept) => {
        if (dept.id == student.department) {
          department = dept.shortform;
        }
      });

      console.log("Student User Found");

      console.log(student);

      student.courses.forEach(function (course) {
        course.course.cqExams.forEach(function (exam) {
          console.log("CQ", exam);
          if (exam.examId.cqQuestions) exam.examId.cqQuestions = undefined;
        });

        course.course.mcqExams.forEach(function (exam) {
          if (exam.examId.mcqQuestions) exam.examId.mcqQuestions = undefined;
        });
      });

      return res.status(200).json({
        status: "OK",
        result: {
          data: {
            id: student._id,
            role: role,
            email: email,
            username: username,
            firstName: firstName,
            lastName: lastName,
            department: department,
            registrationNo: registrationNo,
            session: session,
            varsity: student.varsity.shortform,
            courses: student.courses,
            registered_at: registered_at,
          },
        },
      });
    })
    .catch((error) => {
      console.log(error);

      errorHandler.validationError(res, 400, "Student not found.");
    });
};

exports.getEditStudent = (req, res, next) => {
  if (req.user._id == req.params.id) {
    StudentModel.findById(req.params.id)
      .populate("varsity")
      .exec()
      .then((student) => {
        let {
          role,
          email,
          username,
          firstName,
          lastName,
          registrationNo,
          varsity,
          registered_at,
        } = student;

        let department;

        student.varsity.departments.forEach((dept) => {
          console.log(dept);
          if (dept.id == student.department) {
            department = dept.shortform;
          }
        });

        console.log("Student User Found");

        return res.status(200).json({
          status: "OK",
          result: {
            data: {
              id: student._id,
              role: role,
              email: email,
              username: username,
              firstName: firstName,
              lastName: lastName,
              department: department,
              registrationNo: registrationNo,
              session: session,
              varsity: student.varsity.shortform,
              registered_at: registered_at,
            },
          },
        });
      })
      .catch((error) => {
        console.log(error);

        errorHandler.validationError(res, 400, "Student not found.");
      });
  } else {
    errorHandler.unauthorizedAccess(res);
  }
};

exports.postEditStudent = (req, res, next) => {
  if (req.user._id == req.params.id) {
    let updatedEmail = req.body.email;
    let updatedUsername = req.body.username;
    let updatedFirstName = req.body.firstName;
    let updatedLastName = req.body.lastName;
    let updatedregistrationNo = req.body.registrationNo;
    let updatedPassword = req.body.password;
    let updatedRepassword = req.body.repassword;
    let updatedSession = req.body.session;
    let university;

    // console.log(updatedEmail);

    StudentModel.findById(req.params.id)
      .then((student) => {
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
                        student.email = updatedEmail;
                        student.password = hash;
                        if (updatedUsername) student.username = updatedUsername;
                        if (updatedFirstName)
                          student.firstName = updatedFirstName;
                        if (updatedLastName) student.lastName = updatedLastName;
                        if (updatedSession) student.session = updatedSession;
                        if (updatedregistrationNo)
                          student.registrationNo = updatedregistrationNo;

                        student
                          .save()
                          .then((student) => {
                            let department;
                            let role = student.role;
                            let email = student.email;
                            let username = student.username;
                            let firstName = student.firstName;
                            let lastName = student.lastName;
                            let varsity = university.shortform;
                            let registrationNo = student.registrationNo;
                            let registered_at = student.registered_at;
                            let session = student.session;

                            university.departments.forEach((dept) => {
                              if (dept.id == req.user.department) {
                                department = dept.shortform;
                              }
                            });

                            return res.status(200).json({
                              status: "OK",
                              result: {
                                data: {
                                  id: student._id,
                                  role: role,
                                  email: email,
                                  username: username,
                                  firstName: firstName,
                                  lastName: lastName,
                                  department: department,
                                  registrationNo: registrationNo,
                                  session: session,

                                  varsity: varsity,
                                  registered_at: registered_at,
                                },
                              },
                            });

                            // apiResponseInJson(res, 200, student);
                          })
                          .catch((error) => {
                            console.log(error);
                            console.log("New student Account Update Failed!");
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
              if (updatedUsername) student.username = updatedUsername;
              if (updatedFirstName) student.firstName = updatedFirstName;
              if (updatedLastName) student.lastName = updatedLastName;
              if (updatedSession) student.session = updatedSession;

              if (updatedregistrationNo)
                student.registrationNo = updatedregistrationNo;
              student
                .save()
                .then((student) => {
                  UniversityModel.findById(req.user.varsity)
                    .then((university) => {
                      let department;
                      let role = student.role;
                      let email = student.email;
                      let username = student.username;
                      let firstName = student.firstName;
                      let lastName = student.lastName;
                      let varsity = university.shortform;
                      let registrationNo = student.registrationNo;
                      let registered_at = student.registered_at;
                      let session = student.session;

                      university.departments.forEach((dept) => {
                        if (dept.id == req.user.department) {
                          department = dept.shortform;
                        }
                      });

                      return res.status(200).json({
                        status: "OK",
                        result: {
                          data: {
                            id: student._id,
                            role: role,
                            email: email,
                            username: username,
                            firstName: firstName,
                            lastName: lastName,
                            department: department,
                            registrationNo: registrationNo,
                            session: session,
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
                  console.log("New student Account Update Failed!");
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
                student.email = updatedEmail;

                if (updatedUsername) student.username = updatedUsername;
                if (updatedFirstName) student.firstName = updatedFirstName;
                if (updatedLastName) student.lastName = updatedLastName;
                if (updatedSession) student.session = updatedSession;
                if (updatedregistrationNo)
                  student.registrationNo = updatedregistrationNo;
                student
                  .save()
                  .then((student) => {
                    let department;
                    let role = student.role;
                    let email = student.email;
                    let username = student.username;
                    let firstName = student.firstName;
                    let lastName = student.lastName;
                    let varsity = university.shortform;
                    let registrationNo = student.registrationNo;
                    let registered_at = student.registered_at;
                    let session = student.session;

                    university.departments.forEach((dept) => {
                      if (dept.id == req.user.department) {
                        department = dept.shortform;
                      }
                    });

                    return res.status(200).json({
                      status: "OK",
                      result: {
                        data: {
                          id: student._id,
                          role: role,
                          email: email,
                          username: username,
                          firstName: firstName,
                          lastName: lastName,
                          department: department,
                          registrationNo: registrationNo,
                          session: session,
                          registered_at: registered_at,
                          varsity: varsity,
                        },
                      },
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                    console.log("New student Account Update Failed!");
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
            if (updatedUsername) student.username = updatedUsername;
            if (updatedFirstName) student.firstName = updatedFirstName;
            if (updatedLastName) student.lastName = updatedLastName;
            if (updatedSession) student.session = updatedSession;
            if (updatedregistrationNo)
              student.registrationNo = updatedregistrationNo;
            student
              .save()
              .then((student) => {
                UniversityModel.findById(req.user.varsity)
                  .then((university) => {
                    let department;
                    let role = student.role;
                    let email = student.email;
                    let username = student.username;
                    let firstName = student.firstName;
                    let lastName = student.lastName;
                    let varsity = university.shortform;
                    let registrationNo = student.registrationNo;
                    let registered_at = student.registered_at;
                    let session = student.session;

                    university.departments.forEach((dept) => {
                      if (dept.id == req.user.department) {
                        department = dept.shortform;
                      }
                    });

                    return res.status(200).json({
                      status: "OK",
                      result: {
                        data: {
                          id: student._id,
                          role: role,
                          email: email,
                          username: username,
                          firstName: firstName,
                          lastName: lastName,
                          department: department,
                          registrationNo: registrationNo,
                          session: session,
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
                console.log("New student Account Update Failed!");
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

        errorHandler.validationError(res, 400, "student not found.");
      });
  } else {
    errorHandler.unauthorizedAccess(res);
  }
};

exports.postCourseAdd = (req, res, next) => {
  let student = req.user;

  if (student.role === "Student") {
    StudentModel.findOne({
      "courses.course": req.body.course,
    })
      .then((result) => {
        console.log(result);
        if (result) {
          errorHandler.validationError(res, 200, "Course Already Added");
        } else {
          student.courses.push(req.body);
          student
            .save()
            .then((data) => {
              // console.log("save course", data);

              console.log("Student course added");

              CourseModel.findById(req.body.course)
                .then((course) => {
                  course.students.push({
                    course: student._id,
                  });
                  course
                    .save()
                    .then((result) => {
                      console.log(result);

                      data
                        .populate("courses.course")
                        .execPopulate()
                        .then((result) => {
                          // console.log("populate course", result);
                          apiResponseInJson(res, 400, result.courses);
                        })
                        .catch((error) => {
                          console.log(error);
                          errorHandler.serverError(res);
                        });
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                })
                .catch((error) => {
                  console.log(error);
                  errorHandler.serverError(res);
                });
            })
            .catch((error) => {
              console.log(error);
              errorHandler.serverError(res);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else errorHandler.validationError(res, 201, "Invalid Request");
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
      console.log(course);
      if (course) {
        course.mcqExams.forEach((exam) => {
          exam.examId.mcqQuestions = undefined;
        });

        course.cqExams.forEach((exam) => {
          exam.examId.cqQuestions = undefined;
        });

        course.createdBy.courses = undefined;

        course.students.forEach((student) => {
          student.student.varsity = undefined;
          student.student.courses = undefined;
        });

        apiResponseInJson(res, 200, course);
      } else errorHandler.validationError(res, 400, "No Course Found");
    })
    .catch((error) => {
      console.log(error);
      errorHandler.serverError(res);
    });
};

exports.postMcqSubmit = (req, res, next) => {
  const examId = req.params.id;
  const { studentAnswers } = req.body;

  let solved = 0;
  let wrong = 0;
  let marks = 0;

  McqExamModel.findById(examId)
    .then((exam) => {
      for (let i = 0; i < studentAnswers.length; i++) {
        if (
          studentAnswers[i].mcqQuestion ==
          exam.mcqQuestions[i].mcqQuestionId._id
        ) {
          if (
            studentAnswers[i].studentAnswer ==
            exam.mcqQuestions[i].mcqQuestionId.correctAnswers[0].answer
          ) {
            solved++;
            marks += exam.mcqQuestions[i].mcqQuestionId.marks;
          }
        }
      }

      wrong = studentAnswers.length - solved;

      console.log(solved, wrong, marks);

      const onMcqExam = new OnMcqExamModel({
        mcqExam: examId,
        student: req.user._id,
        studentAnswers: studentAnswers,
        solved: solved,
        wrong: wrong,
        mark: marks,
      });
      onMcqExam
        .save()
        .then((result) => {
          console.log(result);
          apiResponseInJson(res, 200, result);
        })
        .catch((error) => {
          console.log(error);
          errorHandler.validationError(res, 400, error);
        });
    })
    .catch((error) => {
      console.log(error);
      errorHandler.validationError(res, 400, error);
    });
};

exports.postCqSubmit = (req, res, next) => {
  const examId = req.params.id;
  const { studentAnswers } = req.body;
  const onCqExamModel = new OnCqExamModel({
    cqExam: examId,
    student: req.user._id,
    studentAnswers: studentAnswers,
  });
  onCqExamModel
    .save()
    .then((result) => {
      apiResponseInJson(res, 200, result);
    })
    .catch((error) => {
      console.log(error);
      errorHandler.validationError(res, 400, error);
    });
};

exports.getMcqSubmit = (req, res, next) => {
  OnMcqExamModel.find({
    mcqExam: req.params.id,
    student: req.user._id,
  })
    .then((result) => {
      console.log(result);
      apiResponseInJson(res, 200, result);
    })
    .catch((error) => {
      console.log(error);
      errorHandler.validationError(res, 400, error);
    });
};

exports.getCqSubmit = (req, res, next) => {
  OnCqExamModel.find({
    cqExam: req.params.id,
    student: req.user._id,
  })
    .then((result) => {
      console.log(result);
      apiResponseInJson(res, 200, result);
    })
    .catch((error) => {
      console.log(error);
      errorHandler.validationError(res, 400, error);
    });
};


