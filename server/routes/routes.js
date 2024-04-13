
const express = require('express');
const router = express.Router();
const multer = require('multer');

router.use("/person", require('./personRoutes'));
router.use("/location", require('./location_route'));
router.use("/universities", require('./universities_routes'));
router.use("/superadmin", require('./super_admins_router'));
router.use("/admins", require("./admins_routes"));
router.use("/events", require('./events_route'));
router.use("/user", require('./login_router'));
router.use('/test', require('./test_router'));
router.use("/rso", require('./RSO_route'));
router.use("/comment", require('./comments_route'));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../client/public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
})

module.exports = router;