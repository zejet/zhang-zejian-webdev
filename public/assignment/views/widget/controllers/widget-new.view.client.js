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
        model.newText = newText;
        model.newHtml = newHtml;

        function init() {
        }
        init();

        function newHeader() {
            var widget = {};
            widget.type = "HEADING";
            widgetService.createWidget(model.pageId, widget)
                .then(function (response) {
                    if(response.data === "0") {
                        model.errorMessage = "Failed to create the widget";
                    } else {
                        var newWidget = response.data;
                        $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+newWidget._id);
                    }
                });
        }

        function newYoutube() {
            var widget = {};
            widget.type = "YOUTUBE";
            widgetService.createWidget(model.pageId, widget)
                .then(function (response) {
                    if(response.data === "0") {
                        model.errorMessage = "Failed to create the widget";
                    } else {
                        var newWidget = response.data;
                        $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+newWidget._id);
                    }
                })
        }

        function newImage() {
            var widget = {};
            widget.type = "IMAGE";
            widgetService.createWidget(model.pageId, widget)
                .then(function (response) {
                    if(response.data === "0") {
                        model.errorMessage = "Failed to create the widget";
                    } else {
                        var newWidget = response.data;
                        $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+newWidget._id);
                    }
                })
        }

        function newText() {
            var widget = {};
            widget.type = "INPUT";
            widgetService.createWidget(model.pageId, widget)
                .then(function (response) {
                    if(response.data === "0") {
                        model.errorMessage = "Failed to create the widget";
                    } else {
                        var newWidget = response.data;
                        $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+newWidget._id);
                    }
                })
        }

        function newHtml() {
            var widget = {};
            widget.type = "HTML";
            widgetService.createWidget(model.pageId, widget)
                .then(function (response) {
                    if(response.data === "0") {
                        model.errorMessage = "Failed to create the widget";
                    } else {
                        var newWidget = response.data;
                        $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+newWidget._id);
                    }
                })
        }
    }
})();