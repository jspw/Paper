const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const onCqExamSchema = new Schema({
  cqExam: {
    type: Schema.Types.ObjectId,
    ref: "CqExam",
    autopopulate: { maxDepth: 2 },
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    autopopulate: { maxDepth: 2 },
  },
  studentAnswers: [
    {
      cqQuestion: {
        type: Schema.Types.ObjectId,
        ref: "CqQuestion",
        autopopulate: { maxDepth: 2 },
      },
      studentAnswer: {
        type: String,
      },
    },
  ],
  submitOn: {
    type: Date,
    default: Date.now,
  },
});
onCqExamSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("OnCqExam", onCqExamSchema);
