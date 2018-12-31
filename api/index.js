'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;
var connection = mongoose.connect('mongodb://localhost:27017/proyecto',(err,res)=>{
	if(err){
		throw err;
	}else{
		console.log("la base de datos esta corriendo perfectamente ...");
		app.listen(port, function() {
			console.log("Servidor escuchando en http://localhost:"+port);
		})
	}
});
