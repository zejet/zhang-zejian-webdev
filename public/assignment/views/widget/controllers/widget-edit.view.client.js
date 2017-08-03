(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController)

    function EditWidgetController($location, $routeParams, widgetService) {
        var model = this;
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];
        model.widgetId = $routeParams["wgid"];

        model.edit = edit;
        model.deleteWidget = deleteWidget;

        function init() {
            widgetService.findWidgetById(model.widgetId)
                .then(function (response) {
                    if(response.data === "0") {
                        model.errorMessage = "Failed to initialize";
                    } else {
                        model.widget = response.data;
                    }
                })
        }
        init();


        function edit(widget) {
            if(widget.name === "") {
                model.errorMessage = "Invalid name";
            }
            widgetService.updateWidget(widget._id, widget)
                .then(function (response) {
                    if(response.data === "0") {
                        model.errorMessage = "Failed to modify the widget";
                    } else {
                        $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
                    }
                });
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId)
                .then(function (response) {
                    $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
                });
        }
    }
})();