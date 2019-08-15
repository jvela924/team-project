const express = require('express')
const router = express.Router()
const Disqover = require('../models/disqover.js')

router.post('/', (req,res) => {
  Disqover.create(req.body, (err, createdDisqover) => {
    res.json(createdDisqover)
  })
})

router.get('/', (req,res) => {
  Disqovers.find({}, (err, foundDisqovers) => {
    res.json(foundDisqovers)
  })
})

router.delete('/:id', (req,res) => {
  Disqovers.findByIdAndRemove(req.params.id, (err, deletedDisqover) => {
    res.json(deletedDisqover)
  })
})

router.put('/:id', (req,res) => {
  Disqovers.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedDisqover) => {
    res.json(updatedDisqover)
  })
})

module.exports = router;
