var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://192.168.0.38') //IP SERVIDORLOCAL
//var client  = mqtt.connect('mqtt://3.132.120.83') // AWS BLUFEEDER
//var client  = mqtt.connect('mqtt://42.93.249.99') //IMATEK DEMO
var dataMqtt;
var dataSetJaula;
var ordenAlimentar;
var dataSetCoefCalib;
var ordenMueveDoserCalib;
var dataPruebaBlower;
var dataPruebaDoser;
var dataPruebaSelector;

client.on('connect', function () {
	enviarMqtt();
	setJaula();
	alimentar();
 });

function enviarMqtt(){
	client.publish('iofish/control', dataMqtt);
}

function setJaula(){
	client.publish('iofish/setjaula', dataSetJaula);
}

function setJaulaBD(LI,JA){
	dataBD = '{"LI":'+LI+',"JA":'+JA+',"BD":'+2+'}';
	client.publish('iofish/setjaulaBD', dataBD);
}

function alimentar(){

	client.publish('iofish/alimentar', ordenAlimentar);
}

function setCoefCalibrar(){
	client.publish('iofish/coefcalib', dataSetCoefCalib);
}

function mueveDoserCalibrar(){
	client.publish('iofish/muevedosercalib', ordenMueveDoserCalib);
}

function enviaPruebaBlower(){
	client.publish('iofish/pruebablower', dataPruebaBlower);
}

function enviaPruebaDoser(){
	client.publish('iofish/pruebadoser', dataPruebaDoser);
}

function enviaPruebaSelector(){
	client.publish('iofish/pruebaselector', dataPruebaSelector);
}

function recibeOrden(socket){

	socket.on('recibeOrden', (data) => {
	    dataMqtt=data;	
        enviarMqtt();
    });
    socket.on('setJaula', (data) => {
	    dataSetJaula=data;	
        setJaula();
    });
    socket.on('ordenAlimentar', (data) => {
	    ordenAlimentar=data;	
        alimentar();
    });
    socket.on('setCoefCalib', (data) => {
	    dataSetCoefCalib=data;	
        setCoefCalibrar();
    });
    socket.on('mueveDoserCalib', (data) => {
	    ordenMueveDoserCalib=data;	
        mueveDoserCalibrar();
    });
    socket.on('pruebablower', (data) => {
	    dataPruebaBlower=data;
        enviaPruebaBlower();
    });
    socket.on('pruebadoser', (data) => {
	    dataPruebaDoser=data;	
        enviaPruebaDoser();
    });
    socket.on('pruebaselector', (data) => {
	    dataPruebaSelector=data;	
        enviaPruebaSelector();
    });
}

module.exports = {
	recibeOrden,
	enviarMqtt,
	setJaula,
	alimentar,
	setJaulaBD,
	setCoefCalibrar,
	mueveDoserCalibrar,
	enviaPruebaBlower,
	enviaPruebaDoser,
	enviaPruebaSelector
};