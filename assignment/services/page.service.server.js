var app = require("../../express");

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

// http handlers
app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

function createPage(req, res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.send(page);
}

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var pagesForWebsite = [];
    for(var p in pages) {
        if(pages[p].websiteId === websiteId) {
            pagesForWebsite.push(pages[p]);
        }
    }
    res.send(pagesForWebsite);
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    for(var p in pages) {
        if(pages[p]._id === pageId) {
            res.send(pages[p]);
            return;
        }
    }
    res.send("0");
}

function updatePage(req, res) {
    var page = req.body;
    for(var p in pages) {
        if(pages[p]._id === page._id) {
            pages[p] = page;
            res.send(pages[p]);
            return;
        }
    }
    res.send("0");
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    for(var i = 0; i < pages.length; i ++) {
        if(pages[i]._id === pageId) {
            pages.splice(i, 1);
            res.send("1");
            return;
        }
    }
    res.send("0");
}