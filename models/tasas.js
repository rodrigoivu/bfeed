'use strict'
var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var TasasSchema = new Schema({

	jaula   : { type: Schema.Types.ObjectId,ref:'Jaula'   ,  required: false },
	alimento: { type: Schema.Types.ObjectId,ref:'Alimento',  required: false },
	silo    : { type: Schema.Types.ObjectId,ref:'Silo',  required: false },
	ts:       { type: Date,   required: false }, 
	kg_min:   { type: Number, required: false },
	ppm:      { type: Number, required: false },
	ppv:      { type: Number, required: false }
	
},{ collection: 'tasas'});

//EventoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Tasas', TasasSchema);