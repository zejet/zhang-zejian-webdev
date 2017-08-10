/**
 * Created by Chuhan on 8/4/17.
 */
(function () {
    angular
        .module("spotifyApp")
        .controller("detailsController", detailsController);


    function detailsController($routeParams, spotifyApiService) {
        var model = this;
        model.id = $routeParams["Id"];
        model.findArtistById = findArtistById;
        model.findAlbumById = findAlbumById;
        model.findTrackById = findTrackById;


        function findArtistById() {
            model.artist =  spotifyApiService.findArtistById(model.id);
        }

        function findAlbumById() {
            model.album = spotifyApiService.findAlbumById(model.id);
        }

        function findTrackById() {
            model.track = spotifyApiService.findTrackById(model.id);
        }
    }
})();