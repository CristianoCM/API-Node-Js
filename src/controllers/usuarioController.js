'use strict'

const ValidationMaster = require('../validators/validatorMaster');
const ErrorMessage = require('../validators/errorMessages');
const repository = require('../repositories/usuarioRepositorio');
const md5 = require('md5');
const emailservice = require('../utils/email-service');
const config = require('../config');
const auth = require('../utils/auth');

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

    // Verificando se Usuário está trocando suas próprias informações
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const decoT = await auth.decodeToken(token);

    if (decoT.id != id) {
        res.status(403).send({
            message: 'Requisição negada.'
        });
        return;
    }

    const email = req.body.email || null;
    const password = req.body.password || null;
    const nome = req.body.nome || null;
    const tipo = req.body.tipo || null;
    const image = req.file;
    var imageRes = null;

    if (image) {
        var imageSp = image.path.split("\\") || "";

        if (imageSp != "") {
            var sepImgSiz = imageSp.length;
            imageRes = imageSp[sepImgSiz - 1];

            // Deletar imagem anterior
            var usuAnt = await repository.getById(id);

            var imgAnt = usuAnt.image;
            var pathSpl = req.file.path.split("\\");
            var pathSli = pathSpl.slice(0, pathSpl.length - 1);
            var pathRoot = pathSli.join().replace(",", "\\").concat("\\");
            var pathImgAnt = pathRoot + imgAnt;

            const fs = require('fs');
            fs.unlink(pathImgAnt);
        }
    }

    if (email)
        modifications.email = email;
    if (password)
        modifications.password = password;
    if (nome)
        modifications.nome = nome;
    if (tipo)
        modifications.tipo = tipo;
    if (imageRes)
        modifications.image = imageRes;

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

exports.authenticate = async(req, res, next) => {
    try {
        const login = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!login) {
            res.status(404).send({
                message: "Usuário e/ou senha inválido(s)"
            });
            return;
        }

        const token = await auth.generateToken({ 
            email: login.email, 
            nome: login.nome,
            id: login._id,
            tipo: login.tipo
        });

        res.status(201).send({
            token,
            data: {
                email: login.email,
                nome: login.nome,
                id: login._id,
                tipo: login.tipo
            }
        });
    } 
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
}

exports.refreshToken = async(req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await auth.decodeToken(token);

        const usu = await repository.getById(data.id);

        if (!usu) {
            res.status(404).send({
                message: 'Usuário inválido ou inexistente'
            });
            return;
        }

        const rToken = await auth.generateToken({
            email: usu.email,
            nome: usu.nome,
            id: usu._id,
            tipo: login.tipo
        });

        res.status(201).send({
            token: token,
            data: {
                email: usu.email,
                nome: usu.nome,
                id: usu._id,
                tipo: login.tipo
            }
        });
    } 
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
}