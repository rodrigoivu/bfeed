'use strict'

var express = require('express');
var AlarmasblowerController = require ('../controllers/alarmasblower');

var api     = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post   ('/registra-alarmasblower'     , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], AlarmasblowerController.registraItem      );
api.get    ('/alarmasblower-rango-fechas' , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], AlarmasblowerController.itemsRangoFechas  );
api.get    ('/alarmasblower-todos-dia'    , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], AlarmasblowerController.itemsTodosDia     );
api.get    ('/alarmasblower-item-dia'     , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], AlarmasblowerController.itemDia           );
api.get    ('/alarmasblower-rango-ultimos', [ md_auth.ensureAuth, md_auth.ensureAdminUser ], AlarmasblowerController.itemsRangoUltimos );
api.delete ('/borra-alarmasblower/:id'    , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], AlarmasblowerController.deleteItem        );
module.exports = api; 