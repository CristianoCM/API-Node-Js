'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController');
const auth = require('../utils/auth');

const guid = require('guid');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, guid.raw().toString() + file.mimetype.substring(5, file.mimetype.length).replace("/", "."));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif')
        cb(null, true);
    else
        cb(null, false);
};

const upload = multer({ 
    storage: storage, 
    limits: { 
        fileSize: 1024 * 1024 * 1
    },
    fileFilter: fileFilter
});

router.get('/', auth.authorize, controller.get);
router.get('/admin/:id', controller.getById);
router.post('/', upload.single('image'), controller.post);
router.put('/:id', upload.single('image'), controller.put);
router.delete('/', controller.delete);
router.post('/authenticate', controller.authenticate);

module.exports = router;