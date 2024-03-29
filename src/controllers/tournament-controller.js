'use strict';

const ValidationInput = require('../validators/input-validator');
const repository = require('../repositories/tournament-repository');

exports.post = async(req, res, next) => {
    let validator = new ValidationInput();

    validator.hasMinLen(req.body.titulo, 5, 'O título deve ter no minímo 5 letras.');
    validator.hasMinLen(req.body.descricao, 10, 'A descrição deve ter no minímo 10 letras.');
    validator.hasMinLen(req.body.slug, 6, 'O slug deve ter no minímo 6 letras.');

    if (!validator.isValid()) {
        res.status(400).send(validator.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({ 
            message: 'Torneio cadastrado com sucesso!' 
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

exports.getByTitle = async(title) => {
    const data = await repository.getByTitle(title);
    return data;
}

exports.put = async(req, res, next) => {
    try {
        var data = await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Torneio atualizado com sucesso.',
            error: data
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao atualizar torneio.'
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Torneio deletado com sucesso.'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao deletar torneio.'
        });
    }
        
};