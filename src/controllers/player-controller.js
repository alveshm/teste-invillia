'use strict';

const repository = require('../repositories/player-repository');

exports.post = async(req, res, next) => {

    try {
        await repository.create(req.body);
        res.status(201).send({ 
            message: 'Jogador cadastrado com sucesso!' 
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
    
}

exports.get = async(req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send({data});
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
}

exports.getByName = async(name) => {
    const data = await repository.getByName(name);
    return data;
}
