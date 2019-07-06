'use strict';

const mongoose = require('mongoose');
const Match = mongoose.model('match');

exports.create = async(data) => {
    var match = new Match(data);
    await match.save();
}

exports.get = async() => {
    const res = await Match
        .find({}, 'torneio jogador etapa pontos');
    return res;
}