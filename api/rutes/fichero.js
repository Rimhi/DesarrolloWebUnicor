'use strict'

var express = require('express');
var FicheroCotroller = require('../controllers/fichero');
var api = express.Router();
var md_auth = require('../middlewares/authenticated')

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/ficheros'});


api.get('/fichero/:id', md_auth.ensureAuth, FicheroCotroller.getFichero);
api.post('/fichero/:id?', md_auth.ensureAuth, FicheroCotroller.saveFichero);
api.get('/ficheros/:fichero?',md_auth.ensureAuth,FicheroCotroller.getFicheros);
api.put('/fichero/:id',md_auth.ensureAuth,FicheroCotroller.updateFichero);
api.delete('/fichero/:id', md_auth.ensureAuth, FicheroCotroller.deleteFichero);
api.post('/upload-file-fichero/:id',[md_auth.ensureAuth,md_upload],FicheroCotroller.uploadFile);
api.get('/get-file-proyecto/:ficheroFile', FicheroCotroller.getFile);
module.exports = api;