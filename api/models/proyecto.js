'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProyectoSchema = Schema({
	nombre: String,
	descripcion: String,
	image: String,
	user: { type: Schema.ObjectId, ref: 'User'},
	fecha: String
});

module.exports = mongoose.model('Proyecto',ProyectoSchema);