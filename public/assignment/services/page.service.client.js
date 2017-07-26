(function () {
    angular
        .module("WebAppMaker")
        .factory("pageService", pageService);

    function pageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        }

        return api;

        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var websitepages = [];
            for(var u in pages) {
                if(pages[u].websiteId === websiteId) {
                    websitepages.push(pages[u]);
                }
            }
            return websitepages;
        }

        function findPageById(pageId) {
            for(var u in pages) {
                if(pages[u]._id === pageId) {
                    return pages[u];
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for(var u in pages) {
                if(pages[u]._id === pageId) {
                    pages[u] = page;
                    return;
                }
            }
            return null;
        }

        function deletePage(pageId) {
            for(var i = 0; i < pages.length; i ++) {
                if(pages[i]._id === pageId) {
                    pages.splice(i, 1);
                    return;
                }
            }
            return null;
        }
    }
})();