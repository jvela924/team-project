const express = require('express');
const router = express.Router();
require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const SpotifyWebApi = require('../models/spotify-web-api-js.js');
const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI
});

router.get('/', (req, res) => {
  res.json(spotifyApi);
})
router.post('/', (req, res) => {
  res.json(spotifyApi.getArtists(req.body));
})

module.exports = router;
