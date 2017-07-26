(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)

    function PageListController($routeParams, pageService) {
        var model = this;
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }
        init();
    }
})();