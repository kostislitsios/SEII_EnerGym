'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/TrainingStatsService.js');

module.exports.userUserIdTrainingStatsGET = function userUserIdTrainingStatsGET (req, res, next, userId) {
  Default.userUserIdTrainingStatsGET(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
