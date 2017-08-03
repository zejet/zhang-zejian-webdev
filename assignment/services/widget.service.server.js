var app = require("../../express");
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/uploads' });

var widgets = [
    { "_id": "123", "name": "gizmodo", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "name": "lorem", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "name": "random pic", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "name": "html1", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "name": "ipsum", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "name": "youtube", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "name": "html2", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

// http handlers
app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);
app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.put("/page/:pageId/widget", modifyWidgetOrder);

function createWidget(req, res) {
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widgets.push(widget);
    res.send(widget);
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params.pageId;
    var widgetsForPage = [];
    for(var w in widgets) {
        if(widgets[w].pageId === pageId) {
            widgetsForPage.push(widgets[w]);
        }
    }
    res.send(widgetsForPage);
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            res.send(widgets[w]);
        }
    }
}

function updateWidget(req, res) {
    var widget = req.body;
    for(var w in widgets) {
        if(widgets[w]._id === widget._id) {
            widgets[w] = widget;
            res.send(widgets[w]);
        }
    }
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    for(var i = 0; i < widgets.length; i ++) {
        if(widgets[i]._id === widgetId) {
            widgets.splice(i, 1);
            res.send("1");
        }
    }
}

function modifyWidgetOrder(req, res) {
    var index1 = req.query.initial;
    var index2 = req.query.final;
    var widget = widgets[index1];
    widgets.splice(index1, 1);
    widgets.splice(index2, 0, widget);
    res.sendStatus(200);
}

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var widget;
    for (var w in widgets){
        if (widgets[w]._id === widgetId){
            widget = widgets[w];
            break;
        }
    }
    widget.url = '/uploads/'+filename;

    var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";

    res.redirect(callbackUrl);
}