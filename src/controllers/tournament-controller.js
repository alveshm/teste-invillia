'use strict';

const mongoose = require('mongoose');
const Tournament = mongoose.model('Tournament');

exports.post = (req, res, next) => {
    var tournament = new Tournament(req.body);
    tournament.save().then(data => {
        res.status(201).send({ 
            message: 'Torneio cadastrado com sucesso!' 
        });
        tournament.save();
    }).catch(e => {
        res.status(400).send({ 
            message: 'Falha ao cadastrar torneio!',
            data: e 
        });
    });
    
}

exports.get = (req, res, next) => {
    Tournament.find({}, 'titulo descricao slug').then(data => {
        res.status(200).send({data});
    }).catch(e => {
        res.status(400).send({e});
    });
}

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};