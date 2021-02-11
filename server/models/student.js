const mongoose = require("mongoose");
const validator = require("validator");
// const autopopulate = require('mongoose-autopopulate')

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  role: {
    type: String,
    required: true,
    enum: ["Student", "Teacher"],
  },
  username: {
    type: String,
    require: true,
    unique: true,
    minlength: 3,
  },

  email: {
    type: String,
    unique: true,
    // validate: {
    //     validator: validator.email,
    //     message: 'This is not a valid email',
    // },
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "University.departments",
    required: true,
  },
  varsity: {
    type: Schema.Types.ObjectId,
    ref: "University",
    required: true,
    autopopulate: { maxDepth: 2 },
  },
  registrationNo: {
    type: Number,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  courses: [
    {
      course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        unique: true,
        autopopulate: { maxDepth: 3},
      },
    },
  ],

  notifications: [
    {
      notification: {
        type: Schema.Types.ObjectId,
        ref: "Notification",
        autopopulate: { maxDepth: 2},
      },
      condition: {
        type: String,
      }
    },
  ],
  registered_at: {
    type: Date,
    default: Date.now,
  },
});

studentSchema.methods.addCourse = function (course) {
  // const updatedCourses = [...this.courses];
  // updatedCourses.push(course);
  // this.courses = updatedCourses;
  // return this.courses.save();
  return this.courses.push(course);
};

// studentSchema.plugin(autopopulate);
studentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("Student", studentSchema);
