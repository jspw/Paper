const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cqQuestionSchema = new Schema({

  description: {
    type: String,
  },
  descriptionImage: {
    type: Schema.Types.Buffer,
  },
  mainQuestion: {
    type: String,
    required:true
  },
  time: {
    type: Number,
    required:true
  },
  marks: {
    type: Number,
  },
  creationTime: {
    type: Date,
    default: Date.now(),
  },
});
cqQuestionSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model("CqQuestion", cqQuestionSchema);
