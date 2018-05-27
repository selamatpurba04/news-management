var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// status note
// 0 => de
var statusNewsSchema = new Schema({
  title: String
});

var StatusNews = mongoose.model("statusNews", statusNewsSchema);
module.exports = StatusNews;