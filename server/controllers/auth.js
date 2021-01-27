const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const UniversityModel = require("../models/university");
const StudentModel = require("../models/student");
const TeacherModel = require("../models/teacher");
const errorHandler = require("../middleware/errorHandler");

exports.postCreateUniversity = (req, res, next) => {
  console.log(req.body);

  const universityModel = new UniversityModel(req.body);
  universityModel
    .save()
    .then((result) => {
      res.status(201).json({
        status: "OK",
        result: "University created successfully.",
      });
    })
    .catch((error) => {
      console.log(error);
      errorHandler.serverError(res);
    });
};

exports.postCreateTeacher = (req, res, next) => {
  const {
    role,
    username,
    email,
    password,
    repassword,
    firstName,
    lastName,
    department,
    varsity,
    designation,
  } = req.body;

  // console.log(req.body);
  // console.log(role, username, email, password, repassword, firstName, lastName, department, varsity, designation);

  if (password !== repassword) {
    errorHandler.validationError(res, 400, "Passwords Have to Match!");
  } else {
    bcrypt
      .hash(password, 10)
      .then((hash) => {
        UniversityModel.findOne({
          "emails.email": email,
        })
          .then((result) => {
            // console.log(result);

            if (result && result._id == varsity) {
              const teacherModel = new TeacherModel({
                role: role,
                email: email,
                username: username,
                password: hash,
                firstName: firstName,
                lastName: lastName,
                department: department,
                varsity: varsity,
                designation: designation,
              });

              return teacherModel
                .save()
                .then((teacher) => {
                  console.log("New teacher Account Created!");

                  return res.status(201).json({
                    status: "OK",
                    result: {
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
                      data: {
                        user: teacher.role,
                        id: teacher._id,
                      },
                    },
                  });
                })
                .catch((error) => {
                  console.log("New teacher Account Creation Failed!");
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
};

exports.postCreateStudent = (req, res, next) => {
  const {
    role,
    username,
    email,
    password,
    repassword,
    firstName,
    lastName,
    department,
    varsity,
    registrationNo,
    session,
  } = req.body;

  console.log(
    role,
    username,
    email,
    password,
    repassword,
    firstName,
    lastName,
    department,
    registrationNo,
    session
  );

  if (password !== repassword) {
    errorHandler.validationError(res, 400, "Passwords Have To Match!");
  } else {
    bcrypt
      .hash(password, 10)
      .then((hash) => {
        UniversityModel.findOne({
          "emails.email": email,
        })
          .then((result) => {
            // console.log(result);

            if (result && result._id == varsity) {
              const studentModel = new StudentModel({
                role: role,
                email: email,
                username: username,
                password: hash,
                firstName: firstName,
                lastName: lastName,
                department: department,
                registrationNo: registrationNo,
                varsity: varsity,
                session: session,
              });

              return studentModel
                .save()
                .then((student) => {
                  console.log("New Student Account Created!");

                  student.password = undefined;

                  return res.status(201).json({
                    status: "OK",
                    result: {
                      jwt: {
                        token: jwt.sign(
                          {
                            _id: student._id,
                          },

                          process.env.JWT_SECRET_TOKEN,

                          {
                            expiresIn: process.env.JWT_EXPIRES_IN,
                          }
                        ),
                        expiresIn: process.env.JWT_EXPIRES_IN,
                      },
                      data: {
                        user: student.role,
                        id: student._id,
                      },
                    },
                  });
                })
                .catch((error) => {
                  console.log("New Student Account Creation Failed!");

                  console.log(error);

                  let errorMessage;

                  if (error.code == 11000) {
                    if (error.keyPattern.username)
                      errorMessage = "Username Already Exists";
                    else if (error.keyPattern.email)
                      errorMessage = "Email Address Already Exists";
                  } else errorMessage = error;

                  console.log(errorMessage);

                  errorHandler.validationError(res, 400, errorMessage);
                });
            } else {
              console.log("WTF?");
              errorHandler.unauthorizedEmail(res);
            }
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
};

exports.getLogin = (req, res, next) => {
  const { email, password } = req.body;

  console.log(email, password);

  if (!email || !password) {
    return res.status(400).json({
      status: "FAILED",
      result: "Invalid body structure",
    });
  } else {
    StudentModel.findOne({
      email: email,
    })
      .populate("varsity")
      .exec()
      .then((student) => {
        if (student) {
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

          console.log(student);

          student.varsity.departments.forEach((dept) => {
            console.log(dept._id, student.department);
            if (dept._id.toString() == student.department.toString()) {
              department = dept.shortform;
            }
          });

          console.log("Student User Found");

          bcrypt
            .compare(password, student.password)
            .then((matchResult) => {
              console.log("Student User Password Match");

              if (matchResult) {
                return res.status(200).json({
                  status: "OK",
                  result: {
                    jwt: {
                      token: jwt.sign(
                        {
                          _id: student._id,
                        },

                        process.env.JWT_SECRET_TOKEN,

                        {
                          expiresIn: process.env.JWT_EXPIRES_IN,
                        }
                      ),
                      expiresIn: process.env.JWT_EXPIRES_IN,
                    },
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
              } else {
                errorHandler.validationError(res, 401, "Invalid Password!");
              }
            })
            .catch((error) => {
              console.log(error);
              errorHandler.serverError(res);
            });
        } else {
          TeacherModel.findOne({
            email: email,
          })
            .populate("varsity")
            .exec()
            .then((teacher) => {
              if (teacher) {
                let {
                  role,
                  email,
                  username,
                  firstName,
                  lastName,
                  registrationNo,
                  varsity,
                  designation,
                  registered_at,
                } = teacher;

                let department;

                teacher.varsity.departments.forEach((dept) => {
                  if (dept.id == teacher.department) {
                    department = dept.shortform;
                  }
                });

                console.log("teacher User Found");

                bcrypt
                  .compare(password, teacher.password)
                  .then((matchResult) => {
                    console.log("teacher User Password Match");

                    if (matchResult) {
                      return res.status(200).json({
                        status: "OK",
                        result: {
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
                          data: {
                            id: teacher._id,
                            role: role,
                            email: email,
                            username: username,
                            firstName: firstName,
                            lastName: lastName,
                            department: department,
                            registrationNo: registrationNo,
                            designation: designation,
                            registered_at: registered_at,
                            varsity: teacher.varsity.shortform,
                          },
                        },
                      });
                    } else {
                      errorHandler.validationError(
                        res,
                        401,
                        "Invalid Password!"
                      );
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    errorHandler.serverError(res);
                  });
              }

              //hgh///
              else {
                errorHandler.validationError(res, 403, "No User Found");
              }
            })
            .catch((error) => {
              console.log(error);
              errorHandler.serverError(res);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        errorHandler.serverError(res);
      });
  }
};
