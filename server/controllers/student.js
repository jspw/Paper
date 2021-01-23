const StudentModel = require('../models/student');


exports.getStudent = (req, res, next) => {

    StudentModel.findById(req.params.id)
        .then(student => {

            student.password = undefined;

            return res.status(201).json(
                {
                    status: "OK",
                    result: {
                        data: {
                            student
                        }
                    }
                }
            );
        })
        .catch(error => {
            console.log(error);

            return res.status(400).json({
                status: "FAILED",
                comment: "Student not found."
            });
        });

}