///////////////////////////////////////////////////////////////////////////////
// This file is all the configurations, dependancies, and controllers for the
// application. Includes connections to MongoDB and middleware necessary for
// the application to run
//Includes Spotify Web API Routes.
///////////////////////////////////////////////////////////////////////////////
//=============
//DEPENDANCIES
//=============
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const sessions = require('express-session');
//=================================================================
//Below frameworks and npm packages are for spotify web api mostly
//=================================================================
const request = require('request'); //"Request" Library
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
//=================================================================
const db = mongoose.connection;
require('dotenv').config();

const APIKEY = process.env.APIKEY;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
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
//==============================
//Middleware for Spotify Web API
//==============================
app.use(cors());
app.use(cookieParser());
//===========================
//CONTROLLERS
//===========================
const userController = require('./controllers/users.js');
app.use('/users', userController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);
// const spotifyController = require('./controllers/spotify.js');
// app.use('/spotify', spotifyController);



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
//SPOTIFY Controller
const spotifyController = require('./controllers/spotify.js');
app.use('/spotify', spotifyController);

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
//================================
//START SPOTIFY WEB API CODE
//================================
/**
* This is an example of a basic node.js script that performs
* the Authorization Code oAuth2 flow to authenticate against the
* Spotify Accounts.
*
* For more information, read
* https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
*/

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
 const generateRandomString = function(length){
   var text = '';
   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   for (let i = 0; i < length; i++){
     text += possible.charAt(Math.floor(Math.random() * possible.length));
   }
   return text;
 };

 var stateKey = 'spotify_auth_state';



 ////////////////////
 //ROUTES for SPOTIFY
 ///////////////////
app.get('/login', (req, res) => {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  //Your application requires authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
    state: state
  }));
});
app.get('/callback', (req, res) => {
  //your application requests refresh and access tokens
  //after checking the state parameter
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' + querystring.stringify({
      error: 'state_mismatch'
    }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
        refresh_token = body.refresh_token;
        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer' + access_token },
          json: true
        };
        //use the access token to access the Spotify Web API
        request.get(options, (error, response, body) => {
          console.log(body);
        });
        //we can also pass the token to the browser to make requests from there
        res.redirect('/#' + querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token
        }));
      } else {
        res.redirect('/#' + querystring.stringify({
          error: 'invalid_token'
        }));
      }
    });
  }
});

app.get('/refresh_token', (req, res) => {
  //requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});
//====================================================================
//END SPOTIFY WEB API CODE
//====================================================================

//APP LISTENER
app.listen(PORT, () => {
  console.log('Listening...');
})
