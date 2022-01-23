const TwitterStrategy = require("passport-twitter").Strategy;
const passport = require("passport");

passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_ID,
            consumerSecret: process.env.TWITTER_SECRET,
            callbackURL: "http://localhost:6969/auth/twitter/callback",
        },
        (token, refreshToken, profile, cb) => {
            let user, err;
            user = User.create({
                username: profile.id,
                avatar: profile.photos[0].value,
                name: profile.displayname,
                // email: profile.emails[0].value,
                authKey: uuidv4(),
            });
            console.log(Object.keys(profile));
            console.log(user.avatar);
            cb(err, user);
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
