'use strict'

var express = require('express');
var AlarmasdoserController = require ('../controllers/alarmasdoser');

var api     = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post   ('/registra-alarmasdoser'     , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], AlarmasdoserController.registraItem      );
api.get    ('/alarmasdoser-rango-fechas' , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], AlarmasdoserController.itemsRangoFechas  );
api.get    ('/alarmasdoser-todos-dia'    , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], AlarmasdoserController.itemsTodosDia     );
api.get    ('/alarmasdoser-item-dia'     , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], AlarmasdoserController.itemDia           );
api.get    ('/alarmasdoser-rango-ultimos', [ md_auth.ensureAuth, md_auth.ensureAdminUser ], AlarmasdoserController.itemsRangoUltimos );
api.delete ('/borra-alarmasdoser/:id'    , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], AlarmasdoserController.deleteItem        );
module.exports = api; 