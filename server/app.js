const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.urlencoded());
app.use(bodyParser.json());

app.use(cors());

// ROUTES

const userRoute = require('./api/routes/user');
app.use('/Usuario', userRoute);


module.exports = app;