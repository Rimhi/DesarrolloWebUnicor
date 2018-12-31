'use strict'

var express = require('express');
var ProyectoCotroller = require('../controllers/proyecto');
var api = express.Router();
var md_auth = require('../middlewares/authenticated')

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/proyectos'});


api.get('/proyecto/:id', md_auth.ensureAuth, ProyectoCotroller.getProyecto);
api.get('/proyectos/:page?', md_auth.ensureAuth, ProyectoCotroller.getProyectos);
api.post('/proyecto/:id?', md_auth.ensureAuth, ProyectoCotroller.saveProyecto);
api.put('/proyecto/:id', md_auth.ensureAuth, ProyectoCotroller.updateProyecto);
api.delete('/proyecto/:id', md_auth.ensureAuth, ProyectoCotroller.deleteProyecto);
api.post('/upload-image-proyecto/:id',[md_auth.ensureAuth,md_upload],ProyectoCotroller.uploadImage);
api.get('/get-image-proyecto/:imageFile', ProyectoCotroller.getImageFile);
api.get('/result-proyecto/:nombre', md_auth.ensureAuth, ProyectoCotroller.searchProyectos);
//api.get('/my-proyectos/:id?', md_auth.ensureAuth, ProyectoCotroller.myProyectos);

module.exports = api;