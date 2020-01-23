'use strict'

var express = require('express');
var AlarmasselectorController = require ('../controllers/alarmasselector');

var api     = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post   ('/registra-alarmasselector'     , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], AlarmasselectorController.registraItem      );
api.get    ('/alarmasselector-rango-fechas' , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], AlarmasselectorController.itemsRangoFechas  );
api.get    ('/alarmasselector-todos-dia'    , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], AlarmasselectorController.itemsTodosDia     );
api.get    ('/alarmasselector-item-dia'     , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], AlarmasselectorController.itemDia           );
api.get    ('/alarmasselector-rango-ultimos', [ md_auth.ensureAuth, md_auth.ensureAdminUser ], AlarmasselectorController.itemsRangoUltimos );
api.delete ('/borra-alarmasselector/:id'    , [ md_auth.ensureAuth, md_auth.ensureAdminUser ], AlarmasselectorController.deleteItem        );
module.exports = api;