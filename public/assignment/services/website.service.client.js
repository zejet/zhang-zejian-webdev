(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        }
        return api;

        function createWebsite(userId, website) {
            website._id = (new Date()).getTime() + "";
            website.developerId = userId;
            websites.push(website);
            return null;
        }

        function findWebsitesByUser(userId) {
            var userwebsites = [];
            for(var u in websites) {
                if(websites[u].developerId === userId) {
                    userwebsites.push(websites[u]);
                }
            }
            return userwebsites;
        }

        function findWebsiteById(websiteId) {
            for(var u in websites) {
                if(websites[u]._id === websiteId) {
                    return websites[u];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for(var u in websites) {
                if(websites[u]._id === websiteId) {
                    websites[u] = website;
                    break;
                }
            }
        }

        function deleteWebsite(websiteId) {
            for(var i = 0; i < websites.length; i ++) {
                if(websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                    break;
                }
            }
        }

    }
})();