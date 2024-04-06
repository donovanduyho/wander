const express = require('express');
const router = express.Router();

const {
    findLocationByLid,
    findLocationByLname,
    findLocationByAddress,
    addLocation,
    updateLocation,
    deleteLocation
} = require('../models/Event_Location');

router.post("/addLocation", (req, res) => {
    const { lname, address } = req.body;
    const location = { lname, address };
    addLocation(location).then(() => res.status(200).json({ message: "Location successfully created"}))
    .catch(() => res.status(400).json({message: "error creating location"}));
});

router.get("/getLocationByLname", (req, res) => {
    const {lname} = req.body;
    findLocationByLname(lname).then((data) => res.status(200).json({ data }))
    .catch(() => res.status(400).json({message: "error returning lname"}));
});

router.get("/getLocationByLid", (req, res) => {
    const {lid} = req.body;
    findLocationByLid(lid).then((data) => res.status(200).json({ data }))
    .catch(() => res.status(400).json({message: "error returning lname"}));
});

router.delete("/deleteLocation", (req, res) => {
    const {lid} = req.body
    deleteLocation(lid).then(() => res.status(200).json({ message: "Location Deleted"}))
    .catch(() => res.status(400).json({ message: "Error deleting person"}));    
})

module.exports = router;