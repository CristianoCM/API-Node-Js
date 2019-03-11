
const mongoose = require('mongoose');
const Pessoas = mongoose.model('Pessoas');
const ValidationMaster = require('../validators/validatorMaster');
const ErrorMessage = require('../validators/errorMessages');
const repository = require('../repositories/pessoasRepositorio');

exports.get = (req, res, next) => {
    repository.get()
    .then(pess => {
        res.status(200).send(pess);
    })
    .catch(e => {
        res.status(400).send(e);
    });
}

exports.getByCargo = (req, res, next) => {
    const cargo = req.params.cargo;
    repository.getByCargo(cargo)
    .then(pess => {
        res.status(200).send(pess);
    })
    .catch(e => {
        res.status(400).send(e);
    });
}

exports.getById = (req, res, next) => {
    const idP = req.params.id;
    repository.getById(idP)
    .then(pess => {
        res.status(200).send(pess);
    })
    .catch(e => {
        res.status(400).send(e);
    });
}

exports.getBySobrenome = (req, res, next) => {
    const sob = req.params.sobrenome;
    repository.getBySobrenome(sob)
    .then(pess => {
        res.status(200).send(pess);
    })
    .catch(e => {
        res.status(400).send(e);
    });
}

exports.post = (req, res, next) => {
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

    repository.create(req.body)
    .then(x => {
        res.status(201).send({ 
            message: 'Pessoa cadastrada com sucesso!'   
         });
    })
    .catch(e => {
        res.status(400).send({ 
            message: 'Falha ao cadastrar Pessoa',
            data: e
         });
    });
}

exports.put = (req, res, next) => {
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

    repository.update(id, modifications)
    .then(x => {
        res.status(200).send({
            message: 'Pessoa atualizada com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao atualizar Pessoa.',
            data: e
        });
    });
}

exports.delete = (req, res, next) => {
    const id = req.body.id;

    repository.delete(id)
    .then(x => {
        res.status(200).send({
            message: 'Pessoa deletada com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao deletar Pessoa.',
            data: e
        });
    });
}