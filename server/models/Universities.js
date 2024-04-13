const database = require('../database');
const {    
    findLocationByLid,
    findLocationByLname,
    findLocationByAddress,
    addLocation,
    updateLocation,
    deleteLocation } = require("./Event_Location")

async function findUniByUid(uid) {
    return database.query("SELECT * FROM Universities u INNER JOIN Event_Location l ON u.location = l.lname WHERE uid = ?", [uid])
    .then(([data]) => data[0])
    .catch(err => {
        console.log('university file', err);
        throw err;
    });
}

async function findUniNameList() {
    return database.query("SELECT name FROM Universities")
    .then(([data]) => data.map(uni => uni.name))
    .catch(err => {
        console.log(err);
        throw err;
    });
}

async function findUniBySpid(spid) {
    return database.query("SELECT * FROM Universities WHERE spid = ?", [spid])
    .then(([data]) => data)
    .catch(err => {
        console.log(err);
        throw err;
    })
}

async function findUniByName(name) {
    return database.query("SELECT * FROM Universities u INNER JOIN Event_Location l ON u.location = l.lname WHERE name = ?", [name])
    .then(([rows]) => rows[0])
    .catch(err => {
        console.log(err);
        throw err;
    })
}

async function addUni(university) {
    const {
        spid,
        name, 
        description,
        student_count,
        picture,
        lname,
        address
    } = university;
    // this is where everything is getting fucked
    
    await findLocationByLname(lname).then(async data => {
        if (data == undefined) {
            await addLocation(lname, address);
        }
    });
    

    return database.query("INSERT INTO Universities (spid, name, description, student_count, picture, location) VALUES (?,?,?,?,?,?)", [spid, name, description, student_count, picture, lname])
    .then(([result]) => result.insertId)
    .catch(err => {
        console.log(err);
        throw err;
    })
}

async function searchForUni(name) {
    return database.query("SELECT * FROM Universities u INNER JOIN Event_Location l ON u.location = l.lname WHERE name = ?", [name])
    .then(([rows]) => rows[0].uid)
    .catch(err => {
        console.log(err);
        throw err;
    })
}



module.exports = {
    findUniByUid,
    findUniNameList,
    findUniBySpid,
    addUni,
    findUniByName,
    searchForUni
}

