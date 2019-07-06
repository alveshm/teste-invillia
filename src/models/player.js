'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: [true, 'Nome é um campo obrigatório.'],
        trim: true
    },
    telefone: {
        type: Number,
        trim: true
    },
    cpf: {
        type: Number,
        required: [true, 'CPF é um campo obrigatório.'],
        index: true,
        unique: true
    }
});

module.exports = mongoose.model('Player', schema);