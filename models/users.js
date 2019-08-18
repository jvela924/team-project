///////////////////////////////////////////////////////////////////////////////
// This file is the blueprint for user creation and authentication.
//////////////////////////////////////////////////////////////////////////////
//DEPENDANCIES
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User Schema
const userSchema = Schema({
  username: String,
  password: String,
  access_token: String,
  likes: Array
});

const User = mongoose.model('User', userSchema);

//export User
module.exports = User;
