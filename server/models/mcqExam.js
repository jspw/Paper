const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mcqExamSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required:true
  },
  name: {
    type: String,
    required: true,
  },
  mcqQuestions: [
    {
      mcqQuestionId: {
        type: Schema.Types.ObjectId,
        ref: "McqQuestion",
        required: true,
        autopopulate: true
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
mcqExamSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model("McqExam", mcqExamSchema);
