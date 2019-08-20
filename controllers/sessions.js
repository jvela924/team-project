///////////////////////////////////////////////////////////////////////////////
// This file is for when a user is logged in. It contains the dependancies and
// Routes for logging out of a user session (userSession.delete) and the log In
// (userSession.post)
///////////////////////////////////////////////////////////////////////////////
//DEPENDANCIES
const express = require('express');
const userSession = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

//CLOSE / DESTROY the user's session
userSession.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({
      status: 200,
      message: 'Logout Completed'
    });
  });
});
//USER LOGIN
userSession.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (error, foundUser) => {
    if(foundUser === null) {
      res.status(404).json({
        status: 404,
        message: 'User Not Found',
        userData: foundUser
    })
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.currentUser = foundUser;
        console.log(foundUser);
        res.status(201).json({
          status: 201,
          message: 'User Session Created',
          userData: foundUser
        });
      } else {
        res.status(401).json({
          status: 401,
          message: 'Login Failed'
        });
      }
    }
  });
});

//export userSession
module.exports = userSession;
