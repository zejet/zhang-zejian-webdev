(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)

    function WidgetListController($sce, $location, $routeParams, widgetService) {
        var model = this;
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];

        model.trustUrl = trustUrl;

        function init() {
            widgetService.findWidgetsByPageId(model.pageId)
                .then(function (response) {
                    model.widgets = response.data;
                })
        }
        init();

        function trustUrl(url) {
            var youtubeUrl = "https://www.youtube.com/embed/"
            var urlParts = url.split("/");
            youtubeUrl += urlParts[urlParts.length - 1];
            return $sce.trustAsResourceUrl(youtubeUrl);
        }
    }
})();