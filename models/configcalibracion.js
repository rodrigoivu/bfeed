'use strict'
var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var ConfigcalibracionSchema = new Schema({

	tpo1: { type: Number, required: false },
	tpo2: { type: Number,  required: false },
	tpo3: { type: Number,  required: false },
	hz1 : { type: Number,  required: false },
	hz2 : { type: Number,  required: false },
	hz3 : { type: Number,  required: false }
	
},{ collection: 'configcalibracion'});

//EventoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Configcalibracion', ConfigcalibracionSchema);