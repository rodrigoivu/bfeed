'use strict'
var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var BlucontrolSchema = new Schema({

	url_blucontrol: { type: String, required: false },
	username      : { type: String,  required: false },
	password      : { type: String,  required: false },
	token         : { type: String,  required: false }
	
},{ collection: 'blucontrol'});

//EventoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Blucontrol', BlucontrolSchema);