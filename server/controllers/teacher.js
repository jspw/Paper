const TeacherModel = require("../models/teacher");

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

      return res.status(400).json({
        status: "FAILED",
        result: "Teacher not found.",
      });
    });
};
