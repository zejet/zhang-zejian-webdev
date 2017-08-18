(function () {
    angular
        .module("Musiker")
        .controller("songController", songController);

    function songController(songService, playlistService,reviewService, transactionService,$routeParams,$location, user) {
        var model = this;
        model.user = user;
        model.errorPurchaseMessage = '1';
        model.findSongInfo = findSongInfo;
        model.addSong = addSong;
        model.reviewSong = reviewSong;
        model.editSong = editSong;
        model.updateSong = updateSong;
        model.addSongToPlaylist = addSongToPlaylist;
        model.favouriteSong = favouriteSong;
        model.getSongCreator = getSongCreator;
        model.getPlaylist = getPlaylist;
        model.deleteSong = deleteSong;
        model.addReviewToSong = addReviewToSong;
        model.getReview = getReview;
        model.purchaseSong = purchaseSong;
        model.cancelPurchase = cancelPurchase;
        model.defaultMessage = defaultMessage;
        model.findSongReviews = findSongReviews;
        var songId = $routeParams["songId"];
        var hasreviewed = false;
        model.favourite = "no";
        model.buy = "no";
        model.playlistId = "";
        function init() {
            findSongInfo();
            findSongReviews();
            getPlaylist();
        }
        init();

        function getReview() {
            reviewService.isReviewed(user._id, model.song._id)
                .then(function (response) {
                    if(response.data != "0"){
                        model.newreview = response.data;
                        hasreviewed = true;
                    }
                })
        }
        function findSongInfo() {
            songService.findSongById(songId)
                .then(function (response) {
                    model.song = response.data;
                })
        }

        function addSong(song) {

        }

        function editSong() {
            model.edit = 'yes';
        }

        function reviewSong(review) {
            model.getReview();
            model.editreview = 'yes';
        }

        function addReviewToSong(){
            if(model.newreview.title && model.newreview.comment){
                if(hasreviewed === true){
                    reviewService.updateReview(model.newreview._id, model.newreview)
                        .then(function (res) {
                            alert("success")
                            $location.url('/explore');
                        })
                }
                else{
                reviewService.createReviewForSong(user._id, model.song._id, model.newreview)
                    .then(function (res) {
                        alert("success")
                        $location.url('/explore');
                    })
                }
            }else{
                alert("please fill in review");
            }
        }

        function defaultMessage() {
            model.errorPurchaseMessage = '1';
        }

        function purchaseSong(price) {
            if(model.song._owner) {
                model.errorPurchaseMessage = "Alreay purchased by another publisher";
            } else if(!price) {
                model.errorPurchaseMessage = "Please offer your price";
            }
            else {
                var transaction = {};
                transaction._buyer = model.user._id;
                transaction._seller = model.song._creator._id;
                transaction._song = model.song._id;
                transaction.price = price;
                transaction.status = "PENDING";
                transactionService.createTransaction(model.user._id, model.song._id, transaction)
                    .then(function (response) {
                        $location.url('/explore');
                    })
            }
        }

        function cancelPurchase() {
            model.buy = "no";
        }

        function addSongToPlaylist() {
            playlistService.addSongToPlaylist(model.playlistId, songId)
                .then(function (response) {
                    $location.url('/explore');
                })
        }

        function favouriteSong(option) {
            model.favourite = option;

        }

        function getSongCreator() {
            songService.getSongCreator(songId)
                .then(function (response) {
                    // console.log(response.data);
                    return model.creator = response.data;
                })
        }

        function updateSong(songname) {
            model.song.name = songname;
            songService.updateSong(model.song._id, model.song)
                .then(function (response) {
                    model.edit = 'no';
                    return init();
                })
        }

        function deleteSong(song) {
            return songService.deleteSong(model.user._id, song._id)
                .then(function (response) {
                    $location.url("/home");
                })
        }

        function getPlaylist() {
            playlistService.findAllPlaylistsByUser(user._id)
                .then(function (response) {
                    // console.log(response);
                    model.playlists = response.data;
                });
        }

        function findSongReviews() {
            songService.findSongByIdWithReview(songId)
                .then(function (response) {
                    console.log(response.data);
                    model.reviews = response.data[0].reviews;
                })
        }
    }
})();