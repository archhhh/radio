const router = require("express").Router();
const chatUtils = require("../utils/chat");
const postModel = require("../models/post").model;

router.get("/", (req, res) => {
    postModel.find({}).sort([["date", -1]]).exec((err, result) => {
        if(err)
            err = "something went wrong";
        console.log(result);
        res.render("posts", {user: req.user, emotes: chatUtils.emotes, allPosts: result, err: err});
    });
});
router.get("/:id", (req, res) => {
    postModel.findById(req.params.id, (err, result) => {
        if(err)
            err = "something went wrong";
        res.render("full_post", {user: req.user, emotes: chatUtils.emotes, post: result, err: err});
    });
})
router.get("/tag/:name", (req, res) => {
    postModel.find({ tags: { $in: [req.params.name] }}, (err, result) => {
        if(err)
            err = "something went wrong";
        res.render("posts", {user: req.user, emotes: chatUtils.emotes, allPosts: result, err: err});
    });
});
module.exports = {router: router};
