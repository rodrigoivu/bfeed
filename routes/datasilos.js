'use strict'

var express = require('express');
var DatasilosController = require ('../controllers/datasilos');

var api     = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post   ('/registra-datasilos'           , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], DatasilosController.registraItem          );
api.get    ('/datasilos-rango-fechas'       , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], DatasilosController.itemsRangoFechas      );
api.get    ('/datasilos-rango-fechas-todos' , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], DatasilosController.itemsRangoFechasTodos );
api.get    ('/datasilos-rango-ultimos'      , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], DatasilosController.itemsRangoUltimos     );
api.get    ('/datasilos-rango-ultimos-silo' , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], DatasilosController.itemsRangoUltimosSilo );
api.delete ('/borra-datasilos/:id'          , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], DatasilosController.deleteItem            );
module.exports = api;