const express = require('express');
const router = express.Router();
const Disqovers = require('../models/disqovers.js');


//...farther down the page
router.post('/', (req, res)=>{
    Disqovers.create(req.body, (err, createdItem)=>{
        res.json(createdBookmark); //.json() will send proper headers in response so client knows it's json coming back
    });
});

router.get('/', (req, res)=>{
    Disqovers.find({}, (err, foundItem)=>{
        res.json(foundBookmark);
    });
});

router.delete('/:id', (req, res)=>{
    Disqovers.findByIdAndRemove(req.params.id, (err, deletedItem)=>{
        res.json(deletedItem);
    });
});

router.put('/:id', (req, res)=>{
    Disqovers.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateditem)=>{
        res.json(updatedItem);
    });
});

module.exports = router;
