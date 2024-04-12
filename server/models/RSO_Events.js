const database = require('../database');


async function findRSOEventByEid(eid) {
    return database.query("SELECT * FROM RSO_Events r INNER JOIN Events e ON r.eid = e.eid WHERE r.eid = ?", [eid])
    .then(([data]) => data[0])
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function addRSOEvent(event) {
    const {eid, rid} = event;
    database.query("INSERT INTO RSO_Events (eid, rid) VALUES (?, ?)", [eid, rid]);
}

async function findAllRSOEvents(rid) {
    return database.query("SELECT * FROM Events WHERE eid IN (SELECT eid FROM RSO_Events WHERE rid = ?)", [rid])
    .then(([data]) => data.map(row => ({ ...row, type: "RSO"})))
    .catch((err) => {
        console.log('RSO Events FindAll', err);
        throw err;
    })
}



module.exports = {
    findRSOEventByEid,
    addRSOEvent,
    findAllRSOEvents
}