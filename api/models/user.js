'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	name: String,
	apellido: String,
	email: String,
	password: String,
	rol: String,
	image: String
});

module.exports = mongoose.model('User',UserSchema);