var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var authorSchema = new Schema({
    author_name: { type: String, required: true },
    author_email: { type: String, required: true, match: /@/ },
    author_country: { type: String, required: true },
    books: [{type: Schema.Types.ObjectId, ref: "Book"}]
});

module.exports = mongoose.model("Author", authorSchema);