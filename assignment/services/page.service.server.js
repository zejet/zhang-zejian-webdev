var app = require("../../express");
var pageModel = require("../models/page.model.server");

// http handlers
app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/website/:websiteId/page/:pageId", deletePage);

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    pageModel
        .createPage(websiteId, page)
        .then(function (pageDoc) {
            res.json(pageDoc);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        })
}

function findAllPagesForWebsite(req, res) {
    pageModel.findAllPagesForWebsite(req.params.websiteId)
        .then(function (pages) {
            res.json(pages);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        })
}

function findPageById(req, res) {
    pageModel.findPageById(req.params.pageId)
        .then(function (page) {
            res.json(page);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        })
}

function updatePage(req, res) {
    var page = req.body;
    pageModel.updatePage(req.params.pageId, page)
        .then(function (page) {
            res.json(page);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        })
}

function deletePage(req, res) {
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    pageModel
        .deletePage(websiteId, pageId)
        .then(function (page) {
            res.json(page);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        })
}