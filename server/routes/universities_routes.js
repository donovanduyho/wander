const express = require('express');
const database = require('../database');
const router = express.Router();
const {
    findUniByUid,
    findUniNameList,
    findUniBySpid,
    addUni,
    findUniByName,
    searchForUni
} = require('../models/Universities');


router.get('/uniNames', (req, res) => {
    findUniNameList().then((data) => res.status(200).json({data}))
    .catch(() => res.status(400).json({message: "error receiving universitity list"}));
})

router.post('/addUni', (req, res) => {
    const {
        spid,
        name,
        description,
        student_count,
        picture,
        lname,
        address
    } = req.body;

    findUniByName(name).then((uni) => {
        if (uni)
            return res.status(404).json({ message: "University page already registered"})
        else {
            const university = {
                spid,
                name,
                description,
                student_count,
                picture,
                lname,
                address
            };
            addUni(university).then(uid => res.status(200).json({ uid }))
            .catch(() => res.status(400).json({ message: "Error creating university page"})); 
        }
    })
});

router.post('/searchForUni', (req, res) => {
    const { search } = req.body;

    searchForUni(search)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json("Error searching for uni"))
})

router.post('/:uid', (req, res) => {
    const { uid } = req.params;
    findUniByUid(uid).then((data) => res.status(200).json({data}))
    .catch((err) => res.status(400).json({message: "Error finding university" + uid}))
})
    
    



module.exports = router;