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
const Round = require('./models/round');
const Gamer = require('./models/player');
const Match = require('./models/match');

// Load routes
const indexRoute = require('./routes/index');
const tournamentRoute = require('./routes/tournaments');
const roundRoute = require('./routes/rounds');
const playerRoute = require('./routes/players');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false 
}));

app.use('/', indexRoute);
app.use('/tournaments', tournamentRoute);
app.use('/rounds', roundRoute);
app.use('/players', playerRoute);
app.use('/matches', playerRoute);

module.exports = app;
