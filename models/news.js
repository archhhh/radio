const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const newsSchema = new Schema({
    header: String,
    date: Date,
    short_description: String,
    full_description: String,
    thumbnail: String,
});
const News = mongoose.model("new", newsSchema);
module.exports = {model: News};