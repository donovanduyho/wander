const database = require('../database');

async function findRSOByRid(rid) {
    return database.query("SELECT * FROM RSO WHERE rid = ?", [rid])
    .then(([row]) => row[0])
    .catch(err => {
        console.log(err);
        throw err;
    });
}

async function findRSOByName(name) {
    return database.query("SELECT * FROM RSO WHERE name = ?", [name])
    .then(([row]) => row[0])
    .catch((err) => {
        console.log(err);
        throw err;
    });
}

async function addRSO(RSO) {
    const {
        aid,
        name,
        description
    } = RSO

    database.query("INSERT INTO RSO (aid, name, description) VALUES (?,?,?)", [aid, name, description])
    .then(([result]) => result.insertId)
    .catch(err => {
        console.log(err);
        throw err;
    });
}



module.exports = {
    findRSOByRid,
    findRSOByName,
    addRSO
}