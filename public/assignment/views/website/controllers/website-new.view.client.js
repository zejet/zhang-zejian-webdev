(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController)

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var model = this;
        model.userId = $routeParams["uid"];

        model.create = create;

        function init() {
            WebsiteService.findWebsitesByUser(model.userId)
                .then(function (response) {
                    model.websites = response.data;
                })
        }

        init();

        function create(website) {
            WebsiteService.createWebsite(model.userId, website)
                .then(function (response) {
                    if(response.data === "0") {
                        model.errorMessage = "Failed to create the website";
                    } else {
                        $location.url("user/"+model.userId+"/website");
                    }
                })
        }
    }
})();