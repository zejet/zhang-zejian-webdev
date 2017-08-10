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
            WebsiteService.findWebsitesByUser(model.userId)
                .then(function (response) {
                    model.websites = response.data;
                });
            WebsiteService.findWebsiteById(model.websiteId)
                .then(function (response) {
                    model.website = response.data;
                });
        }

        init();

        function edit(website) {
            WebsiteService.updateWebsite(model.websiteId, website)
                .then(function (response) {
                    let website = response.data;
                    if(website === '0') {
                        model.errorMessage = "Failed to edit the website";
                    } else {
                        $location.url("user/"+model.userId+"/website");
                    }
                })
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(model.userId, model.websiteId)
                .then(function (response) {
                    if(response.data != null) {
                        $location.url("user/"+model.userId+"/website");
                    } else {
                        model.errorMessage = "Failed to delete the website";
                    }
                })

        }
    }
})();