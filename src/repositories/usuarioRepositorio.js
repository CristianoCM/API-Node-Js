'use strict';

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

exports.get = async() => {
    const res = await Usuario
        .find({}, 'email nome tipo image')
        .populate('tipo', "tipo");
    return res;
}

exports.getById = async(id) => {
    const res = await Usuario.findById(id, 
        'email nome tipo image');
    return res;
}

exports.create = async(data) => {
    var usu = new Usuario(data);
    await usu.save();
}

exports.update = async(id, modifications) => {
    await Usuario.findByIdAndUpdate(id, 
        { $set: modifications },
        { new: true }
    );
}

exports.delete = async(id) => {
    await Usuario.findByIdAndDelete(id);
}

exports.authenticate = async(data) => {
    const res = await Usuario
        .findOne({
            email: data.email,
            password: data.password
        });
    return res;
}