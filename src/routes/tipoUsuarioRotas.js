'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/tipoUsuarioController');
const auth = require('../utils/auth');

router.get('/', auth.authorize, controller.get);
router.get('/admin/:id', auth.authorize, controller.getById);
router.post('/', auth.authorize, controller.post);
router.put('/:id', auth.authorize, controller.put);
router.delete('/', auth.authorize, controller.delete);

module.exports = router;