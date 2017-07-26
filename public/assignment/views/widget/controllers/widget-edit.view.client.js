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
            model.widget = widgetService.findWidgetById(model.widgetId);
            console.log(model.widget);
        }
        init();


        function edit() {
            if(model.widget.name === "") {
                model.errorMessage = "Invalid name";
            }
            widgetService.updateWidget(model.widgetId, model.widget);
            pageService.updatePage(model.pageId, page);
            $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
        }
    }
})();