'use strict'
var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var AlarmasblowerSchema = new Schema({

	blower   : { type: Schema.Types.ObjectId,ref:'Blower',   required: false },
	detalle  : { type: String,  required: false },
	ts       : { type: Date  , required: false }, 
	
	
},{ collection: 'alarmasblower'});

//EventoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Alarmasblower', AlarmasblowerSchema);