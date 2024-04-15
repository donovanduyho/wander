const database = require('../database');


async function findPersonByPid(pid) {
    return database.query("SELECT * FROM Person WHERE pid = ?", [pid])
    .then(([data]) => data[0])
    .catch (err => console.log(err));
}

async function findPersonByUsername(username) {
    return database.query("SELECT * FROM Person WHERE username = ?", [username])
    .then(([data]) => data[0])
    .catch(err => console.log(err))
}

async function findPersonByEmail(email) {
    return database.query("SELECT * FROM Person WHERE email = ?", [email])
    .then(([data]) => data[0])
    .catch(err => console.log(err))
}

async function addPerson(person) {
    const { username, password, first_name, last_name, phone, email, access, uid } = person;
    return database.query("INSERT INTO Person (username, password, first_name, last_name, phone, email, access, uid) VALUES (?,?,?,?,?,?,?,?)", 
    [username, password, first_name, last_name, phone, email, access, uid])
    .then(() => findPersonByUsername(username))
    .then((data) => data.pid)
    .catch(err => console.log(err));
}

async function deletePerson(pid) {
    database.query("DELETE FROM Person WHERE pid = ?", [pid])
    .catch((err) => console.log(err));
}


async function findPersonByUsernameAccess(username, access) {
    return database.query("SELECT * FROM Person WHERE username = ? AND access = ?", [username, access])
    .then(([data]) => data[0])
    .catch(err => console.log(err))
}

module.exports = {
    findPersonByPid,
    findPersonByUsername,
    findPersonByEmail,
    addPerson,
    deletePerson,
    findPersonByUsernameAccess 
}