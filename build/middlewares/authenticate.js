"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var _default = function _default(req, res, next) {
  var authorizationHeader = req.headers['authorization'];
  var token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    _jsonwebtoken.default.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (err) {
        res.status(_httpStatusCodes.default.UNAUTHORIZED).json({
          error: 'You are not authorized to perform this operation!'
        });
      } else {
        _user.default.query({
          where: {
            id: decoded.id
          },
          select: ['email', 'id']
        }).fetch().then(function (user) {
          if (!user) {
            res.status(_httpStatusCodes.default.NOT_FOUND).json({
              error: 'No such user'
            });
          } else {
            req.currentUser = user;
            next();
          }
        });
      }
    });
  } else {
    res.status(_httpStatusCodes.default.FORBIDDEN).json({
      error: 'No token provided'
    });
  }
};

/**
 * Route authentication middleware to verify a token
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 */
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "E:\\Scheduler_node_react\\server\\middlewares\\authenticate.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();