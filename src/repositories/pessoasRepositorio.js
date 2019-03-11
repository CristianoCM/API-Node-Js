'use strict';

const mongoose = require('mongoose');
const Pessoas = mongoose.model('Pessoas');

exports.get = async() => {
    const res = await Pessoas.find({
        ativo: true
    }, 'nome sobrenome cargo descricao');
    return res;
}

exports.getByCargo = async(cargo) => {
    const res = await Pessoas.findOne({
        cargo: cargo,
        ativo: true
    }, 'nome sobrenome cargo descricao');
    return res;
}

exports.getById = async(idP) => {
    const res = await Pessoas.findById(idP, 
        'nome sobrenome cargo descricao');
    return res;
}

exports.getBySobrenome = async(sob) => {
    const res = await Pessoas.find({
        sobrenome: sob,
        ativo: true
    }, 'nome sobrenome cargo descricao');
    return res;
}

exports.create = async(data) => {
    var pessoa = new Pessoas(data);
    await pessoa.save();
}

exports.update = async(id, modifications) => {
    await Pessoas.findByIdAndUpdate(id, 
        { $set: modifications },
        { new: true }
    );
}

exports.delete = async(id) => {
    await Pessoas.findByIdAndDelete(id);
}