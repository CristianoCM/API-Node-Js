'use strict';

const mongoose = require('mongoose');
const Pessoas = mongoose.model('Pessoas');

exports.get = () => {
    return Pessoas.find({
        ativo: true
    }, 'nome sobrenome cargo descricao');
}

exports.getByCargo = (cargo) => {
    return Pessoas.findOne({
        cargo: cargo,
        ativo: true
    }, 'nome sobrenome cargo descricao');
}

exports.getById = (idP) => {
    return Pessoas.findById(idP, 
        'nome sobrenome cargo descricao');
}

exports.getBySobrenome = (sob) => {
    return Pessoas.find({
        sobrenome: sob,
        ativo: true
    }, 'nome sobrenome cargo descricao');
}

exports.create = (data) => {
    var pessoa = new Pessoas(data);
    return pessoa.save();
}

exports.update = (id, modifications) => {
    return Pessoas.findByIdAndUpdate(id, 
        { $set: modifications },
        { new: true }
    );
}

exports.delete = (id) => {
    return Pessoas.findByIdAndDelete(id);
}