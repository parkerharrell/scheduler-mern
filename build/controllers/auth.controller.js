"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _winston = _interopRequireDefault(require("../config/winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

/**
 * Returns jwt token if valid username and password is provided
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
function login(req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;
  console.log('------username----', username);

  _user.default.query({
    where: {
      username: username
    }
  }).fetch().then(function (user) {
    if (user) {
      if (_bcrypt.default.compareSync(password, user.get('password'))) {
        var token = _jsonwebtoken.default.sign({
          id: user.get('id'),
          username: user.get('username')
        }, process.env.TOKEN_SECRET_KEY);

        res.json({
          success: true,
          token: token,
          username: user.get('username')
        });
      } else {
        _winston.default.log('error', 'Authentication failed. Invalid password.');

        res.status(_httpStatusCodes.default.UNAUTHORIZED).json({
          success: false,
          message: 'Authentication failed. Invalid password.'
        });
      }
    } else {
      _winston.default.log('error', 'Invalid username or password.');

      res.status(_httpStatusCodes.default.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid username or password.'
      });
    }
  });
}

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(login, "login", "E:\\scheduler_react\\server\\controllers\\auth.controller.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();