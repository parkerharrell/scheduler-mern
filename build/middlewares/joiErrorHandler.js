"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var _default = function _default(err, req, res, next) {
  if (err.isJoi) {
    var error = {
      code: _httpStatusCodes.default.BAD_REQUEST,
      message: _httpStatusCodes.default.getStatusText(_httpStatusCodes.default.BAD_REQUEST),
      details: err.details && err.details.map(function (err) {
        return {
          message: err.message,
          param: err.path
        };
      })
    };
    return res.status(_httpStatusCodes.default.BAD_REQUEST).json(error);
  } // If this isn't a Joi error, send it to the next error handler


  return next(err);
};

/**
 * Joi error handler middleware
 *
 * @param {object} err
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

  reactHotLoader.register(_default, "default", "E:\\scheduler_react\\server\\middlewares\\joiErrorHandler.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();