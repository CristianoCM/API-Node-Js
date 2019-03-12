'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // Id é criado automaticamente
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true 
    },
    tipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TipoUsuario'
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    dataCadastro: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Usuario', schema)