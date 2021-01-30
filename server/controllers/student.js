const errorHandler = require("../middleware/errorHandler");
const StudentModel = require("../models/student");
const UniversityModel = require("../models/university");
const bcrypt = require("bcryptjs");
const student = require("../models/student");
const apiResponseInJson = require("../middleware/apiResponseInJson");
const CourseModel = require("../models/course");

exports.getStudent = (req, res, next) => {
  StudentModel.findById(req.params.id)
    .populate("varsity")
    .populate("courses.course")
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

      // console.log(student);

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
              errorHandler.serverError(res);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else errorHandler.validationError(res, 201, "Invalid Request");
};
