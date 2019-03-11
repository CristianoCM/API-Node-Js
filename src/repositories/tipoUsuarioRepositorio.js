'use strict';

const mongoose = require('mongoose');
const TipoUsuario = mongoose.model('TipoUsuario');

exports.get = async() => {
    const res = await TipoUsuario.find({}, 'tipo');
    return res;
}

exports.getById = async(id) => {
    const res = await TipoUsuario.findById(id, 
        'tipo');
    return res;
}

exports.create = async(data) => {
    var tp = new TipoUsuario(data);
    await tp.save();
}

exports.update = async(id, modifications) => {
    await TipoUsuario.findByIdAndUpdate(id, 
        { $set: modifications },
        { new: true }
    );
}

exports.delete = async(id) => {
    await TipoUsuario.findByIdAndDelete(id);
}