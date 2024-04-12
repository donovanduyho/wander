const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const path = require("path");
const router = express.Router();
const multer = require("multer");

const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(passport.initialize());
require("./controllers/jwt")(passport);

app.use("/", require("./routes/routes"));

const port = 8000;
app.listen(port, () => console.log(`server is running on port ${port}`));
