(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, userService, $rootScope) {
        var model = this;

        model.login = login;

        function init() {

        }
        init();

        function login(user) {
            if(user === null) {
                model.errorMessage = "User not found";
                return;
            }
            userService.findUserByUsernameAndPassword(user.username, user.password)
                .then(function (response) {
                    var userDoc = response.data;
                    if(userDoc === null) {
                        model.errorMessage = "User not found";
                    } else {
                        $rootScope.currentUser = userDoc;
                        $location.url("user");
                    }
                });
        }
    }
})();
