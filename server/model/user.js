var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = function () {

   //var db = mongoose.connect(process.env.MONGO_URI);

    var UserSchema = new Schema({
        email: {
            type: String, required: true,
            trim: true, unique: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        facebookProvider: {
            type: {
                id: String,
                token: String
            },
            select: false
        },
        googleProvider: {
            type: {
                id: String,
                token: String
            },
            select: false
        },
        userType: {
            type: String,
            default: 'USER'
        },
        fullName: {
            type: String
        }
    });

    UserSchema.set('toJSON', {getters: true, virtuals: true});

    UserSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
        console.log('fb profile------------'+profile);
        console.log('fb profile------------'+JSON.stringify(profile));
        var that = this;
        return this.findOne({
            'email': profile.emails[0].value
        }, function(err, user) {
            // no user was found, lets create a new one
            if (!user) {
                var newUser = new that({
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                    facebookProvider: {
                        id: profile.id,
                        token: accessToken
                    }
                });

                newUser.save(function(error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    };

    UserSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
        console.log('Google profile------------'+profile);
        console.log('Google profile------------'+JSON.stringify(profile));
        var that = this;
        return this.findOne({
            'email': profile.emails[0].value
        }, function(err, user) {
            // no user was found, lets create a new one
            if (!user) {
                var newUser = new that({
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                    googleProvider: {
                        id: profile.id,
                        token: accessToken
                    }
                });

                newUser.save(function(error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                
                return cb(err, user);
            }
        });

    };

    mongoose.model('User', UserSchema);

    //return db;
};
