const database = require("../database");
const {
    findPersonByPid,
    findPersonByUsername,
    findPersonByEmail,
    addPerson,
    deletePerson,
    findPersonByUsernameAccess
} = require("../models/Person");

async function findSABySpid(spid) {
    return database.query("SELECT p.pid spid, access, username, first_name, last_name, email, phone FROM Super_Admins sa INNER JOIN Person p ON sa.pid = p.pid WHERE sa.spid = ?", [spid])
    .then(([data]) => data[0])
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function findSAByUsername(username) {
    const person = await findPersonByUsernameAccess(username, 'super_admin');

    if (!person) {
        return null;
    }

    const superadmin = await 
    database.query("SELECT * FROM Super_Admins WHERE pid = ?", [person.pid])
    .then(([data]) => data[0])
    .catch(err => {
        console.log(err);
        throw err;
    })

    return {
        ...person,
        ...superadmin
    };
}

async function addSA(superAdmin) {
    const {
        username,
        password,
        first_name,
        last_name,
        phone,
        email
    } = superAdmin;

    const pid = await addPerson({
        username,
        password,
        first_name,
        last_name,
        phone,
        email,
        access: 'super_admin'
    });

    database.query("INSERT INTO Super_Admins (pid) VALUES (?)", [pid])
    .catch((err) => console.log(err));
}


module.exports = {
    findSABySpid,
    findSAByUsername,
    addSA
}