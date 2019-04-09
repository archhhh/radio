const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const configSchema = new Schema({
    name: String,
    value: String,
});
const Config = mongoose.model("config", configSchema);
module.exports = {model: Config};