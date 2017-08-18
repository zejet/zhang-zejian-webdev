var mongoose = require("mongoose");
var songSchema = require("./song.schema.server");
var songModel = mongoose.model("SongModel", songSchema);
var userModel = require("./user.model.server")

songModel.createSongForUser = createSongForUser;
songModel.findSongById = findSongById;
songModel.findSongBySongName = findSongBySongName;
songModel.findAllSongsByUser = findAllSongsByUser;
songModel.deleteSong = deleteSong;
songModel.updateSong = updateSong;
songModel.getSongUrl = getSongUrl;
songModel.getSongCreator = getSongCreator;
songModel.findAllSongs = findAllSongs;
songModel.addReview = addReview;
songModel.removeReview = removeReview;
songModel.findSongByThridPartyId = findSongByThridPartyId;
songModel.createSongFromApi = createSongFromApi;
songModel.findSongByIdWithReview = findSongByIdWithReview;
module.exports = songModel;

function createSongForUser(userId, song) {
    song._user = userId;
    var songTmp = null;
    return songModel
        .create(song)
        .then(function (songDoc) {
            songTmp = songDoc;
            return userModel.addSong(userId, songTmp._id)
        })
        .then(function (userDoc) {
            return songTmp;
        })
}

function findSongById(songId) {
    return songModel
        .findOne({_id: songId})
        .populate('_creator')
        .exec();
}

function findSongBySongName(songname) {
    return songModel.find({name: songname});
}

function findAllSongsByUser(userId) {
    return songModel.find({_creator: userId});
}

function deleteSong(userId, songId) {
    var songTmp = null;
    return songModel
        .remove({_id: songId})
        .then(function (song) {
            songTmp = song;
            return userModel.removeSong(userId, songId);
        })
        .then(function (userDoc) {
            return songTmp;
        })
}

function updateSong(songId, song) {
    return songModel
        .updateOne({_id: songId},
            {$set: song});
}

function getSongUrl(songId) {
    return songModel
        .findById(songId)
        .then(function (song) {
            return song.url;
        })
}

function getSongCreator(songId) {
    return songModel
        .findById(songId)
        .populate('_creator')
        .exec();
        // .then(function (song) {
        //     return song._creator
        //         .populate('_creator')
        //         .exec();
        // })
}

//review
function addReview(songId,rId) {
    return songModel
        .findById(songId)
        .then(function (song) {
            song.reviews.push(rId);
            return song.save();
        });
}


function removeReview(songId, reviewId) {
    return songModel
        .findById(songId)
        .then(function (song) {
            var index = song.reviews.indexOf(reviewId);
            song.reviews.splice(index, 1);
            return song.save();
        })
}

function findAllSongs() {
    return songModel
        .find()
        .populate('_creator')
        .exec();
}

function findSongByThridPartyId(thirdPartyId) {
    return songModel.findOne({'thridPartyId': thirdPartyId});
}

function createSongFromApi(song) {
    return songModel.create(song);
}

function findSongByIdWithReview(songId) {
    return songModel.find({_id: songId})
        .populate('reviews')
        .exec();
}