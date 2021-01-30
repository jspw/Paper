const mongoose = require("mongoose");
// const autopopulate = require("mongoose-autopopulate");
const Schema = mongoose.Schema;

const cqExamSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cqQuestions: [
    {
      cqQuestionId: {
        type: Schema.Types.ObjectId,
        ref: "CqQuestion",
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
    required: true,
  },
});
cqExamSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model("CqExam", cqExamSchema);
