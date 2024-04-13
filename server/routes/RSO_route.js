const express = require('express');
const router = express.Router();
const passport = require('passport');


const {
    findRSOByRid,
    findRSOByName,
    addRSO,
    findRSOByAid,
    findRSOsByUid
} = require('../models/RSO')

const {
    findAdminByAid,
    findAdminByUsername,
    addAdmin,
    findAdminByPid
} = require('../models/Admins');
const { 
    addRSOMember, 
    findRSOMemberPidRid,
    deleteRSOMember
} = require('../models/Student_RSOs');
 

router.post('/createRSO', (req, res) => {
    const {
        pid,
        name,
        description,
        uni
    } = req.body
    findRSOByName(name)
    .then((result) => {
        if (result)
            res.status(400).json({message: "RSO name already taken"})
        else {
            const newAdmin = {
                pid,
                uni
            }
            addAdmin(newAdmin)
            .then((aid) => {
                const RSO = {
                    aid,
                    name,
                    description
                }
                addRSO(RSO)
                .then((rid) => {
                    addRSOMember(pid, rid);
                })
                .catch((err) => {
                    res.status(400).json({ message: "Error creating new RSO"});
                    throw err;
                })
            })
            .catch((err) => {
                res.status(400).json({ message: "Error adding new admin", err})
                throw err
            })
        }
    })
    .catch((err) => {
        res.status(400).json({message: "Error trying to find RSO", err});
        throw err;
    })
})

router.post('/join', async (req, res) => {
    const {
        pid, 
        rid,
    } = req.body

    findRSOMemberPidRid(pid, rid)
    .then((result) => {
        if (result)
            res.status(400).json({ message: "You have already joined this RSO"});
        else {
            const member = {
                pid,
                rid
            }
            addRSOMember(member)
            .then(() => res.status(200).json({message: "Successfully joined RSO"}))
            .catch(() => {
                res.status(400).json({ message: "Something went wrong joining RSO"});
            })
        }
    }).catch((err) => {
        res.status(400).json({ message: "Error finding RSO"})
    })
})

router.delete('/leave', async (req, res) => {
    const { pid, rid } = req.body;
    const member = { pid, rid };
    deleteRSOMember(member)
    .then(() => res.status(200).json({ message: "Successfully left RSO"}))
    .catch((err) => res.status(400).json({ message: "Error leaving RSO" + err}))
})

router.post('/showRSOs/:uid', (req, res) => {
    const { uid } = req.params
    console.log(uid);
    findRSOsByUid(uid).then((data) => res.json(data))
    .catch(() => res.status(400).json({ message : "Error returning RSOs"}))
})


module.exports = router;