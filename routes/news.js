const router = require("express").Router();
const chatUtils = require("../utils/chat");
const newsModel = require("../models/news").model;

router.get("/", (req, res) => {
    newsModel.find({}).sort([["date", -1]]).exec((err, result) => {
        if(err)
          err = "something went wrong";
        console.log(result);
        res.render("news", {user: req.user, emotes: chatUtils.emotes, allNews: result, err: err});
    });
});
router.get("/:id", (req, res) => {
    newsModel.findById(req.params.id, (err, result) => {
        if(err)
            err = "something went wrong";
        res.render("full_news", {user: req.user, emotes: chatUtils.emotes, news: result, err: err});
    });
})
module.exports = {router: router};
