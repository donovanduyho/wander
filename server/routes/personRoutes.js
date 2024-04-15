
const express = require('express');
const { hashPassword } = require('../controllers/encrypt');
const router = express.Router();


const { findPersonByPid, 
    findPersonByUsername, 
    findPersonByEmail, 
    addPerson, 
    deletePerson
} = require('../models/Person');

router.get("/getByPid", (req, res) => {
    const {
        pid
    } = req.body;
    findPersonByPid(pid).then((data) => res.status(200).json( data ))
    .catch(() => res.status(400).json({ message : "Error finding person"}));
});

router.get("/getByUsername", (req, res) => {
    const {
        username
    } = req.body;
    findPersonByUsername(username).then((data) => res.status(200).json( data ))
    .catch(() => res.status(400).json({ message : "Error finding person"}));
})

router.post("/getByEmail", (req, res) => {
    const {
        email
    } = req.body;
    findPersonByEmail(email).then((data) => res.status(200).json( data ))
    .catch(() => res.status(400).json({ message : "Error finding person"}));
})

router.post("/addPerson", (req, res) => {
    const {
        username,
        password, 
        first_name,
        last_name, 
        phone, 
        email,
        access
    } = req.body

    findPersonByUsername(username).then((user) => {
        if (user)
            return res.status(404).json({ message : "this user already exists" });
        else {
            findPersonByEmail(email).then((result) => {
                if (result)
                    return res.status(404).json({ message : "this email already exists" });
                else {
                    const newPerson = {
                        username,
                        password, 
                        first_name,
                        last_name, 
                        phone, 
                        email,
                        access
                    };

                    addPerson(newPerson).then(() => res.status(200).json({ message : "New person created "}))
                    .catch(() => res.status(400).json({ message : "Error occurred creating new user"}));
                }
            })
        } 
    })
});

router.delete("/deletePerson", (req, res) => {
    const {
        pid
    } = req.body;
    deletePerson(pid).then(() => res.status(200).json({message: "Person successfully deleted."}))
    .catch(() => res.status(400).json({message: "error deleting person"}));
})


module.exports = router;
