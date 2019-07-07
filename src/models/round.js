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
        trim: true,
        index: true,
        unique: true
    },
    descricao: {
        type: String
    }
});

module.exports = mongoose.model('Round', schema);