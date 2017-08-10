(function () {
    angular
        .module("WebAppMaker")
        .service("flickrService", flickrService);

    function flickrService($http) {
        let key = "e2a3a5efbc5d43591d0405583ed9c3ef";
        let secret = "125dead93f5cd203";
        let urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        let api = {
            "searchPhotos": searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            let url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();