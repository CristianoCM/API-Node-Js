'use strict'

const ValidationMaster = require('../validators/validatorMaster');
const ErrorMessage = require('../validators/errorMessages');
const repository = require('../repositories/usuarioRepositorio');
const md5 = require('md5');
const emailservice = require('../utils/email-service');
const config = require('../config');

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

    req.body.image = req.file.path.split("\\") || "";
    if (req.body.image != "") {
        var sepImg = req.file.path.split("\\");
        var sepImgSiz = sepImg.length;
        req.body.image  = sepImg[sepImgSiz - 1];
    }

    validador.isRequired(req.body.email, errMes.getMessage("email", "isRequired"));
    validador.isRequired(req.body.nome, errMes.getMessage("nome", "isRequired"));
    validador.isRequired(req.body.password, errMes.getMessage("password", "isRequired"));
    validador.isRequired(req.body.tipo, errMes.getMessage("tipo", "isRequired"));
    validador.isRequired(req.body.image, errMes.getMessage("image", "isRequired"));

    validador.isEmail(req.body.email, errMes.getMessage("email", "isEmail"));

    if (!validador.isValid()) {
        res.status(400).send(validador.errors()).end();
        return;
    }

    try {
        // Preparando Img de Base 64
        //let filename = guid.raw().toString() + ".jpg";
        //let rawdata = req.body.image;
        //let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        //let type = matches[1];
        //let buffer = new Buffer(matches[2], 'base64');

        await repository.create({
            nome: req.body.nome,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            tipo: req.body.tipo,
            image: req.body.image
        });

        emailservice.send(
            req.body.email, 
            'Bem-vindo a API teste do Cristiano!', 
            global.EMAIL_TMPL.replace('{0}', req.body.nome)
        );

        res.status(201).send({
            message: 'Usuário cadastrado com sucesso!'
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

    const email = req.body.email || null;
    const password = req.body.password || null;
    const nome = req.body.nome || null;
    const tipo = req.body.tipo || null;
    const image = req.body.image || null;

    if (email)
        modifications.email = email;
    if (password)
        modifications.password = password;
    if (nome)
        modifications.nome = nome;
    if (tipo)
        modifications.tipo = tipo;
    if (image)
        modifications.image = image;

    try {
        await repository.update(id, modifications);
        res.status(200).send({
            message: 'Usuário atualizado com sucesso!'
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
            message: 'Usuário deletado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
}