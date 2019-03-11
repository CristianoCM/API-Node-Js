'use strict'

const ValidationMaster = require('../validators/validatorMaster');
const ErrorMessage = require('../validators/errorMessages');
const repository = require('../repositories/tipoUsuarioRepositorio');

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

exports.getById = async(req, res, next) => {
    const id = req.params.id;

    try {
        var data = await repository.getById(id);
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
    
    validador.isRequired(req.body.tipo, errMes.getMessage("tipo", "isRequired"));

    if (!validador.isValid()) {
        res.status(400).send(validador.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Tipo de Usuário cadastrado com sucesso!'
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

    const tipo = req.body.tipo || null;

    if (tipo)
        modifications.tipo = tipo;

    try {
        await repository.update(id, modifications);
        res.status(200).send({
            message: 'Tipo de Usuário atualizado com sucesso!'
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
            message: 'Tipo de Usuário deletado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
}