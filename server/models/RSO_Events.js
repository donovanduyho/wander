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



module.exports = {
    findRSOEventByEid,
    addRSOEvent
}