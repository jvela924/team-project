const express = require('express')
const router = express.Router()
const Disqover = require('../models/disqover.js')

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

router.put('/:id', (req,res) => {
  // req.body.username = req.session.currentUser.username
  // let artists = req.body.fav_artists.split(',')
  // req.body.fav_artists = artists
  // let movies = req.body.fav_movies.split(',')
  // req.body.fav_movies = movies
  Disqover.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedDisqover) => {
    res.json(updatedDisqover)
  })
})

module.exports = router;
