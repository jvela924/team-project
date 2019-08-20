const express = require('express')
const router = express.Router()
require('dotenv').config();
const Disqover = require('../models/disqover.js')

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


router.post('/', (req,res) => {
  req.body.username = req.session.currentUser.username
  let artists = req.body.fav_artists.split(',')
  req.body.fav_artists = artists
  let movies = req.body.fav_movies.split(',')
  req.body.fav_movies = movies
  Disqover.create(req.body, (err, createdDisqover) => {
    res.json(createdDisqover)
  })
})



router.get('/', (req,res) => {

  Disqover.find({}, (err, foundDisqovers) => {

    res.json(foundDisqovers)
  })
})

router.delete('/:id', (req,res) => {
  Disqover.findByIdAndRemove(req.params.id, (err, deletedDisqover) => {
    res.json(deletedDisqover)
  })
})
router.put('/comments/:id', (req, res) => {
  Disqover.findByIdAndUpdate(req.params.id, {$push: {comments: req.body.comments}}, {new:true}, (error, updatedDisqover) => {
    console.log(req.body.comments);
    res.json(updatedDisqover);
  })
})
router.put('/:id', (req,res) => {
  // req.body.username = req.session.currentUser.username
  // let artists = req.body.fav_artists.split(',')
  // req.body.fav_artists = artists
  // let movies = req.body.fav_movies.split(',')
  // req.body.fav_movies = movies
  Disqover.findByIdAndUpdate(req.params.id, { $push: {followers: req.session.currentUser.username}}, {new:true}, (err, updatedDisqover) => {
    console.log(req.session.currentUser.username);
    res.json(updatedDisqover);
  })
})

module.exports = router;
