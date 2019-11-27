'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DatasilosSchema = new Schema({

	silo       : { type: Schema.Types.ObjectId,ref:'Silo'    , required: false },
	user       : { type: Schema.Types.ObjectId,ref:'User'    , required: false },
	alimento   : { type: Schema.Types.ObjectId,ref:'Alimento', required: false },
	ts         : { type: Date  , required: false }, 
	ingreso    : { type: Number, required: false },
	trasvasije : { type: Number, required: false },
	vaciado    : { type: Boolean,required: false }
	
},{ collection: 'datasilos'});

module.exports = mongoose.model('Datasilos', DatasilosSchema);