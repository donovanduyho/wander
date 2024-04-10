const database = require('../database');


async function findPersonByPid(pid) {
    return database.query("SELECT * FROM Person WHERE pid = ?", [pid])
    .then(([rows]) => rows[0])
    .catch (err => console.log(err));
}

async function findPersonByUsername(username) {
    return database.query("SELECT * FROM Person WHERE username = ?", [username])
    .then(([rows]) => rows[0])
    .catch(err => console.log(err))
}

async function findPersonByEmail(email) {
    return database.query("SELECT * FROM Person WHERE email = ?", [email])
    .then(([rows]) => rows[0])
    .catch(err => console.log(err))
}

async function addPerson(person) {
    const { username, password, first_name, last_name, phone, email, access } = person;
    return database.query("INSERT INTO Person (username, password, first_name, last_name, phone, email, access) VALUES (?,?,?,?,?,?,?)", 
    [username, password, first_name, last_name, phone, email, access])
    .then(() => findPersonByUsername(username))
    .then((result) => result.pid)
    .catch(err => console.log(err));
}

async function deletePerson(pid) {
    database.query("DELETE FROM Person WHERE pid = ?", [pid])
    .catch((err) => console.log(err));
}


async function findPersonByUsernameAccess(username, access) {
    return database.query("SELECT * FROM Person WHERE username = ? AND access = ?", [username, access])
    .then(([rows]) => rows[0])
    .catch(err => console.log(err))
}

async function updatePerson(password, pid) {
    console.log(password);
    return database.query("UPDATE Person SET password = ? WHERE pid = ?", [password, pid])
    .catch((err) => console.log(err));
}

module.exports = {
    findPersonByPid,
    findPersonByUsername,
    findPersonByEmail,
    addPerson,
    deletePerson,
    findPersonByUsernameAccess,
    updatePerson
}