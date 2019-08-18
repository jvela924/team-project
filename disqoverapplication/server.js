///////////////////////////////////////////////////////////////////////////////
// This file is all the configurations, dependancies, and controllers for the
// application. Includes connections to MongoDB and middleware necessary for
// the application to run
///////////////////////////////////////////////////////////////////////////////
//=============
//DEPENDANCIES
//=============
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const sessions = require('express-session');
const db = mongoose.connection;
require('dotenv').config();

const APIKEY = process.env.APIKEY;
module.exports = APIKEY;
const PORT = process.env.PORT || 3000;

//database variable for heroku connection
const PROJECT3_DB = process.env.PROJECT3_DB;
//============================
//MIDDLEWARE
//============================



app.use(express.json());
app.use(express.static('public'));
app.use(sessions({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

//===========================
//CONTROLLERS
//===========================
const userController = require('./controllers/users.js');
app.use('/users', userController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//MAIN SERVER ROUTE FOR USER LOGIN SESSION
const disqoverController = require('./controllers/disqover.js');
app.use('/disqover', disqoverController);
// MAIN SERVER ROUTE FOR USER LOGIN SESSION
app.get('/disqover', (req, res) => {
  if(req.session.currentUser){
    res.json(req.session.currentUser);
  } else {
    res.status(401).json({
      status: 401,
      message: "Not Logged In"
    });
  }
});

app.get('/apikey', (req, res) => {
  res.send(APIKEY)
})

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

//CONNECT TO MONGOD LOCALLY
mongoose.connection.once('open', () => {
  console.log('Connected to Mongoose');
})
//APP LISTENER
app.listen(PORT, () => {
  console.log('Listening...');
})