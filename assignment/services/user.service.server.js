var app = require("../../express");
var userModel = require("../models/user.model.server");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// http handlers
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.post("/api/login", passport.authenticate('local'), login);
app.get("/api/user", findUser);
app.post("/api/user", registerUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);
app.get("/api/checkLogin", checkLogin);

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel
        .updateUser(userId, user)
        .then(function (userStatus) {
            res.json(userStatus);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        })
}

function registerUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        })
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function findUser(req, res) {
    var username = req.params.username;
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if(user === null) {
                res.send("0")
            } else {
                res.json(user);
            }
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        })
}


function getAllUsers(req, res) {
    userModel.findAll()
        .then(function (users) {
            res.json(users);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        })
}

function getUserById(req, res) {
    var userId = req.params.userId;
    userModel.findUserById(userId)
        .then(function (user) {
            res.json(user);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        })
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel.deleteUserById(userId)
        .then(function (user) {
            res.json(user);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        })
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) { return done(null, false); }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function checkLogin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}