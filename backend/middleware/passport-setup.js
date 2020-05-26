const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
const { User } = require('../models/users');

const saltRounds = 10;

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(new Error('Failed to desirialize a user'));
    });
});

//Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) {
        done(null, false);
        return;
      }
      if (await bcrypt.compare(password, user.password)) {
        done(null, user);
      } else {
        done(null, false);
        return;
      }
    },
  )
);

//Google Strategy
passport.use(
  new GoogleStrategy(
    {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const currentUser = await User.findOne({
        email: profile._json.email,
      });
      if (!currentUser) {
        const newUser = await User.create({
          name: profile._json.name,
          avatar: profile._json.picture,
          email: profile._json.email,
          about: '',
          googleId: profile.id,
          followers: [],
          following: [],
        });
        if (newUser) {
          done(null, newUser);
        }
      }
      done(null, currentUser);
    }
  ) 
);

//Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'picture.type(large)', 'email', 'friends', 'first_name', 'last_name', 'link']
    },
    async (accessToken, refreshToken, profile, done) => {
      const currentUser = await User.findOne({
        facebookId: profile.id,
      });
      if (!currentUser) {
        const newUser = await User.create({
          name: profile._json.name,
          avatar: `https://graph.facebook.com/${profile.id}/picture?width=200&height=200&access_token=${accessToken}`,
          about: '',
          facebookId: profile._json.id,
          followers: [],
          following: [],
        });
        if (newUser) {
          done(null, newUser);
        }
      }
      done(null, currentUser);
    }
  ) 
);
