'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create connection with mongodb
mongoose.connect('mongodb+srv://mhalves:admin@teste-invillia-erh1a.azure.mongodb.net/test?retryWrites=true&w=majority');

const app = express();
const router = express.Router();

// Load Models
const Tournament = require('./models/tournament');

// Load routes
const indexRoute = require('./routes/index');
const tournamentRoute = require('./routes/tournaments');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false 
}));

app.use('/', indexRoute);
app.use('/tournaments', tournamentRoute);

module.exports = app;
