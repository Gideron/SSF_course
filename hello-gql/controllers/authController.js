'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');

const login = (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log('error', err);
        if (err || !user) {
            return res.status(500).json({
                message: 'Something went wrong',
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user, 'asd123');
            return res.json({user, token});
        });
    })(req, res);
};

module.exports = {
    login,
};