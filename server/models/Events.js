const database = require('../database');

const {
    findLocationByLid,
    findLocationByLname,
    findLocationByAddress,
    addLocation,
    updateLocation,
    deleteLocation
} = require('../models/Event_Location');

async function findEventByEid(eid) {
    return database.query("SELECT * FROM Events WHERE eid = ?", [eid])
    .then(([data]) => data[0])
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function findEventByName(name) {
    return database.query("SELECT * FROM Events WHERE name = ?", [name])
    .then(([data]) => data[0])
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

async function addEvent(event) {
    const {
        name,
        lname,
        address,
        time,
        category,
        description,
    } = event

    await findLocationByLname(lname)
    .then((result) => {
        if (!result)
            return addLocation({lname, address});
    })
    .then(() => 'location added')
    .catch((err) => {
        console.log(err);
        throw err;
    })

        return database.query("INSERT INTO Events (name, event_location, time, category, description) VALUES (?,?,?,?,?)", [name, lname, time, category, description])
        .then(([result]) => result.insertId)
        .catch((err) => {
            console.log(err);
            throw err;
        })
}

module.exports = {
    findEventByEid,
    findEventByName,
    addEvent
}