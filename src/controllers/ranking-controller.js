'use strict';

const matchController = require('../controllers/match-controller');
const roundController = require('../controllers/round-controller');

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
    rounds.forEach(async function (round) {
        var etapa = await roundController.getTitle(round);
        await getRankRound(torneio, etapa.titulo);
    });
    matches.sort(function (a, b) {
        return b.pontos - a.pontos;
    });
    var arrayOfMatches = [];
    var campos = {};
    for (var i in matches){
        var points = matches[i].pontosFinal;
        for (var k in matches){
            if (matches[i].jogador == matches[k].jogador && matches[i]._id != matches[k]) {
                points += matches[k].pontosFinal;
                arrayOfMatches.push(i)
            }
        }
        var jogador = matches[i].jogador;
        campos = {
            jogador: jogador,
            pontos: points
        }
        arrayOfMatches.push(campos);
    }
    return arrayOfMatches;  
}