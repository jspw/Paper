const TeacherModel = require('../models/teacher');

exports.getTeacher = (req, res, next) => {

    TeacherModel.findById(req.params.id)
        .then(teacher => {

            teacher.password = undefined;

            return res.status(201).json(
                {
                    status: "OK",
                    result: {
                        data: {
                            teacher
                        }
                    }
                }
            );
        })
        .catch(error => {
            console.log(error);

            return res.status(400).json({
                status: "FAILED",
                comment: "Teacher not found."
            });
        });

}


