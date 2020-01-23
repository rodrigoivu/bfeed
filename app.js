'use strict'

var express = require ('express');
var bodyParser = require ('body-parser');
var path = require('path');
var app = express();

// cargar rutas
var user_routes              = require('./routes/user');
var sendmail_routes          = require('./routes/sendmail');
var Alimentacion_routes      = require('./routes/alimentacion');
var Alimento_routes          = require('./routes/alimento');
var Blower_routes            = require('./routes/blower');
var Doser_routes             = require('./routes/doser');
var Esclusa_routes           = require('./routes/esclusa');
var Jaula_routes             = require('./routes/jaula');
var Linea_routes             = require('./routes/linea');
var Selector_routes          = require('./routes/selector');
var Sensor_routes            = require('./routes/sensor');
var Sensores_routes          = require('./routes/sensores');
var Silo_routes              = require('./routes/silo');
var Tipopez_routes           = require('./routes/tipopez');
var Modelosfr_routes         = require('./routes/modelosfr');
var Plan_routes              = require('./routes/plan');
var Configcalibracion_routes = require('./routes/configcalibracion');
var Datacalibracion_routes   = require('./routes/datacalibracion');
var Datasilos_routes         = require('./routes/datasilos');
var Tasas_routes             = require('./routes/tasas');
var Alarmasblower_routes     = require('./routes/alarmasblower');
var Alarmasdoser_routes      = require('./routes/alarmasdoser');
var Alarmasselector_routes   = require('./routes/alarmasselector');

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({extended:false}));
// create application/json parser
app.use(bodyParser.json());

// CORS configurar cabeceras http
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin','*'); //permite el acceso a todos los dominios, a las apis
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-Whith, Content-Type, Accept,Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
	next();
});
app.use('/',express.static('client', { redirect: false }));
//app.use('/api', subsignal_routes);
app.use( '/api', user_routes              );
app.use( '/api', sendmail_routes          );
app.use( '/api', Alimentacion_routes      );
app.use( '/api', Alimento_routes          );
app.use( '/api', Blower_routes            );
app.use( '/api', Doser_routes             );
app.use( '/api', Esclusa_routes           );
app.use( '/api', Jaula_routes             );
app.use( '/api', Linea_routes             );
app.use( '/api', Selector_routes          );
app.use( '/api', Sensor_routes            );
app.use( '/api', Sensores_routes          );
app.use( '/api', Silo_routes              );
app.use( '/api', Tipopez_routes           );
app.use( '/api', Modelosfr_routes         );
app.use( '/api', Plan_routes              );
app.use( '/api', Configcalibracion_routes );
app.use( '/api', Datacalibracion_routes   );
app.use( '/api', Datasilos_routes         );
app.use( '/api', Tasas_routes             );
app.use( '/api', Alarmasblower_routes     );
app.use( '/api', Alarmasdoser_routes      );
app.use( '/api', Alarmasselector_routes   );

app.get('*', function(req,res,next){
	res.sendFile(path.resolve('./client/index.html'));
});

module.exports = app;