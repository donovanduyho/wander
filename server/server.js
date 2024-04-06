const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport-jwt');
const router = express.Router();

const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


app.use("/", require('./routes/routes'));

const port = 8000;
app.listen(port, () => console.log(`server is running on port ${port}`));