// Carregando dependências
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

// Instanciando express
const app = express();

// Conexão com o Database
mongoose.connect(config.connectionString, { useNewUrlParser: true });

// Carregando Models
const Pessoas = require('./models/pessoasModel');
const Usuarios = require('./models/usuarioModel');
const TipoUsuarios = require('./models/tipoUsuarioModel');

// Carregando Rotas
const indexRoutes = require('./routes/index');
const pessoasRoutes = require('./routes/pessoas');
const usuariosRoutes = require('./routes/usuarioRotas');
const tipoUsuariosRoutes = require('./routes/tipoUsuarioRotas');

// Usando BodyParser na aplicação
app.use(bodyParser.json({ limit: '3mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

// Habilitando CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET POST PUT DELETE OPTIONS');
    next();
});

// Usando rotas na aplicação
app.use('/', indexRoutes);
app.use('/pessoas', pessoasRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/tipoUsuarios', tipoUsuariosRoutes);

// Exportando aplicação
module.exports = app;