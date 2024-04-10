const { json } = require('express');
const express = require('express');
const router = express.Router();
const moment = require('moment');
const passport = require('passport')

const {
    findEventByEid,
    findEventByName,
    addEvent
} = require('../models/Events')

const {
    findPrivateEventByAid,
    findPrivateEventByEid,
    findPrivateEventByName,
    addPrivateEvent,
    findAllPrivateEvents
} = require('../models/Private_Events');

const {
    findAllPublicEvents,
    findPublicEventByAid,
    findPublicEventByEid,
    findPublicEventByName,
    addPublicEvent
} = require('../models/Public_Events');


// create event
router.post('/create', (req, res) => {
    const { pid, aid, uid } = req.body
    const {
        name,
        description,
        type,
        date,
        email,
        phone,
        lname,
        address,
        category
    } = req.body

    const event = {
        name,
        description,
        time: moment(date).format('YYYY-MM-DD HH:mm:ss'),
        lname,
        address,
        category,
        email,
        phone
    }

    addEvent(event)
    .then((eid) => {
        res.status(200).json({eid});

        if (type === 'Public')
            return addPublicEvent({ eid, aid });
        if (type === 'Private')
            return addPrivateEvent({ eid, aid, uid })
    })
    .then(() => {
        res.status(200).send();
    })
    .catch(err => {
        console.log(err);
        res.status(400).send({err})
    })
})

//get all events
router.get('/allEvents', (req, res) => {
    const {uid} = req.body;

    Promise.all([findAllPublicEvents(), findAllPrivateEvents(uid)])
    .then(results => {
        const allEvents = [...results[0], ...results[1]];

        res.json(allEvents);
    })
    .catch((err) => {
        res.status(400).json({message: "Something went wrong.", err})
    })
})

//get individual event
router.get('/:eid', (res, req) => {
    const { eid } = req.body;
    findEventByEid(eid)
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json({message: "Something went wrong", err}));
})


module.exports = router;