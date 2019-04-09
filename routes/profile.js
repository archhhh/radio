const router = require("express").Router();
const chatUtils = require("../utils/chat");

router.get("/", (req, res) => {
    if(req.user)
        res.render("profile", {user: req.user, emotes: chatUtils.emotes});
    else
        res.redirect("/");
});

module.exports = {router: router};
