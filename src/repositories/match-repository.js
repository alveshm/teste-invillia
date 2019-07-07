'use strict';

const mongoose = require('mongoose');
const Match = mongoose.model('Match');

exports.create = async(data) => {
    var match = new Match(data);
    await match.save();
}

exports.get = async() => {
    const res = await Match
        .find({}, 'torneio jogador etapa pontos');
    return res;
}

exports.getByRoundTournament = async(etapa, torneio) => {
    const res = await Match
        .find({
            torneio: torneio,
            etapa: etapa
        }, 'torneio jogador etapa pontos').populate('player');
    return res;
}

exports.getRoundByTournament = async(torneio) => {
    const res = await Match
        .find({
            torneio: torneio
        }, 'torneio jogador etapa pontos').distinct('etapa');
    return res;
}

exports.getByTournament = async(torneio) => {
    const res = await Match
        .find({
            torneio: torneio
        }, 'torneio jogador etapa pontos');
    return res;
}

exports.update = async(id, pontos) => {
    const res = await Match
        .findByIdAndUpdate(id, {
            $set: {
                pontosFinal: pontos
            }
        });
    return res;
}