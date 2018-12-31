'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Proyecto = require('../models/proyecto');
var Fichero = require('../models/ficheros');
//obtener un fichero
function getFichero(req, res) {
	var ficheroId = req.params.id;

	Fichero.findById(ficheroId).populate({path:'proyecto'}).exec((err,file)=>{
		if (err) {
			res.status(500).send({message: 'error en el servidor'});
		}else{
			if (!file) {
				res.status(404).send({message: 'no se encontro el fichero'});
			}else{
				res.status(200).send({file});
			}
		}
	});
}

function getFicheros(req,res){
	var ProyectoId = req.params.fichero;

	if (!ProyectoId){
		var find = Fichero.find({}).sort('nombre');
	}else{
		var find = Fichero.find({proyecto: ProyectoId}).sort('nombre');
	}
	find.populate({
		path: 'proyecto',
		populate: {
			path: 'user',
			model: 'Proyecto'
		}
	}).exec((err,ficheros)=>{
		if (err) {
			res.status(500).send({message: 'error en el servidor'});
		}else{
			if (!ficheros) {
				res.status(404).send({message: 'el fichero no existe'});
			}else{
				res.status(200).send({ficheros});
			}
		}
	});
}
function saveFichero(req,res){
	var fichero = new Fichero();

	var params = req.body;

	fichero.nombre = params.nombre;
	fichero.descripcion = params.descripcion;
	fichero.fecha = params.fecha;
	fichero.tipo = params.tipo;
	fichero.file = null;
	fichero.proyecto = params.proyecto;

	fichero.save((err,ficheroStored)=>{
		if (err) {
			res.status(500).send({message: 'error en el servidor'});
		}else{
			if (!ficheroStored) {
				res.status(404).send({message: 'no se ha podido guardar el archivo'});
			}else{
				res.status(200).send({fichero: ficheroStored});
			}
		}
	});

}
function updateFichero(req,res){
	var ficheroId = req.params.id;
	var update = req.body;

	Fichero.findByIdAndUpdate(ficheroId, update,(err,ficheroUpdated)=>{
		if (err) {
			res.status(500).send({message: 'error en el servidor'});
		}else{
			if (!ficheroUpdated) {
				res.status(404).send({message: 'no se encontro el fichero'});
			}else{
				res.status(200).send({fichero: ficheroUpdated});
			}
		}
	});
}

function deleteFichero(req,res){
	var ficheroId = req.params.id;

	Fichero.findByIdAndRemove(ficheroId,(err,ficheroDelete)=>{
		if (err){
			res.status(500).send({message: 'error en el servidor'});
		}else{
			if (!ficheroDelete) {
				res.status(404).send({message: 'no se encontro el fichero'});
			}else{
				res.status(200).send({fichero: ficheroDelete});
			}
		}
	});
}

function uploadFile(req,res){
	var ficheroId = req.params.id;
	var file_name = "No subido...";

	if(req.files){
		var file_path = req.files.file.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_path.split('\.');
		var file_ext = ext_split[1];

		Fichero.findByIdAndUpdate(ficheroId, {file: file_name}, (err, ficheroUpdated)=>{
			if (!ficheroUpdated) {
				res.status(404).send({message: 'No se ha podido actualizar el usuario'});
			}else{
				res.status(200).send({fichero: ficheroUpdated});
			}
		});
	}else{
		res.status(200).send({message: 'no se ha subido el archivo'});
	}
}
function getFile(req, res){
	var imageFile = req.params.ficheroFile;
    var path_file = './uploads/ficheros/'+imageFile;
	fs.exists(path_file, function(exist){
		if (exist) {
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(404).send({message: 'No existe el fichero'});
		}
	});
}
module.exports ={
	getFichero,
	getFicheros,
	saveFichero,
	updateFichero,
	deleteFichero,
	uploadFile,
	getFile
};