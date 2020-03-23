'use strict'

var express = require('express');
var BlucontrolController = require ('../controllers/blucontrol');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/registra-blucontrol'     ,[ md_auth.ensureAuth, md_auth.ensureAdminUser ], BlucontrolController.registraItem  );
api.put ('/actualiza-blucontrol/:id',[ md_auth.ensureAuth, md_auth.ensureAdminUser ], BlucontrolController.actualizaItem );
api.get ('/blucontrol-ultimo',       [ md_auth.ensureAuth, md_auth.ensureAdminUser ], BlucontrolController.itemUltimo);
module.exports = api;