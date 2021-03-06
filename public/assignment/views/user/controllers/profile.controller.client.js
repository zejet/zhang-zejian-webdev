(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController)

    function profileController($location, userService, user) {
        var model = this;
        // var userId = $routeParams["uid"];
        var userId = user._id;

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            userService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
                });
        }

        init();

        function updateUser(user) {
            userService.updateUser(user._id, user)
                .then(function (response) {
                    model.update = "Successfully Updated!";
                });
        }

        function unregister(user) {
            userService.deleteUser(user._id)
                .then(function (response) {
                    $location.url("/");
                });
        }
    }
})();