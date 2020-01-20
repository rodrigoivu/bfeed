'use strict'

var express = require('express');
var TasasController = require ('../controllers/tasas');

var api     = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post   ('/registra-tasas'     , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], TasasController.registraItem      );
api.get    ('/tasas-rango-fechas' , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], TasasController.itemsRangoFechas  );
api.get    ('/tasas-todos-dia'    , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], TasasController.itemsTodosDia     );
api.get    ('/tasas-item-dia'     , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], TasasController.itemDia           );
api.get    ('/tasas-rango-ultimos', [ md_auth.ensureAuth, md_auth.ensureAdminUser ], TasasController.itemsRangoUltimos );
api.delete ('/borra-tasas/:id'    , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], TasasController.deleteItem        );
module.exports = api; 