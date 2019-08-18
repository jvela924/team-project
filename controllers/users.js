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

registerUser.put('/:id', (req,res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser) => {
    { $push: { likes: req.body.likes} }
    res.json(updatedUser)
  })
})

registerUser.get('/', (req,res) => {

  User.find({}, (err, foundUsers) => {
    currentUser = req.body.username

    res.json(foundUsers)
  })
})

registerUser.get('/:id', (req,res) => {
  User.findById(req.params.id, (err,foundUser) => {
    res.json(foundUser)
  })
})

//Export registerUser
module.exports = registerUser;
