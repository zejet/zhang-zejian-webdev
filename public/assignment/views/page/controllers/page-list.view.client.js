(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)

    function PageListController($routeParams, pageService) {
        var model = this;
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];

        function init() {
            pageService.findPageByWebsiteId(model.websiteId)
                .then(function (response) {
                model.pages = response.data;
            });
        }
        init();
    }
})();