'use strict'
//OJO CAMBIAR NOMBRE DE COLLECCION Y MODEL SEGÚN LA CONSULTA
var Blucontrol = require('../models/blucontrol');
var idItem;

//================================================
// CREAR UN ITEM
//================================================
function registraItem(){
	//OJO CAMBIAR NOMBRE DE COLLECCION SEGÚN LA CONSULTA
	var item = new Blucontrol({
						url_blucontrol: 'https://iblufeederfk1wvxr86w.us3.hana.ondemand.com/',
						username      : 'blufeeder',
						password      : 'blufeeder2020',
						token         : ''
					});
	//OJO CAMBIAR CONDICIONES SEGÚN MODELO
	item.save((err, itemStored) => {
		if(err){
			console.log("err: "+ err);
		}else{
			if(!itemStored){
				console.log("sin datos");
			}else{
				idItem=itemStored._id;
				console.log("idBlucontrol: "+idItem);
			}
		}
	});
}
//================================================
// CREAR UN ITEM
//================================================
function crearItem(){
	Blucontrol.findOne({}) 
	   .exec((err, itemsFound) => {
   			if (err){
   				console.log("err: "+ err);
   			}else{
   				if(!itemsFound){
						console.log("no hay datos");
						registraItem();
				}else{
					idItem=itemsFound._id;
					console.log("si hay datos de Blucontrol id:"+idItem);
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
	Blucontrol.findByIdAndUpdate(itemId, params, { new: true }, (err, itemUpdated) => { 
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
// ENCUENTRA EL ULTIMO
//================================================
function itemUltimo(req,res){
	//OJO CAMBIAR NOMBRE DE COLLECCION Y CAMPOS SEGÚN LA CONSULTA
	Blucontrol.findOne({}) 
	   .exec(
	   		(err, itemsFound) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando items'});
	   			}else{
	   				res.status(200).send({
						item: itemsFound
					});
	   			}
	   		});
}



module.exports = {
	registraItem,
	actualizaItem,
	itemUltimo,
	crearItem
};