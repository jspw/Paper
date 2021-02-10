const mongoose = require("mongoose");
const validator = require("validator");

const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
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
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  designation: {
    type: String,
    required: true,
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
  courses: [
    {
      course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        unique: true,
        autopopulate: { maxDepth: 3 },
      },
    },
  ],
  registered_at: {
    type: Date,
    default: Date.now,
  },
});
teacherSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model("Teacher", teacherSchema);
