'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/pessoasController');

router.get('/', controller.get);
router.get('/:cargo', controller.getByCargo);
router.get('/admin/:id', controller.getById);
router.get('/sobrenome/:sobrenome', controller.getBySobrenome);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;