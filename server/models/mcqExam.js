const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mcqExamSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required:true
  },
  mcqQuestions: [
    {
      mcqQuestionId: {
        type: Schema.Types.ObjectId,
        ref: "McqQuestion",
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

module.exports = mongoose.model("McqExam", mcqExamSchema);
