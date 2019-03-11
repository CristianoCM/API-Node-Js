'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // Id é criado automaticamente
    nome: {
        type: String,
        required: true
    },
    sobrenome: [{
        type: String,
        required: true
    }],
    ativo: {
        type: Boolean,
        required: true,
        default: true
    },
    descricao: {
        type: String,
        required: [true, 'O campo Descrição é obrigatório.']
    },
    cargo: {
        type: String,
        required: [true, 'O campo Cargo é obrigatório.']
    },
    dataCadastro: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Pessoas', schema)