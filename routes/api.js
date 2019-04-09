const router = require("express").Router();
const configModel = require("../models/config").model;
const http = require("http");

router.get("/user", (req, res) => {
    if(req.user)
        res.send({user: req.user.id});
    else
        res.send({user: "none"});
});
router.post("/radioMetaChange" , (req, res) => {
    if(!req.user)
        res.sendStatus(403);
    else{
        configModel.findOneAndUpdate({name: "currentShow"}, { $set:{value: req.body.show}}, (err, savedDoc) => {
            if(err)
                res.send(err);
            else{
                configModel.findOneAndUpdate({name: "currentTrack"}, { $set: {value: req.body.track}}, (err, savedDoc) => {
                    if(err)
                        res.send(err);
                    else
                        res.send("Success");
                });
            }
        });
    }
});
router.get("/radioMeta", (req,res) => {
    let meta = new Object();
    configModel.findOne({name: "currentShow"}, (err, result) => {
        if(err){
            meta.show = "";
        }else{
            meta.show = result.value;
        }
        configModel.findOne({name: "currentTrack"} , (err, result) => {
            if(err){
                meta.track = "";
            }else{
                meta.track = result.value;
            }
            res.send(meta);
        });
    });
});
router.get("/radioStatus", (req, res) => {
    http.get("http://13.209.55.253:8000/stream", (resp) => {
        if(resp.statusCode == 404)
            res.send({value: "OFF"});
        else
            res.send({value: "ON"});
    });
});
module.exports = {router: router};
