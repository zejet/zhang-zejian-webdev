(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController)

    function NewWidgetController($location, $routeParams, widgetService) {
        var model = this;
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];

        model.newHeader = newHeader;
        model.newYoutube = newYoutube;
        model.newImage = newImage;

        function init() {
        }
        init();

        function newHeader() {
            var widget = {};
            widgetService.createWidget(model.pageId, widget);
            widget.widgetType = "HEADING";
            $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+widget._id);
        }

        function newYoutube() {
            var widget = {};
            widgetService.createWidget(model.pageId, widget);
            widget.widgetType = "YOUTUBE";
            $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+widget._id);
        }

        function newImage() {
            var widget = {};
            widgetService.createWidget(model.pageId, widget);
            widget.widgetType = "IMAGE";
            $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+widget._id);
        }
    }
})();