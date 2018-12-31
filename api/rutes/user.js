'use strict'

var express = require('express');
var UserCotroller = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated')

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});

api.get('/prueba', md_auth.ensureAuth, UserCotroller.pruebas);
api.post('/registro', UserCotroller.saveUser);
api.post('/login', UserCotroller.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserCotroller.updateUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth,md_upload], UserCotroller.uploadImage);
api.get('/get-image-user/:imageFile', UserCotroller.getImageFile);

module.exports = api;