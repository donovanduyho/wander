const database = require('../database');
const axios = require('axios');

async function findLocationByLid(lid) {
    return database.query("SELECT * FROM Event_Location WHERE lid = ?", [lid])
    .then(([row]) => row[0])
    .catch(err => {console.log("Location lid: ", err);
    throw err;
    })
}

async function findLocationByLname(lname) {
    return database.query("SELECT * FROM Event_Location WHERE lname = ?", [lname])
    .then(([row]) => row[0])
    .catch(err => {console.log(err);
    throw err;
    })
}

async function findLocationByAddress(address) {
    return database.query("SELECT * FROM Event_Location WHERE address LIKE ?", [ '%' + address + '%'])
    .then(([row]) => row[0])
    .catch(err => {console.log(err);
    throw err;
    })
}


async function addLocation(lname, address) {
    const { lat, lng } = await coordinates(address);
    return database.query("INSERT INTO Event_Location (lname, address, longitude, latitude) VALUES (?,?,?,?)", [lname, address, lng, lat])
    .then(() => findLocationByLid(lname))
    .catch(err => { console.log(err);
        throw err});
}

async function updateLocation(location) {
    const {lid, lname, address} = location;
    database.query("UPDATE Event_Location SET lname = ?, address = ? WHERE lid = ?", [lname, address, lid])
}

async function deleteLocation (lid) {
    database.query("DELETE FROM Event_Location WHERE lid = ?", [lid]).catch((err) => console.log(err));
}


async function coordinates(address) {    
    const coordinate = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=' + process.env.GOOGLE_API)
    .then(res => {
        if (res.status == 200 && res.data.results.length > 0) 
            return res.data.results[0].geometry.location;
    }).catch(err => {
        //console.log(err);
        throw err;
    })
    return coordinate;
    }


module.exports = {
    findLocationByLid,
    findLocationByLname,
    findLocationByAddress,
    addLocation,
    updateLocation,
    deleteLocation
};


