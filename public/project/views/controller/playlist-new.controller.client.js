/**
 * Created by Chuhan on 8/16/17.
 */
(function () {
    angular
        .module("Musiker")
        .controller("playlistNewController", playlistNewController);


    function playlistNewController($routeParams, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.createPlaylist = createPlaylist;

        // function init() {
        //     vm.websites = websiteService.findWebsitesByUser(vm.userId);
        // }
        // init();

        function createPlaylist(playlist) {
            playlistService.createPlaylist(vm.userId,playlist)
                .then(function () {
                    $location.url('/user/' +vm.userId);
                });

        }

        function wantCreatePlaylist() {
            // vm.new = true;
            $location.url("#!/user/"+ vm.userId+ "/playlist/new");
        }

    }
})();