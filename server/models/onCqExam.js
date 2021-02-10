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
  marks: [
    {
      cqQuestion: {
        type: Schema.Types.ObjectId,
        ref: "CqQuestion",
        autopopulate: { maxDepth: 1 },
      },
      mark :{
        type : Number 
      }
    }
  ],
  totalMarks: {
    type: Number,
  },
  feedback: {
    type: String,
  },
  windowChanged: {
    type: Number,
  },
  examineBy: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    autopopulate: { maxDepth: 1 },
  }
});
onCqExamSchema.plugin(require("mongoose-autopopulate"));
onCqExamSchema.index({ cqExam: 1, student: 1 }, { unique: true });
module.exports = mongoose.model("OnCqExam", onCqExamSchema);
