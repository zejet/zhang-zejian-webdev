(function () {
    angular
        .module("Musiker")
        .controller("adminEditUserController", adminEditUserController);

    function adminEditUserController($routeParams, $location, userService,user) {
        //declare controller
        var model = this;
        //variable from path
        model.adminId = user._id;
        model.userId = $routeParams["uid"];
        //declare function
        model.updateUser = updateUser;
        model.unregister = unregister;
        model.showPassword = showPassword;


        //initial function
        function init() {
            userService.findUserById(model.userId)
                .then(function (response) {
                    model.editUser = response.data;
                    console.log(model.editUser);
                });
        }
        init();

        //functions
        function updateUser(user){
            userService.updateUser(model.userId, user)
                .then(function (response) {
                    alert("update scceuss")
                });
        }

        function unregister(){
            userService.deleteUser(model.userId);
            $location.url("/home");
        }

        function showPassword() {
            var pass=document.getElementById("pass");
            var passbtn = document.getElementById("passbtn");
            if(pass.type === "text"){
                pass.type = "password";
                passbtn.innerHTML = "Show Password";
            }else{
                pass.type = "text";
                passbtn.innerHTML = "Hide Password";
            }

        }


    }
})();