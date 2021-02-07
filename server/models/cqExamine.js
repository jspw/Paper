const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cqExamine = new Schema({
  onCqExams: {
    type: Schema.Types.ObjectId,
    ref: "OnCqExam",
    required:true
  },
  
});
cqExamine.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model("CqExamine", cqExamine);
