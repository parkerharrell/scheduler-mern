"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notFoundErrorHandler = notFoundErrorHandler;
exports.errorHandler = errorHandler;

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _winston = _interopRequireDefault(require("../config/winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

/**
 * NOT_FOUND(404) middleware to catch error response
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 */
function notFoundErrorHandler(req, res, next) {
  res.status(_httpStatusCodes.default.NOT_FOUND).json({
    error: {
      code: _httpStatusCodes.default.NOT_FOUND,
      message: _httpStatusCodes.default.getStatusText(_httpStatusCodes.default.NOT_FOUND)
    }
  });
}
/**
 * Generic error response middleware
 *
 * @param  {object}   err
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 */


function errorHandler(err, req, res, next) {
  _winston.default.error(err);

  res.status(err.status || _httpStatusCodes.default.INTERNAL_SERVER_ERROR).json({
    error: {
      code: err.code || _httpStatusCodes.default.INTERNAL_SERVER_ERROR,
      message: err.message || _httpStatusCodes.default.getStatusText(_httpStatusCodes.default.INTERNAL_SERVER_ERROR)
    }
  });
}

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(notFoundErrorHandler, "notFoundErrorHandler", "E:\\Scheduler_node_react\\server\\middlewares\\errorHandler.js");
  reactHotLoader.register(errorHandler, "errorHandler", "E:\\Scheduler_node_react\\server\\middlewares\\errorHandler.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();