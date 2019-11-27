'use strict'

var express = require('express');
var DatacalibracionController = require ('../controllers/datacalibracion');

var api     = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post   ('/registra-datacalibracion'     , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], DatacalibracionController.registraItem      );
api.get    ('/datacalibracion-rango-fechas' , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], DatacalibracionController.itemsRangoFechas  );
api.get    ('/datacalibracion-rango-fechas-todos' , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], DatacalibracionController.itemsRangoFechasTodos  );
api.get    ('/datacalibracion-rango-ultimos', [ md_auth.ensureAuth, md_auth.ensureAdminUser ], DatacalibracionController.itemsRangoUltimos );
api.get    ('/datacalibracion-rango-ultimos-doser', [ md_auth.ensureAuth, md_auth.ensureAdminUser ], DatacalibracionController.itemsRangoUltimosDoser );
api.delete ('/borra-datacalibracion/:id'    , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], DatacalibracionController.deleteItem        );
module.exports = api;