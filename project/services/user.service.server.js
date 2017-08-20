var app = require("../../express");
var userModel = require("../model/user.model.server");
var playlistModel = require("../model/playlist.model.server");
var bcrypt = require("bcrypt-nodejs");
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/avatar/upload'});
var fs = require('fs');
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    clientID     : "1007887171981-db9d5lqrpl5s0difp3vje5dfrsnrijmi.apps.googleusercontent.com",//process.env.GOOGLE_CLIENT_ID,
    clientSecret : "EjaLWYKzCsEHgH6bpG97CojL",//process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : "http://127.0.0.1:3000/auth/google/callback",//process.env.GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));


// http handlers
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/#!/home',
        failureRedirect: '/project/#!/'
    }));

app.post("/projectapi/user", createUser);
app.post("/projectapi/login", passport.authenticate('local'), login);
app.post("/projectapi/logout", logout);
app.get("/projectapi/user", findUser);
app.get("/projectapi/user/:userId", findUserById);
app.get("/projectapi/user/:userId/following", findFollowingByUser);
app.get("/projectapi/user/:userId/following/:followingtype", findFollowingByTypeByUser);
app.get("/projectapi/user/:userId/following", findFollowingByUser);
app.get("/projectapi/user/:userId/following", findFollowingByUser);
app.get("/projectapi/user/:userId/follower", findFollowersByUser);
app.get("/projectapi/users", findAllUsers);
app.get("/projectapi/checkLogin", checkLogin);
app.put("/projectapi/user/:userId", updateUser);
app.put("/projectapi/user/:userId/playlist/:playlistId", addPlaylistToUser);
app.put("/projectapi/user/:userId/song/:songId", addSong);
app.put("/projectapi/user/:userId/following/:followingId", addFollowingByUser);
app.put("/projectapi/user/:userId/follower/:followerId", addFollowerByUser);
app.put("/projectapi/user/:userId/unfollowuser/:followingId", unFollowUser);
app.delete("/projectapi/user/:userId", deleteUser);
app.post("/projectapi/avatar", upload.single('avatar'), uploadAvatar);
app.delete("/projectapi/user/:userId/playlist/:playlistId", removePlaylist);
app.delete("/projectapi/user/song/:songId", removeSong);

function findAllUsers(req,res) {
    var publicUsers = [];
    userModel
        .findAllUsers()
        .then(function (users) {
            for(i = 0; i < users.length; i++){
                if (users[i].type !== 'ADMIN'){
                    publicUsers.push(users[i]);
                }
            }
            return res.json(publicUsers);
        });
}

function uploadAvatar(req, res) {
    var myFile = req.file;
    var userId = req.body.userId;
    var originalname = myFile.originalname; // file name on user's computer
    var index = originalname.indexOf(".");
    originalname = originalname.substring(0, index);
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    var avatarUrl = '/avatar/upload/' + filename;
    userModel.updateUserAvatar(userId, avatarUrl)
        .then(function () {
            var callbackUrl = "/project/#!/profile";
            res.redirect(callbackUrl);
        })
}

function createUser(req,res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function findUserById(req,res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findUser(req,res) {
    var username = req.query.username;
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if (user === null){
                return res.send("0");
            }
            else
                return res.json(user);

        }, function (err) {
            return res.sendStatus(404).send(err);
        });
}

function updateUser(req,res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel
        .updateUser(userId,user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });

}

function deleteUser(req,res) {
    var userId = req.params.userId;
    console.log(userId);
    userModel
        .deleteUserById(userId)
        .then(function (user) {
            res.json(user)
        }, function (err) {
            res.sendStatus(500).send(err);
        })
}

function removeSong(req,res) {
    var userId = req.params.userId;
    var songId = req.params.songId;
    userModel
        .removeSong(userId,songId)
        .then(function (status) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}

function addPlaylistToUser(req,res) {
    var userId = req.params.userId;
    var playlistId = req.params.playlistId;
    userModel
        .addPlaylist(userId, playlistId)
        .then(function (res) {
            res.json(user)
        }, function (err) {
            res.send("0");
        })
}

function removePlaylist(req, res) {
    var userId = req.params.userId;
    var playlistId = req.params.playlistId;
    userModel
        .removePlaylist(userId, playlistId)
        .then(function (res) {
            res.json(user)
        }, function (err) {
            res.send("0");
        })
}

function addSong(req,res) {
    var userId = req.params.userId;
    var songId = req.params.songId;
    userModel
        .addSong(userId,songId)
        .then(function (user) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}

function findFollowingByUser(req, res) {
    var userId = req.params.userId;
    userModel
        .findFollowingByUser(userId)
        .then(function (follwing) {
            res.json(follwing);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findFollowingByTypeByUser(req,res){
    var userId = req.params.userId;
    var type = req.params.followingtype;
    // console.log(type);
    userModel
        .findFollowingByTypeByUser(userId,type)
        .then(function (follwings) {
            // console.log(follwings);
            res.json(follwings);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findFollowersByUser(req, res) {
    var userId = req.params.userId;
    userModel
        .findFollowersByUser(userId)
        .then(function (follwer) {
            res.json(follwer);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function addFollowerByUser(req, res) {
    var userId = req.params.userId;
    var followerId = req.params.followerId;
    console.log(userId);
    userModel
        .addFollowersByUser(userId,followerId)
        .then(function (user) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}

function addFollowingByUser(req,res) {
    var userId = req.params.userId;
    var followingId = req.params.followingId;
    userModel
        .addFollowingByUser(userId,followingId)
        .then(function (user) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}

function unFollowUser(req, res) {
    var userid = req.params.userId;
    var followingid = req.params.followingId;
    userModel
        .removeFollowerUser(userid, followingid)
        .then(function (user) {
          userModel
              .removeFollowingUser(userid,followingid)
        })
        .then(function (user) {
            res.send("1");
        }, function (err) {
            res.send("0");
        })
}

function login(req, res) {
        var user = req.user;
        res.json(user);
    }

function localStrategy(username, password, done) {
        userModel
            .findOne({"username":username})
            .then(
                    function(user) {
                            if (user && bcrypt.compareSync(password, user.password)) {
                                return done(null, user);
                                }
                            return done(null, false);
                        },
                    function(err) {
                            if (err) {
                                    return done(err);
                                }
                        }
                );
    }

function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

function serializeUser(user, done) {
        done(null, user);
    }

function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                    function (user) {
                            done(null, user);
                        },
                    function (err) {
                            done(err, null);
                        }
                );
}

function googleStrategy(token, refreshToken, profile, done) {
    // console.log(profile);
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {//.length !== 0
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        google: {
                            id:    profile.id,
                            token: token
                        },
                        type: "GENERAL"
                    };
                    return userModel.create(newGoogleUser);
                }
            },
            function(err) {
                console.log("errrrrrrr");
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

