'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // Id é criado automaticamente
    tipo: {
        type: String,
        required: true
    },
    dataCadastro: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('TipoUsuario', schema)