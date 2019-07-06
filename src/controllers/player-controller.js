'use strict';

const mongoose = require('mongoose');
const Player = mongoose.model('Player');

exports.post = (req, res, next) => {
    var player = new Player(req.body);
    player.save().then(data => {
        res.status(201).send({ 
            message: 'Jogador cadastrada com sucesso!' 
        });
        player.save();
    }).catch(e => {
        res.status(400).send({ 
            message: 'Falha ao cadastrar jogador!',
            data: e 
        });
    });
    
}

exports.get = (req, res, next) => {
    player.find({}, 'nome telefone').then(data => {
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