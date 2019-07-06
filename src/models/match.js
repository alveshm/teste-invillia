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
        ref: 'rounds'
    },
    jogador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gamer'
    },
    pontos: {
        type: Number,
        required: [true, 'Pontos é um campo obrigatório.']
    }
});

module.exports = mongoose.model('Match', schema);