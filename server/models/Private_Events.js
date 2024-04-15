const database = require('../database');
const moment = require('moment');

async function findPrivateEventByEid(eid) {
    return database.query("SELECT * FROM Private_Events p INNER JOIN Events e ON p.eid = e.eid WHERE eid = ?", [eid])
    .then(([data]) => data[0])
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function findPrivateEventByAid(aid) {
    return database.query("SELECT * FROM Private_Events p INNER JOIN Events e ON p.eid = e.eid WHERE p.aid = ?", [aid])
    .then(([data]) => data[0])
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function findPrivateEventByName(name) {
    return database.query("SELECT * FROM Private_Events p INNER JOIN events e ON p.eid = e.eid WHERE e.name = ?", [name])
    .then(([data]) => data[0])
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function addPrivateEvent(event) {
    const { eid, aid, uid } = event;
    database.query("INSERT INTO Private_Events (eid, aid, uid) VALUES (?,?,?)", [eid, aid, uid])
    .then(() => eid)
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function findAllPrivateEvents(uid) {
    return database.query("SELECT * FROM Events WHERE eid IN (SELECT eid FROM Private_Events WHERE uid = ?)", [uid])
    .then(([data]) => data.map(row => ({...row, type: "Private Event"})))
    .catch((err) => {
        console.log('Public Events FindAll', err);
        throw err;
    })
}

module.exports = {
    findPrivateEventByAid,
    findPrivateEventByEid,
    findPrivateEventByName,
    addPrivateEvent,
    findAllPrivateEvents
}