const router = require("express").Router();
const chatUtils = require("../utils/chat");
const showModel = require("../models/show").model;


router.get("/", (req, res) => {
    showModel.find({}).sort([["name"]]).exec((err, result) => {
        if(err)
            err = "something went wrong";
        console.log(result);
        res.render("shows", {user: req.user, emotes: chatUtils.emotes, allShows: result, err: err});
    });
});
router.get("/:show", (req, res) => {
    showModel.findById(req.params.show, (err, result) => {
        if(err)
            err = "something went wrong";
        console.log(result);
        res.render("episodes", {user: req.user, emotes: chatUtils.emotes, allEpisodes: result.episodes, err: err});
    });
});


module.exports = {router: router};
