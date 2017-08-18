var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var websiteModel = require("../models/website.model.server");
var pageModel = mongoose.model("PageModel", pageSchema);

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.removeWidget = removeWidget;
module.exports = pageModel;

function createPage(websiteId, page){
    page._website = websiteId;
    var pageTemp = null;
    return pageModel
        .create(page)
        .then(function (pageDoc) {
            pageTemp = pageDoc;
            return websiteModel.addPage(websiteId, pageDoc._id);
        })
        .then(function (websiteDoc) {
            return pageTemp;
        })
}

function findAllPagesForWebsite(websiteId){
    return pageModel
        .find({_website: websiteId})
        .populate('_website', 'name')
        .exec();
}

function findPageById(pageId) {
    return pageModel
        .findById(pageId);
}

function updatePage(pageId, page) {
    return pageModel
        .updateOne({_id: pageId},
            {$set: page});
}

function deletePage(websiteId, pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (page) {
            return websiteModel.removePage(websiteId, pageId);
        })
}

function removeWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        })
}

function addWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        })
}