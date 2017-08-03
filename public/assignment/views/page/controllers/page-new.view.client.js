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
            pageService.createPage(model.websiteId, page)
                .then(function (response) {
                    if(response.data === "0") {
                        model.errorMessage = "Failed to create the page";
                    } else {
                        $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/");
                    }
                })

        }
    }
})();