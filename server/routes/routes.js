
const express = require('express');
const router = express.Router();

router.use("/person", require('./personRoutes'));
router.use("/location", require('./location_route'));
router.use("/universities", require('./universities_routes'));
router.use("/superadmin", require('./super_admins_router'));
router.use("/admins", require("./admins_routes"))
router.use("/events", require('./events_route'))
router.use("/user", require('./login_router'))
router.use('/test', require('./test_router'));

module.exports = router;