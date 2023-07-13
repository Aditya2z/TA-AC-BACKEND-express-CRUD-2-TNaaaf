var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String },
  pages: { type: Number, required: true },
  publication: { type: String },
  cover_image: { type: String, required: true },
  category: [{type: String, required: true}],
  authorId: {type: Schema.Types.ObjectId, required: true, ref: "Author"}
});

module.exports = mongoose.model("Book", bookSchema);
