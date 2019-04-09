const express = require("express");
const app = express();
const authRoutes = require("./routes/auth").router;
const radioRoutes = require("./routes/radio").router;
const newsRoutes = require("./routes/news").router;
const showsRoutes = require("./routes/shows").router;
const postsRoutes = require("./routes/posts").router;
const apiRoutes = require("./routes/api").router;
const profileRoutes = require("./routes/profile").router;
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const socket = require("socket.io");
const chatUtils = require("./utils/chat");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const userModel = require("./models/user").model;
const passport_setup = require("./config/passport");

mongoose.connect(keys.db.connect);
mongoose.Promise = global.Promise;

mongoose.connection.once("open", () => {
        app.set("view engine", "ejs");

        //serving static files
        app.use("/assets", express.static("assets"));
        app.use(cookieSession({
                maxAge: 24*60*60*1000,
                keys: [keys.session.key]
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(expressValidator());

        //route setup
        app.use("/auth", authRoutes);
        app.use("/radio", radioRoutes); 
        app.use("/api", apiRoutes);
        app.use("/news", newsRoutes);
        app.use("/shows", showsRoutes);
        app.use("/posts", postsRoutes);
        app.use("/profile", profileRoutes);
        app.get("/", (req, res)=>{
                res.redirect("/news/");
        });
        app.get("/about", (req,res) => {
                res.render("about", {user: req.user, emotes: chatUtils.emotes});
        });

        // Chat setup

        let server = app.listen(4000);
        let io = socket(server);
        let timing = {};

        io.on("connection", function(socket){
           timing[socket.id] = "";
           socket.on("chat", (data) => {
               userModel.findById(data.user).then((result) => {
                        if(result)
                        {
                                if(!result.banned)
                                {
                                        let currentTime = new Date();
                                        console.log("Time: " + (currentTime - timing[socket.id])/1000 + " Socket: " + socket.id);
                                        if(timing[socket.id] == "" || (currentTime - timing[socket.id])/1000 >= 5)
                                        {
                                                timing[socket.id]= currentTime;
                                                data.msg = chatUtils.parse(data.msg);
                                                if(!(/^\s*$/.test(data.msg)))                                                        {
                                                        let role = "user";
                                                        if(result.rights.includes("Admin"))
                                                                role = "admin";
                                                        io.emit("chat", {msg: data.msg, handle:result.username, role: role});
                                                }
                                        }
                                }else{
                                        socket.close();
                                }
                        }else{
                                socket.close();
                        }
                });
           }).on("disconnect", (reason) => {
                delete timing[socket.id];
                console.log(`Disconnected ${socket.id}`);
           });
        }).on("error", (error) => {
                console.log(`Error occured: error`);
        });

}).on("error", (error) => {
        console.log(error);
});
