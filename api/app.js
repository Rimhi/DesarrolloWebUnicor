'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var user_routes = require('./rutes/user');
var proyecto_routes = require('./rutes/proyecto');
var fichero_routes= require('./rutes/fichero');

app.use(bodyParser.urlencoded({limit: '5mb',
parameterLimit: 100000,
extended: false}));
app.use(bodyParser.json());

// configuramos las cabeceras http

app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, content-type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE, PATCH');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');

	next();
});

// cargamos rutas bases
app.use('/api', user_routes);
app.use('/api', proyecto_routes);
app.use('/api', fichero_routes);

module.exports = app;