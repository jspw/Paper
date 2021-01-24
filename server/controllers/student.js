const StudentModel = require("../models/student");

exports.getStudent = (req, res, next) => {
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
            varsity: student.varsity.shortform,
          },
        },
      });
    })
    .catch((error) => {
      console.log(error);

      return res.status(400).json({
        status: "FAILED",
        result: "Student not found.",
      });
    });
};
