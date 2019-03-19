var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// status note
// 0 => de
var statusSchema = new Schema({
  title: String
});

var Status = mongoose.model("Status", statusSchema);
module.exports = Status;