const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:String,
    password:String, 
    googleID:String,
    facebookID: String,
    rights: [String],
    usernameChanged: Boolean,
    banned: Boolean,
});
const User = mongoose.model("user", userSchema);
module.exports = {model: User};