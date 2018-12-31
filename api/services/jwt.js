'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "clave_secreta";

exports.createToken = function(user) {
	var payload = {
		sub: user._id,
		name: user.name,
		apellido: user.apellido,
		rol: user.rol,
		email: user.email,
		image: user.image,
		iat: moment().unix(),
		exp: moment().add(2,'minutes').unix
	};
	return jwt.encode(payload, secret);
}
