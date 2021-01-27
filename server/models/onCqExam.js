const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const onCqExamSchema = new Schema({
  cqExam: {
    type: Schema.Types.ObjectId,
    ref: "CqExam",
    required: true,
  },
  stduent: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  studentAnswers: [
    {
      cqQuestion: {
        type: Schema.Types.ObjectId,
        ref: "CqQuestion",
        required: true,
      },
      studentAnswer: {
        type: String,
      },
    },
  ],
  solved: {
    type: Number,
    required: true,
  },
  wrong: {
    type: Number,
    required: true,
  },
  mark: {
    type: Number,
  },
  examDate: {
    type: Date.now(),
  },
});

module.exports = mongoose.model("OnCqExam", onCqExamSchema);
