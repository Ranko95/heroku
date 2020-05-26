module.exports = function(app) {
  const express = require("express");
  const cookieSession = require('cookie-session');
  const passport = require('passport');
  const passportSetup = require('./passport-setup');
  const session = require('express-session');
  const cors = require('cors');
  const cookieParser = require('cookie-parser');
  const morgan = require("morgan");
  const path = require("path");
  const dbConnection = require("./db-connect");

  app.use(morgan("dev"));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cookieParser());

  app.use(
    cookieSession({
      name: 'session',
      keys: ['galveston', 'texas'],
      maxAge: 24 * 60 * 60 * 100
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(
    cors({
      origin: '*',
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true
    })
  );

  app.use(express.static(path.join(__dirname, '..', 'build')));


  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });

  // app.use(express.static(path.join(__dirname, '..', "public")));

};
