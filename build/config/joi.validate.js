"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

/**
 * Joi validation.
 *
 * @param  {object}  schema
 * @return {null|object}
 */
function validate(schema) {
  return function (req, res, next) {
    var toValidate = {};

    if (!schema) {
      return next();
    }

    ['params', 'body', 'query'].forEach(function (key) {
      if (schema[key]) {
        toValidate[key] = req[key];
      }
    });
    return _joi.default.validate(toValidate, schema, {
      abortEarly: false
    }, function (err) {
      if (err) {
        return next(err);
      }

      return next();
    });
  };
}

var _default = validate;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(validate, "validate", "E:\\Scheduler_node_react\\server\\config\\joi.validate.js");
  reactHotLoader.register(_default, "default", "E:\\Scheduler_node_react\\server\\config\\joi.validate.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();