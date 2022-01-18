const morgan = require('morgan');
var User = require('../model/user');


exports.upsertGoogleUser = (accessToken, refreshToken, profile) => {

    console.log('Google profile------------' + profile);
    console.log('Google profile------------' + JSON.stringify(profile));

    let user = User.findOne({ email: profile.emails[0].value })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found user with id " + id })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Erro retrieving user with id " + id })
        });

    var updateUser = {
        fullName: profile.displayName,
        email: profile.emails[0].value,
        googleProvider: {
            id: profile.id,
            token: accessToken
        }
    };

    if (!user) {

        User.save(updateUser);
    } else {
        console.log('Google profile------------' + JSON.stringify(user));
        const id = user._id;
        User.findByIdAndUpdate(id, updateUser, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error Update user information" })
            })
    }
}



exports.upsertFacebookUser = (accessToken, refreshToken, profile) => {

    console.log('Facebook profile------------' + profile);
    console.log('Facebook profile------------' + JSON.stringify(profile));

    let user = User.findOne({ email: profile.emails[0].value })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found user with id " + id })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Erro retrieving user with id " + id })
        });

    var updateUser = {
        fullName: profile.displayName,
        email: profile.emails[0].value,
        googleProvider: {
            id: profile.id,
            token: accessToken
        }
    };

    if (!user) {

        User.save(updateUser);
    } else {
        console.log('Facebook user------------' + JSON.stringify(user));
        const id = user._id;
        User.findByIdAndUpdate(id, updateUser, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error Update user information" })
            })
    }
}