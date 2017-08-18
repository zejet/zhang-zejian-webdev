(function () {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            "findUserByUsername": findUserByUsername,
            "findUserByUsernameAndPassword": login,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "checkLogin": checkLogin
        };
        return api;

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        function registerUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function login(username, password) {
            var url = "/api/login";
            // /user?username=alice&password=alice
            return $http.post(url, {username: username, password: password});
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/" + userId);
        }

        function checkLogin() {
            return $http
                .get("/api/checkLogin")
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();