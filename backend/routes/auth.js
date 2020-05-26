const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = require('../models/users');
const CLIENT_MAIN_PAGE_URL = 'http://localhost:3000/main';
const CLIENT_HOME_PAGE_URL = 'http://localhost:3000';

const saltRounds = 10;

router.post('/signup', async (req, res, next) => {
  const { name, email, password, about } = req.body;
  try {
    const userCheck = await User.findOne({ email });
    if (userCheck) {
      res.send({ message: 'Email already in use' });
    } else {
      await User.create({
        name,
        email,
        about,
        avatar: '',
        password: await bcrypt.hash(password, saltRounds),
        followers: [],
        following: [],
      });
      res.redirect(307, '/auth/login');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send({ message: 'Wrong email or password' });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.send({ user });
    });
  })(req, res, next);
});

// when login is successful, retrieve user info
router.get('/login/success', (req, res, next) => {
  try {
    if (req.user) {
      res.send({
        success: true,
        message: 'user has successfully authenticated',
        user: req.user,
        cookies: req.cookies,
      });
    } else {
      res.send({
        success: false,
        message: 'user is not authenticated',
      });
    }
  } catch (error) {
    next(error);
  }
});

// when login failed, send failed msg
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.',
  });
});

// When logout, redirect to client
router.get('/logout', (req, res, next) => {
  try {
    req.logOut();
    req.session = null;
    res.redirect(CLIENT_HOME_PAGE_URL);
  } catch (error) {
    next(error);
  }
});

// auth with google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// redirect to home page after successfully login via google
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_MAIN_PAGE_URL,
    failureRedirect: '/auth/login/failed',
  })
);

// auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

// redirect to home page after successfully login via facebook
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: CLIENT_MAIN_PAGE_URL,
    failureRedirect: '/auth/login/failed',
  })
);

module.exports = router;
