(function () {
    angular
        .module("WebAppMaker")
        .factory("widgetService", widgetService);

    function widgetService() {
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

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        }
        return api;

        function createWidget(pageId, widget) {
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId;
            widgets.push(widget);
        }

        function findWidgetsByPageId(widgetId) {
            var pageWidgets = [];
            for(var u in widgets) {
                if(widgets[u].pageId === widgetId) {
                    pageWidgets.push(widgets[u]);
                }
            }
            return pageWidgets;
        }

        function findWidgetById(widgetId) {
            for(var u in widgets) {
                if(widgets[u]._id === widgetId) {
                    return widgets[u];
                }
            }
            console.log("not found");
            return null;
        }

        function updateWidget(widgetId, widget) {
            for(var u in widgets) {
                if(widgets[u]._id === widgetId) {
                    widgets[u] = widget;
                    return;
                }
            }
            return null;
        }

        function deleteWidget(widgetId) {
            for(var i = 0; i < widgets.length; i ++) {
                if(widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                    return;
                }
            }
            return null;
        }
    }
})();