'use strict'

var app = require('./app');
var socket = require('socket.io');
//Puerto para servir la API
var port = process.env.PORT || 3781;

//broker: es el servidor para mqtt
var broker = require('./broker');

//Funciones para Publicar y Subscribir mediante mqtt

var SubscriberController = require('./controllers/subscriber');
var PublisherController  = require('./controllers/publisher');
var plan = require('./controllers/plan');
var configcalibracion = require('./controllers/configcalibracion');
var blucontrol = require('./controllers/blucontrol');

//mongoose: comandos para manejo de mongodb
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//Conectar a la base de datos mongodb
mongoose.connect('mongodb://localhost:27017/iofishcloud',{ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },(err,res) => {  //useNewUrlParser agregado por el error de depreciacion
if (err) {
	throw err;
}else{
	console.log("La conexión a la base de datos está funcionando correctamente...");
  
	//Conectar el Servidor de Api's mediante http
	const server = app.listen(port, function(){
	    console.log("Servidor de Api's de IoFish cloud escuchando en http://localhost:" + port);
	    //Config inical
	    plan.crearItem();
	    configcalibracion.crearItem();
	    blucontrol.crearItem();
	});

	const io = socket.listen(server,{
					path: '/evento/socket.io'
				});
	
	io.sockets.on('connection', (socket) => { 
		SubscriberController.asignarSocket(socket,io);
		PublisherController.recibeOrden(socket);
	});
}
});
