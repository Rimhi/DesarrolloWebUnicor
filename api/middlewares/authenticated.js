'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "clave_secreta";

exports.ensureAuth = function(req, res, next){
	if (!req.headers.authorization) {
		return res.status(404).send({message: 'la peticion no tiene la cabecera de la autenticacion'});

	}else{
		var token = req.headers.authorization.replace(/['"]+/g, '');
		try{
			var payload = jwt.decode(token,secret);
			if (payload.exp <= moment().unix) {
				return res.status(401).send({message: 'el token ha expirado'});
				console.log('el token ha espirado');
				var token = '';

			}
		}catch(ex){
		
			return res.status(404).send({message: 'el token no es valido'});
		}
		req.user = payload;
	}
	next();
};