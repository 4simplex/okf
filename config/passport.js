const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
    //esto daba errores por version no esta igual que el tutorial
    //https://stackoverflow.com/questions/36533767/nodejs-jwtstrategy-requires-a-function-to-retrieve-jwt-from-requests-error/36535956 
    var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload._id, (err, user) => {
            if(err){
                return done(err, false);
            }

            if(user) {
                return done(null, user);
            } else {
                return done(done, false);
            }
        });
    }));
}