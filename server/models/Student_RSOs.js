const database = require('../database');

async function findRSOMemberPidRid(pid, rid) {
    database.query("SELECT * FROM Student_RSOs WHERE pid = ? AND rid = ?", [pid, rid])
    .then(([data]) => data[0])
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function addRSOMember(member) {
    const {rid, pid} = member
    return database.query("INSERT INTO Student_RSOs (rid, pid) VALUES (?, ?)", [rid, pid])
    .then(() => rid)
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function deleteRSOMember(member) {
    const {pid, rid} = member;
    return database.query("DELETE FROM Student_RSOs WHERE pid = ? AND rid = ?", [pid, rid])
    .then(() => rid)
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function findAllUserRSOs(pid) {
    return database.query("SELECT * FROM Student_RSOs WHERE pid = ?", [pid])
    .then(([result]) => result.map(row => row.rid))
    .catch((err) => {
        console.log(err);
        throw err;
    })

}

module.exports = {
    findRSOMemberPidRid,
    addRSOMember,
    deleteRSOMember,
    findAllUserRSOs
}