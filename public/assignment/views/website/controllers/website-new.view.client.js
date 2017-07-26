(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController)

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var model = this;
        model.userId = $routeParams["uid"];

        model.create = create;

        function init() {
            model.websites = WebsiteService.findWebsitesByUser(model.userId);
        }

        init();

        function create() {
            var website = [];
            website.name = model.name;
            website.description = model.description;
            WebsiteService.createWebsite(model.userId, website);
            $location.url("user/"+model.userId+"/website");
        }
    }
})();