let mongoose = require("mongoose");
let widgetSchema = require("./widget.schema.server");
let pageModel = require("../models/page.model.server");
let widgetModel = mongoose.model("WidgetModel", widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;
widgetModel.uploadImage = uploadImage;
module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    let widgetTmp = null;
    return widgetModel
        .create(widget)
        .then(function (widgetDoc) {
            widgetTmp = widgetDoc;
            return pageModel.addWidget(pageId, widgetDoc._id)
        })
        .then(function (pageDoc) {
            return widgetTmp;
        })
}

function findAllWidgetsForPage(pageId) {
    return pageModel.findPageById(pageId)
        .then(function (page) {
            let widgets = page.widgets;
            return widgetModel.find({ _id: { $in: widgets } }).exec(function(err, docs) {
                docs.sort(function(a, b) {
                    // Sort docs by the order of their index in widgets.
                    return widgets.indexOf(a._id) - widgets.indexOf(b._id);
                });
            });
        })
}

function findWidgetById(widgetId) {
    return widgetModel
        .findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.updateOne({_id: widgetId},
        {$set: widget});
}

function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (widget) {
            return pageModel.removeWidget(pageId, widgetId);
        })
}

function reorderWidget(pageId, start, end) {
    return pageModel.findById(pageId)
        .then(function (page) {
            let widgetId = page.widgets[start];
            page.widgets.splice(start, 1);
            page.widgets.splice(end, 0, widgetId);
            return page.save();
        })
}

function uploadImage(widgetId, url) {
    let widget = widgetModel.findById(widgetId);
    widget.url = url;
    return widgetModel
        .update({_id: widgetId},
            {$set: widget});

}