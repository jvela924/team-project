///////////////////////////////////////////////////////////////////////////////
// This file is for when a user is not logged in and will be for // creating a new user. It contains the dependancies and
// Routes for registering a new user.
//////////////////////////////////////////////////////////////////////////////
//DEPENDANCIES
const express = require('express');
const registerUser = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

//POST route for user creation
registerUser.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (error, createdUser) => {
    res.status(201).json({
      status: 201,
      message: "User Created"
    });
  });
});

registerUser.get('/', (req,res) => {

  User.find({}, (err, foundUsers) => {

    res.json(foundUsers)
  })
})

//Export registerUser
module.exports = registerUser;
