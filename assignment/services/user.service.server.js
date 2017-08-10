var app = require("../../express");
var userModel = require("../models/user.model.server");

// http handlers
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/user", registerUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

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

function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if (username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
                return;
            }, function (err) {
                res.sendStatus(404).send(err);
                return;
            })
        return;
    } else {
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