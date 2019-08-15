const mongoose = require('mongoose');
const express = require('express');
const port = 3000;
const sessions = require('express-session');
//const db = module require goes here
//database variable for heroku connection
const PROJECT3_DB = process.env.PROJECT3_DB;

//Connect to MongoDB
mongoose.connect(PROJECT3_DB, {useNewUrlParser: true});

//Error / Success
db.on('error', (error) => {
  console.log(error.message + ' is Mongod not running?');
})
db.on('connected', () => {
  console.log('Mongo Connected: ', PROJECT3_DB);
});
db.on('disconnected', () => {
  console.log('Mongo Disconnected');
})
