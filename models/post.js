const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
    header: String,
    date: Date,
    short_description: String,
    full_description: String,
    thumbnail: String,
    tags: [String],
});
const Post = mongoose.model("post", postSchema);
module.exports = {model: Post};