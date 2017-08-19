(function () {
    angular
        .module("Musiker")
        .controller("adminEditReviewController", adminEditReviewController);

    function adminEditReviewController($routeParams, $location, reviewService,user) {
        var model = this;
        //variable from path
        model.adminId = user._id;
        model.reviewId = $routeParams["rid"];
        //declare function
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;

        //initial function
        function init() {
            reviewService
                .findReviewById(model.reviewId)
                .then(function (response) {
                    console.log(response);
                    model.review = response.data;
                    console.log(model.editReview);
                    model.editReview = {
                        "_critic": model.review._critic,
                        "_song": model.review._song,
                        "_playlist": model.review._playlist,
                        "_musician": model.review._musician,
                        "type": model.review.type,
                        "title": model.review.title,
                        "comment": model.review.comment,
                        "rating": model.review.rating,
                        "dateCreated": model.review.dateCreated
                    }
                });

        }
        init();

        //functions

        // function initReview() {
        //
        // }
        function updateReview(review){
            reviewService.updateReview(model.reviewId, review)
                .then(function (response) {
                    alert("update scceuss")
                    $location.url("/home");
                });
        }

        function deleteReview(){
            reviewService.deleteReview(model.reviewId)
                .then(function (response) {
                    alert("delete scceuss")
                    $location.url("/home");
                });
        }

    }
})();