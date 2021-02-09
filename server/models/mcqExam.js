const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mcqExamSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required:true,
    autopopulate: { maxDepth: 1 },
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
        autopopulate: { maxDepth: 2 },
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
  // createdBy : {
  //   type: Schema.Types.ObjectId,
  //   ref: "Teacher",
  //   required: true,
  //   autopopulate: { maxDepth: 1 },
  // }
});
mcqExamSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model("McqExam", mcqExamSchema);
