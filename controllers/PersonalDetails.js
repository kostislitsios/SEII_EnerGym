'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/PersonalDetailsService.js');

module.exports.userUserIdPersonalDetailsPOST = function userUserIdPersonalDetailsPOST (req, res, next, body, userId) {
  Default.userUserIdPersonalDetailsPOST(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};