'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    torneio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tournament'
    },
    etapa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'round'
    },
    jogador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player'
    },
    pontos: {
        type: Number,
        required: [true, 'Pontos é um campo obrigatório.']
    },
    pontosFinal: {
        type: Number
    }
});

module.exports = mongoose.model('Match', schema);