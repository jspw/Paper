const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const onCqExamSchema = new Schema({
  cqExam: {
    type: Schema.Types.ObjectId,
    ref: "CqExam",
    required: true,
    autopopulate: { maxDepth: 2 },
  },
  stduent: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
    autopopulate: { maxDepth: 2 },
  },
  studentAnswers: [
    {
      cqQuestion: {
        type: Schema.Types.ObjectId,
        ref: "CqQuestion",
        required: true,
        autopopulate: { maxDepth: 2 },
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
onCqExamSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model("OnCqExam", onCqExamSchema);
