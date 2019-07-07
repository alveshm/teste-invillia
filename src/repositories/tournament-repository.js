'use strict';

const mongoose = require('mongoose');
const Tournament = mongoose.model('Tournament');

exports.create = async(data) => {
    var tournament = new Tournament(data);
    await tournament.save();
}

exports.get = async() => {                                                                                                                                                                                         
    const res = await Tournament
        .find({}, 'titulo descricao slug');
    return res;
}

exports.getByTitle = async(slug) => {
    const res = await Tournament.findOne({slug: slug}, 'titulo descricao slug');
    return res;
}

exports.update = async(id, data) => {
    const res = await Tournament
        .findByIdAndUpdate(id, {
            $set: {
                titulo: data.titulo,
                descricao: data.descricao,
                slug: data.slug
            }
        });
    return res;
}

exports.delete = async(data) => {
    const res = await Tournament
        .findOneAndDelete(data.id);
    return res;
}