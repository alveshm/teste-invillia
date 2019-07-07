'use strict';

const mongoose = require('mongoose');
const Player = mongoose.model('Player');

exports.create = async(data) => {
    var player = new Player(data);
    await player.save();
}

exports.get = async() => {
    const res = await Player
        .find({}, 'nome telefone etapa pontos');
    return res;
}

exports.getByName = async(name) => {
    const res = await Player
        .findOne({nome: name}, 'nome telefone etapa pontos');
    return res;
}