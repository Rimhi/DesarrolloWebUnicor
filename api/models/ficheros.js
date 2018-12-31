'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FicheroSchema = Schema({
	nombre: String,
	descripcion: String,
	fecha: String,
	proyecto: { type: Schema.ObjectId, ref: 'Proyecto'},
	tipo: String,
	file: String
});

module.exports = mongoose.model('Fichero',FicheroSchema);