'use strict';

const ValidationInput = require('../validators/input-validator');
const repository = require('../repositories/round-repository');

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
            message: 'Etapa cadastrada com sucesso!' 
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao cadastar etapa.',
            error: error
        });
    }
}

exports.get = async(req, res, next) => {
    try {
        const data = await repository.find({}, 'titulo descricao slug');
        res.status(200).send({data});
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao retornar etapas.'
        });
    }
}

exports.getByTitle = async(title) => {
    const data = await repository.getByTitle(title);
    return data;
}

exports.getTitle = async(id) => {
    const data = await repository.getTitle(id);
    return data;
}