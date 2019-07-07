'use strict';

const repository = require('../repositories/match-repository');
const roundController = require('../controllers/round-controller');
const tournamentController = require('../controllers/tournament-controller');
const playerController = require('../controllers/player-controller');

exports.post = async(req, res, next) => {
    req.body.torneio = await verifyTournament(req.body.torneio);
    req.body.etapa = await verifyRound(req.body.etapa);
    req.body.jogador = await verifyPlayer(req.body.jogador);
    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Torneio cadastrado com sucesso!' 
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar requisição.',
            error
        });
    }
    
}

async function verifyTournament(tournamentTitle) {
    var data = await tournamentController.getByTitle(tournamentTitle);
    if (data.length == 0) {
        return false;
    } else {
        return data._id;
    }
}

async function verifyRound(roundTitle) {
    var data = await roundController.getByTitle(roundTitle);
    if (data.length == 0) {
        return false;
    } else {
        return data;
    }  
}

async function verifyPlayer(playerName) {
    var data = await playerController.getByName(playerName);
    if (data.length == 0) {
        return false;
    } else {
        return data._id;
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

exports.getByRoundTournament = async(round, tournament) => {
        tournament = await verifyTournament(tournament);
        round = await verifyRound(round);
        
        var data = await repository.getByRoundTournament(round, tournament);
        return data;
}

exports.getRoundByTournament = async(tournament) => {
    tournament = await verifyTournament(tournament);
    
    var data = await repository.getRoundByTournament(tournament);
    return data;
}

exports.getByTournament = async(tournament) => {
    tournament = await verifyTournament(tournament);
    
    var data = await repository.getByTournament(tournament);
    return data;
}

exports.savePoints = async(id, pontos) => {
    try {
        await repository.update(id, pontos);
        return;
    } catch (error) {
        
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