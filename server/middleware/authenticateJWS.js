require('dotenv').config();
const jwt = require('jsonwebtoken');

const StudentModel = require('../models/student');
const TeacherModel = require('../models/teacher');


module.exports = function (req, res, next) {

    const authHeader = req.headers.authorization;

    if (authHeader) {

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
            if (err) {
                return res.status(403).json({
                    status: "FAILED",
                    comment: "Invalid token"
                });
            } else {

                console.log("Verified token");

                console.log(user);

                console.log(new Date(user.iat*1000));

                console.log(user._id);

                StudentModel.findById(user._id).then(student => {
                    if (student) {
                        req.user = student;
                        next();
                    } else {
                        console.log("User not found! in Student DB");

                        TeacherModel.findById(user._id).then(teacher => {
                            if (teacher) {
                                res.user = teacher;
                                next();
                            } else {
                                console.log("User not found! in Teacher DB");
                                res.status(401).json({
                                    status: "FAILED",
                                    comment: "Unauthorized user"
                                });
                            }
                        })
                    }
                }).catch(error => console.log(error));
            }


        });
    } else {
        res.status(401).json({
            status: "FAILED",
            comment: "No token given.."
        });
    }
}


