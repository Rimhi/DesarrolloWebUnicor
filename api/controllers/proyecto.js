'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Proyecto = require('../models/proyecto');
var Fichero = require('../models/ficheros');
var User = require('../models/user');
//obtener un proyecto
function getProyecto(req, res) {
	var proyectoId = req.params.id;

	Proyecto.findById(proyectoId).populate({path: 'user'}).exec((err,proyecto)=>{
		if (err) {
			res.status(500).send({message: 'error en la peticion'});
		}else{
			if (!proyecto) {
				res.status(404).send({message: 'el proyecto no existe'});
			}else{
				res.status(200).send({proyecto});
			}
		}
	});
	
}
function searchProyectos(req,res){
	var proyectoNombre = req.params.nombre;
	if (req.params.page) {
		var page = req.params.page;
	}else{
		var page = 1;
	}
	
	var itemsPerPage = 4;
	Proyecto.find().where('nombre').equals(proyectoNombre).sort('fecha').paginate(page,itemsPerPage, function(err, proyectos, total){
		if (err) {
			res.status(500).send({message: 'error en la peticion'});
		}else{
			if (!proyectos) {
				res.status(404).send({message: 'no hay proyectos'});
			}else{
				return res.status(200).send({total_items: total, proyectos: proyectos});
			}

		}
	});
}
/**
lista de proyectos
**/
function getProyectos(req, res){
	if (req.params.page) {
		var page = req.params.page;
	}else{
		var page = 1;
	}
	
	var itemsPerPage = 4;

	Proyecto.find().sort('fecha').paginate(page,itemsPerPage, function(err, proyectos, total){
		if (err) {
			res.status(500).send({message: 'error en la peticion'});
		}else{
			if (!proyectos) {
				res.status(404).send({message: 'no hay proyectos'});
			}else{
				return res.status(200).send({total_items: total, proyectos: proyectos});
			}

		}
	});

}

function saveProyecto(req, res){
	var proyecto = new Proyecto();
	var params = req.body;

	proyecto.nombre = params.nombre;
	proyecto.descripcion = params.descripcion;
	proyecto.image = 'null';
	proyecto.fecha = params.fecha;
	proyecto.user = params.user;

	proyecto.save((err,proyectoStored)=>{
		if (err) {
			res.status(500).send({message: 'error al guardar el proyecto'});
		}else{
			if (!proyectoStored) {
				res.status(404).send({message: 'el proyecto no ha sido guardado'});
			}else{
				res.status(200).send({proyecto: proyectoStored});
			}
		}
	});
}

function updateProyecto(req,res){
	var proyectoId = req.params.id;
	var update = req.body;

	Proyecto.findByIdAndUpdate(proyectoId, update, (err,proyectoUpdate)=>{
		if (err) {
			res.status(500).send({message: 'error al guardar el proyecto'});
		}else{
			if (!proyectoUpdate) {
				res.status(404).send({message: 'el proyecto no ha sido actuaizado'});
			}else{
				res.status(200).send({proyecto: proyectoUpdate});
			}
		}
	});
}
function deleteProyecto(req,res){
	var proyectoId = req.params.id;

	Proyecto.findByIdAndRemove(proyectoId,(err,proyectoRemoved)=>{
		if (err) {
			res.status(500).send({message: 'error al eliminar el proyecto'});
		}else{
			if (!proyectoRemoved) {
				res.status(404).send({message: 'el proyecto no ha sido eliminado'});
			}else{
				Fichero.find({proyecto: proyectoRemoved._id}).remove((err,ficheroRemoved)=>{
					if (err) {
						res.status(500).send({message: 'error al eliminar el fichero'});
					}else{
						if (!ficheroRemoved) {
							res.status(404).send({message: 'el fichero no ha sido eliminado'});
						}else{
							res.status(200).send({proyecto: proyectoRemoved});
						}
					}
				});

			}
		}
	});
}
function uploadImage(req,res){
	var proyectoId = req.params.id;
	var file_name = "No subido...";

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_path.split('\.');
		var file_ext = ext_split[1];

		if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' ) {
			Proyecto.findByIdAndUpdate(proyectoId, {image: file_name}, (err, proyectoUpdated)=>{
			if (!proyectoUpdated) {
				res.status(404).send({message: 'No se ha podido actualizar el proyecto'});
			}else{
				res.status(200).send({proyecto: proyectoUpdated});
			}
		
			});
		}else{
			res.status(200).send({message: 'la extencion no es correcta'});
		}
	}else{
		res.status(200).send({message: 'no se ha subido la imagen'});
	}
}
function getImageFile(req, res){
	var imageFile = req.params.imageFile;
    var path_file = './uploads/proyectos/'+imageFile;
	fs.exists(path_file, function(exist){
		if (exist) {
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(404).send({message: 'No existe la imagen'});
		}
	});
}
/*
function myProyecto(req,res){
	var UserId = req.params.proyecto;
	var user = new User('','','','','','');
	var find = Proyecto.find({user: userId}).sort('nombre');
	
	find.populate({
		path: 'user'
	}).exec((err,proyectos)=>{
		if (err) {
			res.status(500).send({message: 'error en el servidor'});
		}else{
			if (!proyectos) {
				res.status(404).send({message: 'el fichero no existe'});
			}else{
				res.status(200).send({proyectos});
			}

		}
	});
}*/
module.exports ={
	getProyecto,
	saveProyecto,
	getProyectos,
	updateProyecto,
	deleteProyecto,
	uploadImage,
	getImageFile,
	searchProyectos
	//myProyecto
};