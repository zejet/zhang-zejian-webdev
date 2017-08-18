(function () {
    angular
        .module("Musiker")
        .controller("homeController", homeController);


    function homeController(songService,user,$location,userService, reviewService,searchService, playlistService,transactionService) {
        var model = this;
        model.rightPanel = 'musicians';
        model.user = user;
        model.findMusicians = findMusicians;
        model.findCritics = findCritics;
        model.changeRightPanel = changeRightPanel;
        model.createPlaylistForUser = createPlaylistForUser;
        model.searchTrack = searchTrack;
        model.showDetails = showDetails;
        model.getAllSongsFromPlaylist = getAllSongsFromPlaylist;
        model.findFollowers = findFollowers;
        model.unFollow = unFollow;
        model.findSongsByMusician = findSongsByMusician;
        model.findReviewsByCritic = findReviewsByCritic;
        model.findMusicianAvatar = findMusicianAvatar;
        model.findTransactionsByPublisher = findTransactionsByPublisher;
        model.findTransactionsByMusician = findTransactionsByMusician;
        model.accecptTransaction = accecptTransaction;
        model.rejectTransaction = rejectTransaction;
        model.cancelTransaction = cancelTransaction;
        model.findAllUsers = findAllUsers;
        model.findAllSongs = findAllSongs;
        model.addSongToLocal = addSongToLocal;

        function init() {
            if(model.user.type === 'MUSICIAN') {
                model.rightPanel = 'my-songs';
                findSongsByMusician();
            }
            if(model.user.type === 'PUBLISHER') {
                model.rightPanel = 'transactions';
                findTransactionsByPublisher();
            }
            findMusicians();
            findPlaylists();
            findCritics();
            // findAllUsers();
            findAllSongs();
        }
        init();


        function findMusicians() {
            userService.findFollowingByTypeByUser(user._id, 'MUSICIAN')
                .then(function (response) {
                    model.followingMusicians = response.data;
                    // console.log(model.followingMusicians);
                })
        }

        function findCritics() {
            userService.findFollowingByTypeByUser(user._id, 'CRITIC')
                .then(function (response) {
                    model.followingCritics = response.data;
                    // console.log(model.followingMusicians);
                })
        }

        function findFollowers() {
            model.rightPanel = 'followers';
            userService.findFollowersByUser(user._id)
                .then(function (response) {
                    model.followers = response.data;
                    console.log(model.followers);
                })
        }

        function unFollow(followingid) {
            userService.unFollow(user._id, followingid)
                .then(function (response) {
                    if(response){
                        findMusicians();
                        findCritics();
                    }
                })
        }

        function findPlaylists() {
            playlistService.findAllPlaylistsByUser(user._id)
                .then(function (response) {
                    // console.log(response);
                    model.playlists = response.data;
                    // console.log("model.playlists")
                    // console.log(model.playlists);
                });
        }

        function changeRightPanel(mode) {
            model.rightPanel = mode;
        }


        function searchTrack(song) {
            searchService.searchSong(song)
                .then(function (response) {
                    model.search = response.data.songList;
                })
        }

        function showDetails(song) {
            model.song = song;
        }

        function createPlaylistForUser(playlist) {
            playlistService.createPlaylistForUser(model.user._id, playlist)
                .then(function (response) {
                    model.playlists = response.data;
                    // console.log(model.playlists);
                    model.rightPanel = 'search';
                    $location.url('#!/home');
                })
        }

        function getAllSongsFromPlaylist(playlistId) {
            playlistService.getAllSongsFromPlaylist(playlistId)
                .then(function (response) {
                    model.songs = response.data;
                    model.rightPanel = "songlist";
                    // console.log("getAllSongsFromPlaylist");
                    // console.log(model.songs);
                })
        }

        function findMusicianAvatar(musicianId) {
            return userService.findUserById(musicianId)
                .then(function (response) {
                    return response.data.avatar;
                })
        }

        function findSongsByMusician() {
            model.rightPanel = 'my-songs';
            songService.findAllSongsByUser(model.user._id)
                .then(function (response) {
                    model.musicianSongs = response.data;
                    console.log("findSongById");
                    console.log(model.musicianSongs);
                })
        }

        function findReviewsByCritic() {
            model.rightPanel = 'my-reviews';
            reviewService.findAllReviewsByUser(model.user._id)
                .then(function (response) {
                    model.reviews = response.data;
                })
        }

        function findTransactionsByPublisher() {
            model.rightPanel = 'transactions';
            transactionService.findTransactionsByBuyer(model.user._id)
                .then(function (response) {
                    model.transactions = response.data;
                })
            console.log(model.transactions)
        }

        function findTransactionsByMusician() {
            model.rightPanel = 'transactions';
            transactionService.findTransactionsBySeller(model.user._id)
                .then(function (response) {
                    model.transactions = response.data;
                })
            console.log(model.transactions)
        }

        function accecptTransaction(transaction) {
            transaction.status = 'DONE';
            transactionService.updateTransaction(transaction._id, transaction)
                .then(function (response) {
                    songService.addSongOwner(transaction._song, transaction._buyer._id, transaction.price)
                        .then(function (response) {
                            $location.url("/home");
                        })
                })
        }

        function rejectTransaction(transaction) {
            transaction.status = 'REJECTED';
            transactionService.updateTransaction(transaction._id, transaction)
                .then(function (response) {
                    $location.url("/home");
                })
        }

        function cancelTransaction(transaction) {
            transaction.status = 'CANCELED';
            transactionService.updateTransaction(transaction._id, transaction)
                .then(function (response) {
                    $location.url("/home");
                })
        }

        function addSongToLocal(song) {
            var newSong= {
                "name": song.name,
                "artist" : song.artists[0].name,
                "cover" : song.album.cover,
                "thridPartyId": ""+song.id,
                "_owner" : model.user._id,
                "url" : "http://music.163.com/#/song?id="+song.id
            };
            return songService.createSongFromApi(newSong)
                .then(function (response) {
                    return response.data;
                })
        }

        function findAllUsers() {
            userService.findAllUsers()
                .then(function (response) {
                    model.allUsers = response.data;
                    console.log(response);
                })
        }

        function findAllSongs() {
            songService.findAllSongs()
                .then(function (response) {
                    model.allSongs = response.data;
                    console.log(response);
                })
        }

    }
})();