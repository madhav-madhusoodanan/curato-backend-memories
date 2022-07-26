const TwitterStrategy = require("passport-twitter").Strategy;
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");


passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_ID,
            consumerSecret: process.env.TWITTER_SECRET,
            callbackURL: `${process.env.SERVER_URL}/auth/twitter/callback`,
        },
        (token, refreshToken, profile, cb) => {
            User.create({
                username: uuidv4(),
                avatar: profile.photos[0].value,
                name: profile.displayname,
                email: `${uuidv4()}@curato.link`,
                // email: profile.emails[0].value,
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
