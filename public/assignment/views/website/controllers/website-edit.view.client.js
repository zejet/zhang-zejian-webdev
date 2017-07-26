(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController)

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var model = this;
        model.websiteId = $routeParams["wid"];
        model.userId = $routeParams["uid"];

        model.edit = edit;
        model.deleteWebsite = deleteWebsite;

        function init() {
            model.websites = WebsiteService.findWebsitesByUser(model.userId);
            model.website = WebsiteService.findWebsiteById(model.websiteId);
        }

        init();

        function edit(website) {
            WebsiteService.updateWebsite(model.websiteId, website);
            $location.url("user/"+model.userId+"/website");
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(model.websiteId);
            $location.url("user/"+model.userId+"/website");
        }
    }
})();