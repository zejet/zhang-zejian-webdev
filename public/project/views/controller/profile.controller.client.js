(function () {
    angular
        .module("Musiker")
        .controller("profileController", profileController);

    function profileController($location, userService, user) {
        //declare controller
        var model = this;
        //variable from path
        model.userId = user._id;
        //declare function
        model.updateUser = updateUser;
        model.unregister = unregister;
        model.showPassword = showPassword;


        //initial function
        function init() {
            userService.findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                });
        }
        init();

        //functions
        function updateUser(user){
            userService.updateUser(user._id, user)
                .then(function (response) {
                    // model.user = response.data;
                    // model.user = cloneObj(_user);
                    // if(model.user != "0"){
                        alert("update scceuss")
                    // }
                });
        }

        function unregister(){
            userService.deleteUser(model.userId);
            $location.url("/login");
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