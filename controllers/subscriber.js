var mqtt = require('mqtt')
var Jaula = require('../models/jaula');
var Alimentacion = require('../models/alimentacion');
var Linea = require('../models/linea');
var Silo = require('../models/silo');
var PublisherController  = require('./publisher');
//var Controllerbateriaharnero = require('../controllers/bateriaharnero');

var socketLocal; // se rescata del index.js
var ioLocal; // se rescata del index.js
var client  = mqtt.connect('mqtt://192.168.0.38') // IP MAC
//var client  = mqtt.connect('mqtt://3.132.120.83') // AWS BLUFEEDER
//var client  = mqtt.connect('mqtt://42.93.249.99') //IMATEK DEMO

var ventanaAudio= false;
client.on('connect', () => {
	client.subscribe('iofish/ciclo');
	client.subscribe('iofish/linea');
	client.subscribe('iofish/okguardacalib');
	client.subscribe('iofish/cuentamuevedosercalib');
	client.subscribe('iofish/okmuevedosercalib');
    client.subscribe('iofish/calibrar');
    client.subscribe('outTopic');
})
client.on('message', (topic, message) => {

    var items;
   	items = JSON.parse(message);
   	if(topic == 'iofish/ciclo'){
		saveJaulaDataToAlimentación(items);
		
	}

	if(topic == 'iofish/linea'){
		
		mensajeLinea(items)

	}

   	if(topic == 'iofish/okguardacalib'){
   		//console.log(items);
		mensajeOkGuardaCoefCalib(items);
	}

	if(topic == 'iofish/cuentamuevedosercalib'){
   		//console.log(items);
		mensajeCuentaMueveDoserCalib(items);
	}

	if(topic == 'iofish/okmuevedosercalib'){
   		//console.log(items);
		mensajeOkMueveDoserCalib(items);
	}



	if(topic == 'outTopic'){

		if (ventanaAudio == false){
			ventanaAudio = true;
			mensajeAudio(items);
		}
		
		setTimeout(ventana,200);
	}
	
	
})
/*función que sólo hace un alert*/
function ventana(){
 ventanaAudio= false;
}
/*se la llama a los 10 segundos*/



//================================================
// SAVE JAULA DATA
//================================================
function saveJaulaDataToAlimentación(item){
	


	if(item.BD == 1){
		var jaulaSel;
		var dataAlim = new Alimentacion;
		var ts = new Date();
		Linea.find({}) 
		   .exec(
		   		(err, itemsFound) => {
		   			if (err){
		   				console.log(err);
		   			}else{
		   				var lineaSel=itemsFound[item.LI-1];
		   				//Buscar JAULA
		   				Jaula.find({'linea': lineaSel._id})
		   					.populate({
							   			path: 'doser',
								   		populate:{
								   			path:'silo',
								   		}
								   	})
		   					.populate({
							   			path: 'doser_med',
								   		populate:{
								   			path:'silo',
								   		}
								   	})
		   					.exec(
						   		(err1, itemsFound1) => {
						   			if (err1){
						   				console.log(err1);
						   			}else{
						   				
						   				if (itemsFound1.length >= item.JA){
						   					jaulaSel = itemsFound1[item.JA-1];
							   				var alimento;
							   				var silo;
							   				if(item.MS == 1){  //MS: Medicado Select  1: está seleccionado doser medicado
							   					alimento = jaulaSel.doser_med.silo.alimento;
							   					silo     = jaulaSel.doser_med.silo;

							   				}
							   				if(item.MS == 0){
							   					alimento = jaulaSel.doser.silo.alimento;
							   					silo     = jaulaSel.doser.silo;
							   				}

							   				dataAlim = new Alimentacion({
									   					jaula    : jaulaSel._id,
														ts       : ts, 
														grs      : item.DC,
														kg_min   : jaulaSel.kg_min,
														ppm      : jaulaSel.ppm,
														ppv      : jaulaSel.ppv,
														alimento : alimento,
														silo     : silo
									   				});

							   				var saldoActual = silo.saldo;
							   				var saldoNuevo  = saldoActual - item.DC/1000;
							   				var siloId = silo._id;

							   				//GUARDAR EN ALIMENTACIÓN HISTORUCA
							   				dataAlim.save((err, itemStored) => {
												if(err){
													console.log(err);
												}else{
													if(!itemStored){
														console.log('Imposible actualizar item');
													}else{
														//ACTUALIZAR SILO
														

														actualizarSilo(siloId,saldoNuevo);

														PublisherController.setJaulaBD(item.LI,item.JA);

														
													}
												}
											});
											
							   			}else{
							   				PublisherController.setJaulaBD(item.LI,item.JA);
							   			}

						   			}
						   		}
						   	);
		   				
		   			}
		   		}
		   	);
	}
	
	mensajeCiclo(item)
}


function actualizarSilo(siloId,saldoNuevo){
	//ACTUALIZAR SILO
	Silo.findByIdAndUpdate(siloId, {'saldo':saldoNuevo}, { new: true }, (err, itemUpdated) => { 
		if(err){
			console.log(err);
		}else{
			if(!itemUpdated){
				console.log('Imposible actualizar item');
			}else{
				var SaldoSilo={
						ID: siloId,
						SS: saldoNuevo
					}
				mensajeSaldoSilo(SaldoSilo);
			}
		}
	});
}

function asignarSocket(socket,io){
    socketLocal=socket;
    ioLocal=io;
}

function mensajeCalibrarOk(data){
	if(socketLocal){
		ioLocal.emit('CalibrarOk',{data: data});
	}
}

function mensajeCiclo(data){
	if(socketLocal){
		ioLocal.emit('ciclo',{data: data});
	}
}

function mensajeSaldoSilo(data){
	if(socketLocal){
		ioLocal.emit('saldosilo',{data: data});
	}
}

function mensajeLinea(data){
	if(socketLocal){
		ioLocal.emit('linea',{data: data});
	}
}

function mensajeOkGuardaCoefCalib(data){
	if(socketLocal){
		ioLocal.emit('okGuardaCalib',{data: data});
	}
}

function mensajeCuentaMueveDoserCalib(data){
	if(socketLocal){
		ioLocal.emit('cuentaMueveDoserCalib',{data: data});
	}
}

function mensajeOkMueveDoserCalib(data){
	if(socketLocal){
		ioLocal.emit('okMueveDoserCalib',{data: data});
	}
}

function mensajeAudio(data){
	//console.log("audio");
	if(socketLocal){
		ioLocal.emit('audio',{data: data});
		
	}
}

module.exports = {
	asignarSocket
};
