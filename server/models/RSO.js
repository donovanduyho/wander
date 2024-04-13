const database = require('../database');

async function findRSOByRid(rid) {
    return database.query("SELECT * FROM RSO WHERE rid = ?", [rid])
    .then(([data]) => data[0])
    .catch(err => {
        console.log(err);
        throw err;
    });
}

async function findRSOByName(name) {
    return database.query("SELECT * FROM RSO WHERE name = ?", [name])
    .then(([data]) => data[0])
    .catch((err) => {
        console.log(err);
        throw err;
    });
}

async function addRSO(RSO) {
    const {
        aid,
        name,
        description,
        uid
    } = RSO

    return database.query("INSERT INTO RSO (aid, name, description, uid) VALUES (?,?,?,?)", [aid, name, description, uid])
    .then(() => findRSOByName(name))
    .then((result) => result.rid)
    .catch(err => {
        console.log(err);
        throw err;
    });
}

async function findRSOByAid(aid) {
    return database.query("SELECT * FROM RSO WHERE aid = ?", [aid])
    .then(([data]) => data[0])
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function findRSOsByUid(uid) {
    return database.query("SELECT name, description FROM RSO WHERE uid = ?", [uid])
    .then(([data]) => data.map(RSO => RSO))
    .catch((err) => {
        console.log("Error displaying RSOs");
        throw err;
    })
}





module.exports = {
    findRSOByRid,
    findRSOByName,
    addRSO,
    findRSOByAid,
    findRSOsByUid
}