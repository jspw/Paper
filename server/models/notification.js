const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  type: {
    type: String,
  },
  typeID: {
    type: Schema.Types.ObjectId,
  },
  name :{
    type: String,
  },
  varsity: {
    type: String,
  },
  department: {
    type: String,
  },
});

notificationSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Notification", notificationSchema);
