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
            pageService.findPageById(model.pageId)
                .then(function (response) {
                    if(response.data === "0") {
                        model.errorMessage = "Failed to find page";
                    } else {
                        model.page = response.data;
                    }
                });
        }
        init();

        function modifyPage(page) {
            pageService.updatePage(model.pageId, page)
                .then(function (response) {
                    if(response.data === "0") {
                        model.errorMessage = "Failed to modify page";
                    } else {
                        $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/");
                    }
                });
        }

        function deletePage() {
            pageService.deletePage(model.websiteId, model.pageId)
                .then(function (response) {
                    if(response.data != null) {
                        $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/");
                    } else {
                        model.errorMessage = "Failed to delete the page";
                    }
                });
        }
    }
})();