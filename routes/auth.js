const router = require("express").Router();
const passport = require("passport");
const userModel = require("../models/user").model;
const bcrypt = require("bcryptjs");
const chatUtils = require("../utils/chat");

router.get("/login", (req, res) => {
    if(req.user){
        res.redirect('/');
    }else{
        res.render("login", {err: "", user: req.user, emotes: chatUtils.emotes});
    }
});

router.post("/login", (req, res) => {
    if(req.user){
        res.redirect('/');
    }else{
        authenticate(req,res);
    }
});

router.get("/signup", (req, res) => {
    if(req.user){
        res.redirect('/');
    }else{
        res.render("signup", {user: req.user, errors: [], emotes: chatUtils.emotes});
    }
});

router.post("/signup", (req, res) => {
    if(req.user){
        res.redirect('/');
    }else{
        let errors = validate(req);
        if(!errors)
        {
            userModel.findOne({username: req.body.username}, (err, result)=>{
                if(err)
                {
                    errors = [];
                    errors.push({location: "body", param: "username", msg: err, value: req.body.username});
                    res.render("signup", {user: req.user, errors: errors, emotes: chatUtils.emotes});
                }else if(result){
                    errors = [];
                    errors.push({location: "body", param: "username", msg: "Username exists", value: req.body.username});
                    res.render("signup", {user: req.user, errors: errors, emotes: chatUtils.emotes});
                }else{
                    bcrypt.genSalt(10, function(err, salt){
                        bcrypt.hash(req.body.password, salt, function(err, hash){
                            let newUser = new userModel({username: req.body.username, password: hash, banned: 0, usernameChanged: 1, rights: ["User"]});
                            newUser.save((err) => {
                                if(err)
                                {
                                    errors = [];
                                    errors.push({location: "body", param: "username", msg: err, value: req.body.username});
                                }
                                res.render("signup", {user: req.user, errors: errors, emotes: chatUtils.emotes});
                            });
                        });
                    });
                }
            });
        }else{
            res.render("signup", {user: req.user, errors: errors, emotes: chatUtils.emotes});
        }
    }
});

router.get("/logout", (req,res) => {
    if(req.user){
        req.logout();
    }
    res.redirect('/');
});

function validate(req){
    req.check("username", "Username should contain alphanumeric charactercs").isAlphanumeric();
    req.check("username", "Username should contain minimum 5 characters").isLength({min: 5});
    req.check("password", "Password should contain alphanumeric charactercs").isAlphanumeric();
    req.check("password", "Password should contain minimum 5 characters").isLength({min: 5});
    req.check("username", "username should contain maximum 16 characters").isLength({max: 16});
    req.check("password", "Passwords do not match").equals(req.body.confirmPassword);
    return req.validationErrors();
}

function authenticate(req, res){
    passport.authenticate("local", (err, user, info) => {
        if(err)
            res.render("login", {err: err, user: req.user, emotes: chatUtils.emotes});
        else if(!user)
            res.render("login", {err: info.message, user: req.user, emotes: chatUtils.emotes});
        else{
            req.logIn(user, (err) => {
                if(err)
                    return res.render("login", {err: err, user: req.user, emotes: chatUtils.emotes});
                else{
                    return res.redirect("/");
                }
            });
        }
    })(req,res);
}

module.exports = {router: router};

/*router.get("/google", (req, res, next) =>{
        if(req.user){
            res.redirect('/');
        }else{
            next();
        }
    }, passport.authenticate("google", {
    scope: ["profile", "email"]
}));
router.get("/google/redirect", (req, res, next) =>{
        if(req.user){
            res.redirect('/');
        }else{
            next();
        }
    }, passport.authenticate("google"), (req, res) =>{
        res.redirect('/');
});*/
/*router.get("/facebook", (req, res, next) =>{
        if(req.user){
            res.redirect('/');
        }else{
            next();
        }
    }, passport.authenticate("facebook"));
router.get("/facebook/redirect", (req, res, next) =>{
    if(req.user){
        res.redirect('/');
    }else{
        next();
    }
}, passport.authenticate("facebook"), (req, res) =>{
    res.redirect('/');
});*/
