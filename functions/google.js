const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
        },
        (accesToken, refreshToken, profile, cb) => {
            // find user into user, timestamp 50:00 around
            User.create({
                email: `${uuidv4()}@curato.link`,
                username: uuidv4(),
                avatar: profile.photos[0].value,
                authKey: uuidv4(),
            })
                .then((user) => cb(null, user))
                .catch((e) => console.log(e));
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
