const TeacherModel = require("../models/teacher");
const CourseModel = require("../models/course");
const McqQuestionModel = require("../models/mcqQuestion");
const McqExamModel = require("../models/mcqExam");
const UniversityModel = require("../models/university");

const CqQuestionModel = require("../models/cqQuestion");
const CqExamModel = require("../models/cqExam");

const errorHandler = require("../middleware/errorHandler");
const apiResponseInJson = require("../middleware/apiResponseInJson");

const bcrypt = require("bcryptjs");
const university = require("../models/university");

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
        console.log("MCQ Question Created!");

        apiResponseInJson(res, 201, mcqQuestion);
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

        apiResponseInJson(res, 201, mcqExam);
      })
      .catch((error) => {
        errorHandler.validationError(res, 401, error);
      });
  } else {
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

        apiResponseInJson(res, 201, cqExam);
      })
      .catch((error) => {
        errorHandler.validationError(res, 401, error);
      });
  } else {
    errorHandler.unauthorizedAccess(res);
  }
};
