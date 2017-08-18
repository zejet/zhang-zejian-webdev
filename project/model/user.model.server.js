var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("ProjectUserModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.findAllUsers = findAllUsers;
userModel.deleteUserById = deleteUserById;
userModel.addSong = addSong;
userModel.removeSong = removeSong;
userModel.findFollowingByUser = findFollowingByUser;
userModel.findFollowingByTypeByUser = findFollowingByTypeByUser;
userModel.findFollowersByUser = findFollowersByUser;
userModel.addFollowingByUser = addFollowingByUser;
userModel.addFollowersByUser = addFollowersByUser;
userModel.addReview = addReview;
userModel.removeReview = removeReview;
userModel.addTransaction = addTransaction;
userModel.addPlaylist = addPlaylist;
userModel.removePlaylist = removePlaylist;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.updateUserAvatar = updateUserAvatar;
userModel.removeFollowingUser = removeFollowingUser;
userModel.removeFollowerUser  = removeFollowerUser;
userModel.deleteUserFromOthers = deleteUserFromOthers;
module.exports = userModel;

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function updateUser(userId, user) {
    return userModel.updateOne({_id: userId},
        {$set: user});
}

function updateUserAvatar(userId, avatarUrl) {
    return userModel.updateOne({_id: userId},
        {avatar: avatarUrl});
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function deleteUserById(userId) {
    return userModel.findOneAndRemove({_id: userId});
}
function deleteUserFromOthers(userId) {
    return userModel
        .findUserById(userId)
        .populate('followers')
        .exec()
        .then(function (user) {
            var followers = user.followers;
            console.log("user");
            console.log(user);
            console.log(followers);
            for (i = 0; i < followers.length; i++){
                var follower = followers[i];
                console.log("follower");
                console.log(follower);
                var index = follower.following.indexOf(follower._id);
                follower.following.splice(index, 1);
                console.log(follower);
                follower.save();
            }
            user.followers = [];
            console.log(user);
            return user.save();
        })
}
//song

function removeSong(userId, songId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.songs.indexOf(songId);
            user.songs.splice(index, 1);
            return user.save();
        })
}

function addSong(userId, songId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.songs.push(songId);
            return user.save();
        });
}


//Follow
function findFollowingByUser(userId) {
    return userModel.findUserById(userId)
        .populate('following')
        .exec()
        .then(function (user) {
           return user.following;
        })

}

function findFollowersByUser(userId) {
    return userModel.findUserById(userId)
        .populate('followers')
        .exec()
        .then(function (user) {
            return user.followers;
        })

}

function findFollowingByTypeByUser(userId, usertype){
    return userModel.findUserById(userId)
        .populate('following')
        .exec()
        .then(function (user) {
            var allFollowing = user.following;
            var specificFollowing = [];
            for (i =0; i < allFollowing.length; i++){
                if (allFollowing[i].type === usertype){
                    specificFollowing.push(allFollowing[i]);
                }
            }
            // console.log("specificFollowing");
            // console.log(specificFollowing);
            return specificFollowing;
            // var f = _.where(following,{type: usertype});
            // console.log("artist");
            // console.log(f);
            // return f;
        })
}


function addFollowersByUser(userId, followerId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            user.followers.push(followerId);
            return user.save();
        })
}

function addFollowingByUser(userId, followingId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            user.following.push(followingId);
            return user.save();
        })
}

//review
function addReview(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.reviews.push(reviewId);
            return user.save();
        });
}

function removeReview(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.reviews.indexOf(reviewId);
            user.reviews.splice(index, 1);
            return user.save();
        })
}

//transaction
function addTransaction(userId, transactionId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.transactions.push(transactionId);
            return user.save();
        })
}

//playlist
function addPlaylist(userId, playlistId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.playlists.push(playlistId);
            return user.save();
        })
}

function removePlaylist(userId, playlistId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.transactions.indexOf(playlistId);
            user.playlists.splice(index, 1);
            return user.save();
        })
}

function removeFollowingUser(userId, followingId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.following.indexOf(followingId);
            user.following.splice(index, 1);
            return user.save();
        })
}

function removeFollowerUser(userId, followingId) {
    return userModel
        .findById(followingId)
        .then(function (user) {
            var index = user.followers.indexOf(userId);
            user.followers.splice(index, 1);
            return user.save();
        })
}