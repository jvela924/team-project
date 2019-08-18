const mongoose = require('mongoose')

const disqoverSchema = new mongoose.Schema({
  name: String,
  image: String,
  age: Number,
  bio: String,
  fav_artists: Array,
  fav_movies: Array,
  username: String
})

const Disqovers = mongoose.model('Disqover', disqoverSchema)

module.exports = Disqovers
