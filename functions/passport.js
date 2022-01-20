const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/user")
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: "http://localhost:6969/auth/google/callback",
        },
        (accesToken, refreshToken, profile, cb) => {
            // find user into user, timestamp 50:00 around
            let user, err;
            user = User.create({
                username: profile.displayName,
                avatar: profile.photos[0].value,
            })
            console.log(user.avatar)
            cb(err, user)
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})

module.exports = passport
