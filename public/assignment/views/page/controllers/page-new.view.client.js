(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController)

    function NewPageController($location, $routeParams, pageService) {
        var model = this;
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];

        model.writePage = writePage;

        function init() {
        }
        init();

        function writePage(page) {
            pageService.createPage(model.websiteId, page);
            $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/");
        }
    }
})();