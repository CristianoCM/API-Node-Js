// Carregando dependências
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Instanciando express
const app = express();

// Conexão com o Database
mongoose.connect('mongodb+srv://cris:AxtksCkmoGlKJHur@primeironode-xizxt.azure.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true });

// Carregando Models
const Pessoas = require('./models/pessoasModel');

// Carregando Rotas
const indexRoutes = require('./routes/index');
const pessoasRoutes = require('./routes/pessoas');

// Usando BodyParser na aplicação
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Usando rotas na aplicação
app.use('/', indexRoutes);
app.use('/pessoas', pessoasRoutes);

// Exportando aplicação
module.exports = app;