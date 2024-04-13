const express = require('express');
const router = express.Router();

const {  
    findSABySpid, 
    findSAByUsername, 
    addSA 
} = require("../models/Super_Admins");

const {
    findPersonByPid,
    findPersonByUsername,
    findPersonByEmail,
    addPerson,
    deletePerson,
    findPersonByUsernameAccess
} = require('../models/Person');

const { 
    hashPassword 
} = require('../controllers/encrypt');

router.post('/findSABySpid', (req, res) => {
    const {
        spid
    } = req.body;
    return findSABySpid(spid).then((data) => res.status(200).json({ data }))
    .catch(() => res.status(400).json({ message : "error finding super admin"}))
})

router.post("/getSAByUsername", (req, res) => {
    const {
        username
    } = req.body
    findSAByUsername(username).then((data) => res.status(200).json({ data }))
    .catch(() => res.status(400).json({ message: "Error finding Super Admin"}));
})




module.exports = router;