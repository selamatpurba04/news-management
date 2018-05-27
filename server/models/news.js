var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
  title: String,
  description: String,
  idStatus: { type: Schema.Types.ObjectId, ref: 'statusNews' },
  idTopics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }]
});

var News = mongoose.model("News", NewsSchema);
module.exports = News;