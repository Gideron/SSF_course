'use strict';

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new Strategy(
    (username, password, done) => {
        try {
            const user = userModel.getUserLogin(username);
            console.log('Local strategy', user);
            if (user === undefined) {
                return done(null, false, {message: 'Incorrect username'});
            }
            if (user.password !== password) {
                return done(null, false, {message: 'Incorrect password'});
            }
            return done(null, {...user}, {message: 'Logged in successfully'});
        }
        catch (err) {
            return done(err);
        }
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'asd123',
    },
    (jwtPayload, done) => {
        console.log('payload', jwtPayload);
        const user = userModel.getUser(jwtPayload.id);
        console.log('payload user', user);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    },
));

module.exports = passport;