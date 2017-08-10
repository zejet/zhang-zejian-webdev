let app = require("../../express");
let widgetModel = require("../models/widget.model.server");
let multer = require('multer'); // npm install multer --save
let upload = multer({ dest: __dirname+'/../../public/uploads' });

// http handlers
app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/page/:pageId/widget/:widgetId", deleteWidget);
app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.put("/page/:pageId/widget", modifyWidgetOrder);

function createWidget(req, res) {
    let widget = req.body;
    let pageId = req.params.pageId;
    widgetModel
        .createWidget(pageId, widget)
        .then(function (widgetDoc) {
            res.json(widgetDoc);
        }, function (err) {
            console.log("fail to create widget");
            res.sendStatus(500).send(err);
        })
}

function findAllWidgetsForPage(req, res) {
    widgetModel.findAllWidgetsForPage(req.params.pageId)
        .then(function (widgets) {
            res.json(widgets);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        })
}

function findWidgetById(req, res) {
    widgetModel.findWidgetById(req.params.widgetId)
        .then(function (widget) {
            res.json(widget);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        })
}

function updateWidget(req, res) {
    let widget = req.body;
    widgetModel.updateWidget(req.params.widgetId, widget)
        .then(function (widgetDoc) {
            res.json(widgetDoc);
        }, function (err) {
            res.sendStatus(500).send(err);
        })
}

function deleteWidget(req, res) {
    let widgetId = req.params.widgetId;
    let pageId = req.params.pageId;
    widgetModel.deleteWidget(pageId, widgetId)
        .then(function (widget) {
            res.json(widget);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        })
}

function modifyWidgetOrder(req, res) {
    let pageId = req.params.pageId;
    let index1 = req.query.initial;
    let index2 = req.query.final;
    widgetModel.reorderWidget(pageId, index1, index2)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(500).send(err);
    });
}

function uploadImage(req, res) {
    let widgetId      = req.body.widgetId;
    let width         = req.body.width;
    let myFile        = req.file;

    let userId = req.body.userId;
    let websiteId = req.body.websiteId;
    let pageId = req.body.pageId;

    let originalname  = myFile.originalname; // file name on user's computer
    let filename      = myFile.filename;     // new file name in upload folder
    let path          = myFile.path;         // full path of uploaded file
    let destination   = myFile.destination;  // folder where file is saved to
    let size          = myFile.size;
    let mimetype      = myFile.mimetype;

    let url = '/uploads/'+filename;

    return widgetModel
        .uploadImage(widgetId, url)
        .then(function (widgetDoc) {
            let callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
            res.redirect(callbackUrl);
        }, function (err) {
            res.sendStatus(500).send(err);
        })
}