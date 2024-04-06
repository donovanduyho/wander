
const express = require('express');
const router = express.Router();



router.use("/person", require('./personRoutes'));
router.use("/location", require('./location_route'));
router.use("/universities", require('./universities_routes'));



module.exports = router;