'use strict';

const mongoose = require('mongoose');
const Round = mongoose.model('Round');

exports.create = async(data) => {
    var round = new Round(data);
    await round.save();
}

exports.get = async() => {
    const res = await Round
        .find({}, 'titulo descricao slug');
    return res;
}

exports.getByTitle = async() => {
    const res = await Round
        .find({titulo: title}, 'titulo descricao slug');
    return res;
}