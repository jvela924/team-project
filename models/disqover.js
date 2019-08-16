const mongoose = require('mongoose')
const Schema = mongoose.Schema
const disqoverSchema = Schema({
  name: String,
  image: String,
  age: Number,
  bio: String,
  fav_artists: String,
  fav_movies: String,
  username: String
})

const Disqovers = mongoose.model('Disqover', disqoverSchema)

module.exports = Disqovers
