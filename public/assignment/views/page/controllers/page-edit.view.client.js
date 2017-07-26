(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)

    function EditPageController($location, $routeParams, pageService) {
        var model = this;
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];

        model.deletePage = deletePage;
        model.modifyPage = modifyPage;

        function init() {
            model.page = pageService.findPageById(model.pageId);
        }
        init();

        function modifyPage(page) {
            pageService.updatePage(model.pageId, page);
            $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/");
        }

        function deletePage() {
            pageService.deletePage(model.pageId);
            $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/");
        }
    }
})();