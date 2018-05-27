var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
  title: String,
  description: String
});

var Topic = mongoose.model("Topic", TopicSchema);
module.exports = Topic;