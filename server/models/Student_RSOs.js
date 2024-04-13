const database = require('../database');

async function findRSOMemberPidRid(pid, rid) {
    database.query("SELECT * FROM Student_RSOs WHERE pid = ? AND rid = ?", [pid, rid])
    .then(([data]) => data[0])
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function addRSOMember(pid, rid) {
    database.query("UPDATE Person SET rid = ? WHERE pid = ?", [rid, pid])
    .then(() => console.log("person updates"))
    .catch((err) => {
        console.log(err);
        throw err;
    })
    return database.query("INSERT INTO Student_RSOs (pid, rid) VALUES (?, ?)", [pid, rid])
    .then(([id]) => id.insertId)
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function deleteRSOMember(member) {
    const {pid, rid} = member;
    return database.query("DELETE FROM Student_RSOs WHERE pid = ? AND rid = ?", [pid, rid])
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

module.exports = {
    findRSOMemberPidRid,
    addRSOMember,
    deleteRSOMember
}