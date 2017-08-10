let app = require("../../express");
let pageModel = require("../models/page.model.server");

// http handlers
app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/website/:websiteId/page/:pageId", deletePage);

function createPage(req, res) {
    let page = req.body;
    let websiteId = req.params.websiteId;
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
    let page = req.body;
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
    let websiteId = req.params.websiteId;
    let pageId = req.params.pageId;
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