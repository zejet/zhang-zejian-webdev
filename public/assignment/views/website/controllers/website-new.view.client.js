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

        function create(userId, name, description) {
            var website = [];
            website.name = name;
            website.description = description;
            WebsiteService.createWebsite(userId, website);
            $location.url("user/"+model.userId+"/website");
        }
    }
})();