(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController)

    function profileController($location, $routeParams, userService) {
        var model = this;
        var userId = $routeParams["uid"];

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            // var promise = userService.findUserById(userId);
            // promise.then(function (response) {
            //     model.user = response.data;
            // });
            model.user = userService.findUserById(userId);
        }
        init();

        function updateUser(user) {
            userService.updateUser(user._id, user);
            model.update = "Successfully Updated!";
        }

        function unregister(user) {
            userService.deleteUser(user._id);
            $location.url("/");
        }
    }
})();