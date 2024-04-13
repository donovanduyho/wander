const express = require('express');
const router = express.Router();

const {
    findAdminByAid,
    findAdminByUsername,
    addAdmin,
    findAdminByPid
} = require('../models/Admins')

router.post("/getAdminByAid", (req, res) => {
    const {
        aid
    } =  req.body;
    findAdminByAid(aid).then((data) => res.status(200).json({data}))
    .catch(() => res.status(400).json({message: "something went wrong finding admin"}))
})

router.post("/getAdminByUsername", (req, res) => {
    const {
        username
    } = req.body
    findAdminByUsername(username).then((data) => res.status(200).json({data}))
    .catch(() => res.status(400).json({message: "something went from finding admin"}))
})

router.post("/addAdmin", (req, res) => {
    const {
        pid,
        uid
    } = req.body;
    const admin = {
        pid,
        uid
    };
    addAdmin(admin).then(() => res.status(200).json({ message: "Successfully added new Admin"}))
    .catch(() => "Error adding new admin")
})

module.exports = router;