const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mcqQuestionSchema = new Schema({
  description: {
    type: String,
  },
  descriptionImage: {
    type: Schema.Types.Buffer,
  },
  mainQuestion: {
    type: String,
    required: true,
  },
  options: [
    {
      option: String,
      // required: true,
    },
  ],
  correctAnswers: [
    {
      answer: String,
    },
  ],
  time: {
    type: Number,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("McqQuestion", mcqQuestionSchema);
