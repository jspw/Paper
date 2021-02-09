const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  student: {
    type: String,
    required: true,
    unique: false,
  },

  code: {
    type: String,
    required: true,
    unique: false,
  },

  department: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "University.departments",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },

});


notificationSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Notification", notificationSchema);
