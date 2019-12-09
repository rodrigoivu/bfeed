'use strict'
//OJO CAMBIAR NOMBRE DE COLLECCION Y MODEL SEGÚN LA CONSULTA
var Jaula = require('../models/jaula');
//================================================
// CREAR UN ITEM
//================================================
function registraItem(req,res){
	//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	var item = new Jaula(req.body);
	//OJO CAMBIAR CONDICIONES SEGÚN MODELO
	item.save((err, itemStored) => {
		if(err){
			res.status(500).send({
				error: err,
				message: 'Puede que el Item ya exista'
			});
		}else{
			if(!itemStored){
				res.status(404).send({
					message: 'Imposible registrar item'
				});
			}else{
				res.status(200).send({
					item: itemStored,
				});
			}
		}
	});
}
//================================================
// ACTUALIZAR UN ITEM
//================================================
function actualizaItem(req,res){
	var itemId = req.params.id; 
	var params = req.body;  
 	//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	Jaula.findByIdAndUpdate(itemId, params, { new: true }, (err, itemUpdated) => { 
		if(err){
			res.status(500).send({
				error: err,
				message: 'Error al actualizar item'
			});
		}else{
			if(!itemUpdated){
				res.status(404).send({
					message: 'Imposible actualizar item',
			    });
			}else{
				res.status(200).send({
					item: itemUpdated,
				});
			}
		}
	});
}

//================================================
// MOSTRAR TODOS LOS ITEMS 
//================================================
function itemsTodos(req,res){
	//OJO CAMBIAR NOMBRE DE COLLECCION Y CAMPOS SEGÚN LA CONSULTA
	Jaula.find({}) 
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando items'});
	   			}else{
	   				//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	   				Jaula.countDocuments({}, (err,conteo) =>{
	   					res.status(200).send({
								items: itemsFound,
								total: conteo
						});
	   				});
	   			}
	   		}
	   	);
}

//================================================
// MOSTRAR TODOS LOS ITEMS ORDENADOS POR NOMBRE
//================================================
function itemsTodosSort(req,res){
	//OJO CAMBIAR NOMBRE DE COLLECCION Y CAMPOS SEGÚN LA CONSULTA
	Jaula.find({})
	   .sort([['nombre', 1]])	
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando items'});
	   			}else{
	   				//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	   				Jaula.countDocuments({}, (err,conteo) =>{
	   					res.status(200).send({
								items: itemsFound,
								total: conteo
						});
	   				});
	   			}
	   		}
	   	);
}
//================================================
// MOSTRAR TODOS LOS ITEMS CON DETALLE DE LINEA
//================================================
function itemsTodosCompleto(req,res){
	//OJO CAMBIAR NOMBRE DE COLLECCION Y CAMPOS SEGÚN LA CONSULTA
	Jaula.find({})
		.populate({
	   		path:'linea'
	   	})
	   .populate({
	   		path:'doser'
	   	})
	   .populate({
	   		path:'doser_med'
	   	})
	   //.populate('selector')
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando items'});
	   			}else{
	   				//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	   				Jaula.countDocuments({}, (err,conteo) =>{
	   					res.status(200).send({
								items: itemsFound,
								total: conteo
						});
	   				});
	   			}
	   		}
	   	);
}

//================================================
// ELIMINAR ITEM
//================================================
function deleteItem(req,res){
	var itemId = req.params.id; // éste parámetro se pone en el url despues de /
	//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	Jaula.findByIdAndRemove(itemId, (err, itemRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al borrar registro'});
		}else{
			if(!itemRemoved){
				res.status(404).send({message: 'No existe registro con ese id'});
			}else{
				res.status(200).send({item: itemRemoved});
			}
		}
	});
}

module.exports = {
	registraItem,
	actualizaItem,
	itemsTodos,
	itemsTodosSort,
	itemsTodosCompleto,
	deleteItem
};
