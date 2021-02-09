const mongoose = require("mongoose");
// const autopopulate = require("mongoose-autopopulate");
const Schema = mongoose.Schema;

const cqExamSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
    autopopulate: { maxDepth: 1 },
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
    required: true,
  },
  // createdBy: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Teacher",
  //   required: true,
  //   autopopulate: { maxDepth: 1 },
  // },
});
cqExamSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("CqExam", cqExamSchema);
