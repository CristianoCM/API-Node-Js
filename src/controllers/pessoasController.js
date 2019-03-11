
const mongoose = require('mongoose');
const Pessoas = mongoose.model('Pessoas');
const ValidationMaster = require('../validators/validatorMaster');
const ErrorMessage = require('../validators/errorMessages');
const repository = require('../repositories/pessoasRepositorio');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } 
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
}

exports.getByCargo = async(req, res, next) => {
    const cargo = req.params.cargo;

    try {
        var data = await repository.getByCargo(cargo);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
}

exports.getById = async(req, res, next) => {
    const idP = req.params.id;

    try {
        var data = await repository.getById(idP);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
}

exports.getBySobrenome = async(req, res, next) => {
    const sob = req.params.sobrenome;

    try {
        var data = await repository.getBySobrenome(sob);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
}

exports.post = async(req, res, next) => {
    let validador = new ValidationMaster();
    let errMes = new ErrorMessage();
    
    validador.isRequired(req.body.nome, errMes.getMessage("nome", "isRequired"));
    validador.isRequired(req.body.sobrenome, errMes.getMessage("sobrenome", "isRequired"));
    validador.isRequired(req.body.cargo, errMes.getMessage("cargo", "isRequired"));
    validador.isRequired(req.body.descricao, errMes.getMessage("descricao", "isRequired"));

    if (!validador.isValid()) {
        res.status(400).send(validador.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Pessoa cadastrada com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
}

exports.put = async(req, res, next) => {
    var modifications = {};

    const id = req.params.id;

    const nome = req.body.nome || null;
    const sobrenome = req.body.sobrenome || null;
    const ativo = req.body.ativo;
    const descricao = req.body.descricao || null;
    const cargo = req.body.cargo || null;

    if (nome)
        modifications.nome = nome;
    if (sobrenome)
        modifications.sobrenome = sobrenome;
    if (ativo)
        modifications.ativo = ativo;
    if (descricao)
        modifications.descricao = descricao;
    if (cargo)
        modifications.cargo = cargo;

    try {
        await repository.update(id, modifications);
        res.status(200).send({
            message: 'Pessoa atualizada com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
}

exports.delete = async(req, res, next) => {
    const id = req.body.id;

    try {
        await repository.delete(id);
        res.status(200).send({
            message: 'Pessoa deletada com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
}