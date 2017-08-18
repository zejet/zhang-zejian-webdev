var mongoose = require("mongoose");
var playlistSchema = require("./playlist.schema.server");
var playlistModel = mongoose.model("PlaylistModel", playlistSchema);
var userModel = require("./user.model.server")
var songModel = require("./song.model.server")
var db = require("./database");

playlistModel.createPlaylistForUser = createPlaylistForUser;
playlistModel.findPlaylistById = findPlaylistById;
playlistModel.findListByListName = findListByListName;
playlistModel.findAllPlaylistsByUserId = findAllPlaylistsByUserId;
playlistModel.deletePlaylist = deletePlaylist;
playlistModel.updatePlaylist = updatePlaylist;

playlistModel.addReview = addReview;
playlistModel.removeReview = removeReview;

playlistModel.addSongToPlaylist = addSongToPlaylist;
playlistModel.removeSongFromPlaylist = removeSongFromPlaylist;
playlistModel.getAllSongsFromPlaylist = getAllSongsFromPlaylist;


module.exports = playlistModel;

function createPlaylistForUser(userId, playlist) {
    playlist.owner = userId;
    return playlistModel
        .create(playlist)
        .then(function (playlistDoc) {
            return userModel.addPlaylist(userId, playlistDoc._id)
        });
}

function findPlaylistById(playlistId) {
    return playlistModel.findOne({_id: playlistId});
}

function findListByListName(playlistname) {
    return playlistModel.find({name: playlistname});
}

function findAllPlaylistsByUserId(userId) {
    return playlistModel
        .find({_owner: userId})
        .populate('_owner')
        .exec();
}

function deletePlaylist(playlistId) {
    return playlistModel
        .remove({_id: playlistId})
}

function updatePlaylist(playlistId,playlist) {
    return playlistModel
        .updateOne({_id: playlistId},
            {$set: playlist});
}


//song
function addSongToPlaylist(playlistId,songId) {
    return playlistModel.findPlaylistById(playlistId)
        .then(function (list) {
            var flag = '0';
            for(var i = 0; i < list.songlist.length; i ++) {
                if(list.songlist[i] == songId) {
                    flag = '1';
                    break;
                }
            }
            if(flag === '0') {
                list.songlist.push(songId);
            }
            return list.save();
        })
}

function removeSongFromPlaylist(playlistId, songId) {
    return playlistModel
        .findById(playlistId)
        .then(function (list) {
            var index = list.songlist.indexOf(songId);
            list.songlist.splice(index, 1);
            return list.save();
        })
}

function getAllSongsFromPlaylist(playlistId) {
    return playlistModel
        .findById(playlistId)
        .populate('songlist')
        .exec()
        .then(function (playlist) {
            return playlist.songlist;
        });

}

//review
function addReview(playlistId, reviewId) {
    return playlistModel
        .findById(playlistId)
        .then(function (list) {
            list.reviews.push(reviewId);
            return list.save();
        });
}

function removeReview(playlistId, reviewId) {
    return userModel
        .findById(playlistId)
        .then(function (list) {
            var index = list.reviews.indexOf(reviewId);
            list.reviews.splice(index, 1);
            return list.save();
        })
}