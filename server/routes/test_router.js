const express = require('express');
const router = express.Router();
const database = require('../database')

router.get('/', (req, res) => {
    res.status(200).json({message: "this is a test"});
})

module.exports = router;