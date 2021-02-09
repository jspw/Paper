const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const onMcqExamSchema = new Schema({
  mcqExam: {
    type: Schema.Types.ObjectId,
    ref: "McqExam",
    required: true,
    autopopulate: { maxDepth: 2 },
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
    autopopulate: { maxDepth: 2 },
  },
  studentAnswers: [
    {
      mcqQuestion: {
        type: Schema.Types.ObjectId,
        ref: "McqQuestion",
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
    required: true,
  },
  feedback:{
    type : String
  },
  windowChanged: {
    type: Number,
  },
  submitOn: {
    type: Date,
    default: Date.now,
  },
});
onMcqExamSchema.plugin(require("mongoose-autopopulate"));
onMcqExamSchema.index({ mcqExam: 1, student: 1 }, { unique: true });
module.exports = mongoose.model("OnMcqExam", onMcqExamSchema);
