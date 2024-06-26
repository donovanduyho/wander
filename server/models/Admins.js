const database = require("../database");
const { findUniByName, findUniByUid } = require("./Universities");

async function findAdminByAid(aid) {
    return database.query("SELECT * FROM Admins WHERE aid = ?", [aid])
    .then(([data]) => data[0])
    .catch((err) => {
        console.log(err);
        throw err;
    })
};

async function findAdminByUsername(username) {
    const person = await findPersonByUsername(username);

    if (!person) {
        return null;
    }

    const admin = await 
    database.query("SELECT * FROM Admins WHERE pid = ?", [person.pid])
    .then(([data]) => data[0])
    .catch(err => {
        console.log(err);
        throw err;
    })

    return {
        ...person,
        ...admin
    };
}

async function findAdminByPid(pid) {
    return database.query("SELECT * FROM Admins WHERE pid = ?", [pid])
    .then(([data]) => data[0])
    .catch((err) => {
        console.log(err);
        throw err;
    });
}

async function addAdmin(admin) {
    const { pid, uid } = admin;
    const university = await findUniByUid(uid);
    const spid = university.spid;

    return database.query("INSERT INTO Admins (pid, spid) VALUES (?, ?)", [pid, spid])
    .then(() => findAdminByPid(pid))
    .then((data) => data.aid)
    .catch((err) => {
        console.log(err)
        throw err;
    })
}

module.exports = {
    findAdminByAid,
    findAdminByUsername,
    addAdmin,
    findAdminByPid
}
