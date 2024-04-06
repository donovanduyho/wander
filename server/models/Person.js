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
    .then(person => person.pid)
    .catch(err => console.log(err));
}

async function deletePerson(pid) {
    database.query("DELETE FROM Person WHERE pid = ?", [pid]);
}




module.exports = {
    findPersonByPid,
    findPersonByUsername,
    findPersonByEmail,
    addPerson,
    deletePerson
}