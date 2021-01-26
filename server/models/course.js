const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },

  code: {
    type: String,
    required: true,
    unique: false,
  },

  department: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "University.departments",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  varsity: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },
  },

  mcqExams: [
    {
      examId: {
        type: Schema.Types.ObjectId,
        ref: "McqExam",
        // required: true,
      },
    },
  ],

  cqExams: [
    {
      examId: {
        type: Schema.Types.ObjectId,
        ref: "CqExam",
        // required: true,
      },
    },
  ],

  creationDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Course", courseSchema);
