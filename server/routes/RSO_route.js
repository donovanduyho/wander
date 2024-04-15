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
    findRSOMemberPid,
    deleteRSOMember,
    findAllUserRSOs
} = require('../models/Student_RSOs');

router.get('/getStudentRSOs', (req, res) => {
    const {pid} = req.body;
    findAllUserRSOs(pid).then((result) => res.status(200).json({ result }))
    .catch((err) => {
        console.log(err);
        throw err;
    })

})
 

router.post('/createRSO', (req, res) => {
    const {
        pid,
        name,
        description,
        uid
    } = req.body
    findRSOMemberPid(pid)
    .then((result) => {
        if (result) {
            console.log("already joined an RSO")
            res.status(400).json({ message: "You have already joined an RSO"});
        }
        else {
            findRSOByName(name)
            .then((result) => {
                if (result)
                    res.status(400).json({message: "RSO name already taken"})
                else {
                    const newAdmin = {
                        pid,
                        uid
                    }
                    addAdmin(newAdmin)
                    .then((aid) => {
                        const RSO = {
                            aid,
                            name,
                            description,
                            uid
                        }
                        addRSO(RSO)
                        .then((rid) => {
                            const member = { pid, rid }
                            addRSOMember(member)
                            .then(() => res.status(200).json(rid))
                            .catch(() => res.status(400).json({ message: "Error adding member to RSO"}));
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
        }
    })
})  
router.post('/join', async (req, res) => {
    const {
        pid, 
        rid,
    } = req.body

    const member = {
        pid,
        rid
    }

    findRSOMemberPid(pid)
    .then((result) => {
        if (result)
            res.status(400).json({ message: "You have already joined an RSO"});
        else {
            addRSOMember(member)
            .then((rid) => res.status(200).json(rid))
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
    .then(() => res.status(200).json({rid}))
    .catch((err) => res.status(400).json({ message: "Error leaving RSO" + err}))
})

router.post('/showRSOs', (req, res) => {
    const { uid } = req.body
    console.log(uid);
    findRSOsByUid(uid).then((data) => res.json(data))
    .catch(() => res.status(400).json({ message : "Error returning RSOs"}))
})


module.exports = router;