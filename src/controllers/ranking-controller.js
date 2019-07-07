'use strict';

const matchController = require('../controllers/match-controller');

exports.get = async(req, res, next) => {
    try {
        if (!req.body.etapa) {
            const data = await getRankTournament(req.body.torneio);
            res.status(200).send({data});
        }
        const data = await getRankRound(req.body.torneio, req.body.etapa);
        res.status(200).send({data});
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
}

async function getRankRound(torneio, etapa) {
        var matches = await matchController.getByRoundTournament(etapa, torneio);
        matches.sort(function (a, b) {
            return b.pontos - a.pontos;
        });
        var arrayOfMatches = [];
        
        var points = matches.length; 
        matches.forEach(function(match, index){
            var campo = { 
                colocação: index,
                pontuação: points,
                match
            }
            arrayOfMatches.push(campo);
            matchController.savePoints(match._id, points);
            points--;
        });
        return arrayOfMatches;  
}

async function getRankTournament(torneio) {
    var matches = await matchController.getByTournament(torneio);
    var rounds = await matchController.getRoundByTournament(torneio);
    rounds.forEach(function (round) {
        getRankRound(round.torneio, round.etapa);
    })
    return rounds[1];
    matches.sort(function (a, b) {
        return b.pontos - a.pontos;
    });
    var arrayOfMatches = [];
    var campos = {};
    matches.forEach(function(match, index){
        var points = 0;
        matches.forEach(function(cont, key){
            if (match.jogador == cont.jogador
                && cont._id != match._id) {
                points = points + cont.pontosFinal;
            }
        });
        let jogador = match.jogador;
        campos = {
            jogador: jogador,
            pontos: points
        }
        arrayOfMatches.put(campos);
    });
    return arrayOfMatches;  
}