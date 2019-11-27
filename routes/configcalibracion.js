'use strict'

var express = require('express');
var ConfigcalibracionController = require ('../controllers/configcalibracion');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/registra-configcalibracion'     ,[ md_auth.ensureAuth, md_auth.ensureAdminUser ], ConfigcalibracionController.registraItem  );
api.put ('/actualiza-configcalibracion/:id',[ md_auth.ensureAuth, md_auth.ensureAdminUser ], ConfigcalibracionController.actualizaItem );
api.get ('/configcalibracion-ultimo',       [ md_auth.ensureAuth, md_auth.ensureAdminUser ], ConfigcalibracionController.itemUltimo);
module.exports = api;