const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const StudentModel = require('../models/student');
const TeacherModel = require('../models/teacher');
const UniversityModel = require('../models/university');


exports.postCreateUniversity = (req, res, next) => {
    console.log(req.body);

    const universityModel = new UniversityModel(

        req.body

    );
    universityModel.save()
        .then(result => {
            res.status(202).json({
                "status": "OK",
                comment: "University created successfully."
            })
        }
        )
        .catch(error => console.log(error));
}

exports.postCreateTeacher = (req, res, next) => {

    const { role, username, email, password, repassword, firstName, lastName, department, varsity, designation } = req.body;

    // console.log(role, username, email, password, repassword, firstName, lastName, department, varsity, designation);

    if (password !== repassword) {
        res.status(400)
            .json(
                {
                    status: "FAILED",
                    comment: "Password have to be matched!"
                }
            );
    }

    else {
        bcrypt.hash(password, 10)
            .then(hash => {

                const teacherModel = new TeacherModel({
                    role: role,
                    email: email,
                    username: username,
                    password: hash,
                    firstName: firstName,
                    lastName: lastName,
                    department: department,
                    varsity: varsity,
                    designation: designation
                });

                return teacherModel.save()
                    .then(
                        teacher => {

                            console.log("New teacher Account Created!");

                            teacher.password = undefined;

                            res.status(201).json({
                                status: "OK",
                                result: {
                                    token: jwt.sign(
                                        {
                                            _id: teacher._id
                                        },

                                        process.env.JWT_SECRET_TOKEN,

                                        {
                                            expiresIn: process.env.JWT_EXPIRES_IN
                                        }
                                    ),
                                    data: {
                                        teacher
                                    }
                                }
                            });
                        }
                    );

            })
            .catch(error => {
                console.log("New teacher Account Creation Failed!");


                let errorMessage;

                if (error.code == 11000) {
                    if (error.keyPattern.username)
                        errorMessage = "Username already exits";
                    else if (error.keyPattern.email)
                        errorMessage = "Email address already exits";
                    // } else if (error.errors.role.message) {
                    //     errorMessage = error.errors.role.message;
                } else errorMessage = error;


                res.status(401).json({
                    status: "FAILED",
                    result: errorMessage
                });
            });
    }


};

exports.postCreateStudent = (req, res, next) => {

    const { role, username, email, password, repassword, firstName, lastName, department, varsity, registrationNo, session } = req.body;

    // console.log(role, username, email, password, repassword, firstName, lastName, department, registrationNo, session);

    if (password !== repassword) {
        res.status(400)
            .json(
                {
                    status: "FAILED",
                    comment: "Password have to be matched!"
                }
            );
    }

    else {
        bcrypt.hash(password, 10)
            .then(hash => {

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
                    session: session
                });

                return studentModel.save()
                    .then(
                        student => {
                            console.log("New Student Account Created!");

                            student.password = undefined;

                            res.status(201).json(
                                {
                                    status: "OK",
                                    result: {
                                        token: jwt.sign(
                                            {
                                                _id: student._id
                                            },

                                            process.env.JWT_SECRET_TOKEN,

                                            {
                                                expiresIn: process.env.JWT_EXPIRES_IN
                                            }
                                        ),
                                        data: {

                                            student
                                        }
                                    }
                                }
                            );
                        }
                    );

            })
            .catch(error => {
                console.log("New Student Account Creation Failed!");

                // console.log(error)

                let errorMessage;

                if (error.code == 11000) {
                    if (error.keyPattern.username)
                        errorMessage = "Username already exits";
                    else if (error.keyPattern.email)
                        errorMessage = "Email address already exits";
                    // } else if (error.errors.role.message) {
                    //     errorMessage = error.errors.role.message;
                } else errorMessage = error;


                res.status(401).json({
                    status: "FAILED",
                    result: errorMessage
                });
            });
    }

    // }
};



exports.getLogin = (req, res, next) => {

    const { email, password } = req.body;

    console.log(email, password);

    if (!email || !password) {
        return res.status(400)
            .json(
                {
                    status: "FAILED",
                    message: "Invalid body structure"
                }
            );
    } else {


        StudentModel.findOne({
            email: email
        }).then(student => {

            if (student) {

                console.log("Student User Found");

                bcrypt.compare(password, student.password).then(matchResult => {

                    console.log("Student User Password Match");

                    student.password = undefined;

                    if (matchResult) {
                        return res.status(200).json(
                            {
                                status: "OK",
                                result: {
                                    token: jwt.sign(
                                        {
                                            _id: student._id
                                        },

                                        process.env.JWT_SECRET_TOKEN,

                                        {
                                            expiresIn: process.env.JWT_EXPIRES_IN
                                        }
                                    ),
                                    data: {

                                        student
                                    }
                                }


                            }
                        );
                    }

                }).catch(error => console.log(error));
            }
            else {

                TeacherModel.findOne({
                    email: email
                })
                    .then(teacher => {

                        if (teacher) {

                            console.log("Teacher User Found");

                            bcrypt.compare(password, teacher.password).then(matchResult => {

                                if (matchResult) {

                                    console.log("Teacher User Password Matched");

                                    teacher.password = undefined;

                                    return res.status(200).json(
                                        {
                                            status: "OK",
                                            result: {
                                                token: jwt.sign(
                                                    {
                                                        _id: teacher._id
                                                    },

                                                    process.env.JWT_SECRET_TOKEN,

                                                    {
                                                        expiresIn: process.env.JWT_EXPIRES_IN
                                                    }
                                                ),
                                                data: {
                                                    teacher
                                                }
                                            }

                                        }
                                    );
                                } else {

                                    return res.status(401)
                                        .json(
                                            {
                                                status: "FAILED",
                                                message: "Invalid Email or Password"
                                            }
                                        );


                                }

                            }).catch(error => console.log(error));

                        } else {
                            return res.status(401)
                                .json(
                                    {
                                        status: "FAILED",
                                        message: "No User Found"
                                    }
                                );

                        }

                    }
                    ).catch(error => console.log(error));

            }

        }
        ).catch(error => console.log(error));
    }
}