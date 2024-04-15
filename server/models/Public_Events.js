const database = require('../database');

async function findPublicEventByEid(eid) {
    return database.query("SELECT * FROM Public_Events p INNER JOIN Events e ON p.eid = e.eid WHERE p.eid = ?", [eid])
    .then(([data]) => data[0])
    .catch((err) => {
        console.log("public event eid:", err);
        throw err;
    });
}

async function findPublicEventByAid(aid) {
    return database.query("SELECT * FROM Public_Events p INNER JOIN Events e ON p.eid = e.eid WHERE p.aid = ?", [aid])
    .then(([data]) => data[0])
    .catch((err) => {
        console.log("PE aid", err);
        throw err;
    });
}

async function findAllPublicEvents() {
    return database.query("SELECT * FROM Events WHERE eid IN (SELECT eid FROM Public_Events)")
    .then(([data]) => data.map(row => ({ ...row, type: 'Public Event'})))
    .catch((err) => {
        console.log("public event: find all", err);
        throw err;
    });
}

async function addPublicEvent(event) {
    const { eid, aid } = event;
    database.query("INSERT INTO Public_Events (eid, aid) VALUES (?, ?)", [eid, aid])
    .then(() => eid)
    .catch((err) => {
        console.log("add public event", err);
        throw err;
    })
}

async function findPublicEventByName(name) {
    return database.query("SELECT * FROM Events")
}

module.exports = {
    findAllPublicEvents,
    findPublicEventByAid,
    findPublicEventByEid,
    findPublicEventByName,
    addPublicEvent
}