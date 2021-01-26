const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cqExamSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required:true
  },
  cqQuestions: [
    {
      cqQuestionId: {
        type: Schema.Types.ObjectId,
        ref: "CqQuestion",
        required: true,
      },
    },
  ],
  totalTime: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required:true
  },
});

module.exports = mongoose.model("CqExam", cqExamSchema);
