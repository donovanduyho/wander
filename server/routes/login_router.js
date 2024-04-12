const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const database = require('../database')


const {
    findPersonByPid,
    findPersonByUsername,
    findPersonByEmail,
    addPerson,
    deletePerson,
    findPersonByUsernameAccess
} = require('../models/Person')

const {
    findStudentByPid,
    addStudent,
    findStudentByUsername
} = require('../models/Students')

const {
    findSABySpid,
    findSAByUsername,
    addSA
} = require('../models/Super_Admins');

const {
    hashPassword,
    comparePassword,
} = require('../controllers/encrypt');
const { findUniByName } = require('../models/Universities');


router.post('/login', async(req,res) => {
    const { username, password } = req.body

    let user = await findStudentByUsername(username);

    if (!user)
    {
        user = await findSAByUsername(username);
    }
    if (!user)
        return res.status(400).json({ message: "No user found"});

    const match = await comparePassword(password, user.password)

    if (match) {
        const jwtInfo = {
            pid : user.pid,
            spid: user.spid,
            uid: user.uid,
            first_name: user.first_name,
            last_name: user.last_name,
            access: user.access
        };

        console.log(jwtInfo);
        
        jwt.sign(jwtInfo, process.env.TOKEN_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) {
                res.status(400).json({ message: "something went wrong"});
                console.log(err);
            }
            res.status(200).json({
                token: 'Bearer ' + token
            })
        })
    }
    else {
        res.status(400).json({ message : "Incorrect Username or Password"});
    }
});

router.post('/registerStudent', async (req, res) => {
    const {
        username,
        password,
        first_name,
        last_name,
        phone,
        email,
        university
    } = req.body

    let hashedPassword = await hashPassword(password);

    await findPersonByUsername(username)
    .then((user) => {
        if (user)
            return res.status(400).json({message: "This user already exists"})
        else {
            findPersonByEmail(email)
            .then((result) => {
                if (result)
                    return res.status(404).json({message: "This email already exists"})
                else {
                    const student = {
                        username,
                        password: hashedPassword,
                        first_name,
                        last_name,
                        phone,
                        email,
                        university
                    }

                    addStudent(student).then(() => res.status(200).json({message: "New student created"}))
                    .catch(() => res.status(400).json({message: "Error creating new student"}))
                }
            })
        }
    }).catch(() => {
        res.status(400).json({message: "something went wrong finding user"})
    })
});

router.post('/registerSA', async (req, res) => {
    const {
        username,
        password,
        first_name,
        last_name,
        phone,
        email,
        university
    } = req.body

    let uid = await findUniByName(university)
    .then((result) => result.uid)
    .catch(() => res.status(400).json({ message: "Error finding university"}))

    let hashedPassword = await hashPassword(password);
    
    findPersonByUsername(username)
    .then((user) => {
        if (user)
            return res.status(404).json({message: "Username already exists"})
        else {
            findPersonByEmail(email).then((result) => {
                if (result)
                    return res.status(404).json({message: "Email already exists"})
                else {
                    const superAdmin = {
                        username,
                        password: hashedPassword,
                        first_name,
                        last_name,
                        phone,
                        email,
                        access: "super admin",
                        uid
                    };
                    addSA(superAdmin)
                    .then(() => res.status(200).json({message: "New SA successfully created"}))
                    .catch(() => res.status(400).json({message: "Error creating new SA"}))
                };
            })
        }
    })
    .catch((err) => {
        res.status(400).json({message: "Error finding person", err})
    })
})



module.exports = router;