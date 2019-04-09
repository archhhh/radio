const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const episodeSchema = new Schema({
//    name: String,
//    link: String,
//    thumbnail: String,
//    description:  String
//});
const showSchema = new Schema({
    name: String,
    thumbnail: String,
    hosts: [String],
    description: String,
    episodes: [String],
});
const Show = mongoose.model("show", showSchema);
module.exports = {model: Show};