var app = require("../../express");

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

// http handlers
app.post("/api/user/:userId/website", createWebsite);
app.get("/api/user/:userId/website", findAllWebsitesForUser);
app.get("/api/website/:websiteId", findWebsiteById);
app.put("/api/website/:websiteId", updateWebsite);
app.delete("/api/website/:websiteId", deleteWebsite);

function createWebsite(req, res) {
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    websites.push(website);
    res.send(website);
}

function findAllWebsitesForUser(req, res) {
    var userId = req.params.userId;
    var websitesForUser = [];
    for(var w in websites) {
        if(websites[w].developerId === userId) {
            websitesForUser.push(websites[w]);
        }
    }
    res.send(websitesForUser);
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    for(var w in websites) {
        if(websites[w]._id === websiteId) {
            res.send(websites[w]);
        }
    }
}

function updateWebsite(req, res) {
    var website = req.body;
    for(var w in websites) {
        if(websites[w]._id === website._id) {
            websites[w] = website;
            res.send(website[w]);
            return;
        }
    }
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    for(var i = 0; i < websites.length; i ++) {
        if(websites[i]._id === websiteId) {
            websites.splice(i, 1);
            res.send("1");
            return;
        }
    }
    res.send("0");
}