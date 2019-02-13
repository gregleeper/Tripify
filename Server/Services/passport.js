const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const { User } = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Passport strategy for Google

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/api/auth/google/callback",
      passReqToCallBack: true
    },
    (res, accessToken, refreshToken, profile, done) => {
      // first look to see if the user has tied in their google account
      User.findOne({ "google.id": profile.id }).then(existingUser => {
        // if Google Id found within the user object in mongodb, log in
        if (existingUser) {
          done(null, existingUser);
        } else {
          // if Google Id was not found in user object then look for user via email
          User.findOne({ email: profile.emails[0].value }).then(
            existingUser => {
              // if user email was found to match that of the person loggin in with google
              // then connect the user account with the google account

              if (existingUser) {
                existingUser.google.id = profile.id;
                existingUser.google.email = profile.emails[0].value;
                existingUser.google.name = profile.displayName;
                existingUser.save();

                done(null, existingUser);
              } else {
                // the user email as not found in the database
                console.log("user not found in database");
                return done(null, null);
              }
            }
          );
        }
      });
    }
  )
);
