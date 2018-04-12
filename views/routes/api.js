const express = require('express');
const router = express.Router();

router.get('/comments', (req, res)=> {
    res.send({type: 'GET'});
})

router.post('/comments', (req, res)=> {
    res.send({type: 'POST'});
})

router.put('/comments/:id', (req, res)=> {
    res.send({type: 'PUT'});
})

router.delete('/comments:id', (req, res)=> {
    res.send({type: 'DELETE'});
})

module.exports = router;