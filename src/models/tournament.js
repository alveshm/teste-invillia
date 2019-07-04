'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'Slug é um campo obrigatório.'],
        trim: true,
        index: true,
        unique: true
    },
    descricao: {
        type: String,
        required: [true, 'Descrição é um campo obrigatório.']
    }
});

module.exports = mongoose.model('Tournament', schema);