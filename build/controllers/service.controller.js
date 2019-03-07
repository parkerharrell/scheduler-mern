"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAll = findAll;
exports.findById = findById;
exports.store = store;
exports.update = update;
exports.destroy = destroy;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _service = _interopRequireDefault(require("../models/service.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Find all the services
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
function findAll(req, res) {
  _service.default.forge().fetchAll().then(function (service) {
    return res.json({
      error: false,
      data: service.toJSON()
    });
  }).catch(function (err) {
    return res.status(_httpStatusCodes.default.INTERNAL_SERVER_ERROR).json({
      error: err
    });
  });
}
/**
 *  Find service by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */


function findById(req, res) {
  console.log('service id:', req.params.id);

  _service.default.forge({
    id: req.params.id
  }).fetch().then(function (service) {
    if (!service) {
      res.status(_httpStatusCodes.default.NOT_FOUND).json({
        error: true,
        data: {}
      });
    } else {
      res.json({
        error: false,
        data: service.toJSON()
      });
    }
  }).catch(function (err) {
    return res.status(_httpStatusCodes.default.INTERNAL_SERVER_ERROR).json({
      error: err
    });
  });
}
/**
 * store new service
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */


function store(req, res) {
  _service.default.forge(_objectSpread({}, req.body), {
    hasTimestamps: false
  }).save().then(function (service) {
    return res.json({
      success: true,
      data: service.toJSON()
    });
  }).catch(function (err) {
    return res.status(_httpStatusCodes.default.INTERNAL_SERVER_ERROR).json({
      error: err
    });
  });
}
/**
 * Update service by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */


function update(req, res) {
  _service.default.forge({
    id: req.params.id
  }).fetch({
    require: true
  }).then(function (service) {
    return service.save(_objectSpread({}, req.body)).then(function () {
      return res.json({
        error: false,
        data: service.toJSON()
      });
    }).catch(function (err) {
      return res.status(_httpStatusCodes.default.INTERNAL_SERVER_ERROR).json({
        error: true,
        data: {
          message: err.message
        }
      });
    });
  }).catch(function (err) {
    return res.status(_httpStatusCodes.default.INTERNAL_SERVER_ERROR).json({
      error: err
    });
  });
}
/**
 * Destroy service by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */


function destroy(req, res) {
  _service.default.forge({
    id: req.params.id
  }).fetch({
    require: true
  }).then(function (service) {
    return service.destroy().then(function () {
      return res.json({
        error: false,
        data: {
          message: 'Service deleted successfully.'
        }
      });
    }).catch(function (err) {
      return res.status(_httpStatusCodes.default.INTERNAL_SERVER_ERROR).json({
        error: true,
        data: {
          message: err.message
        }
      });
    });
  }).catch(function (err) {
    return res.status(_httpStatusCodes.default.INTERNAL_SERVER_ERROR).json({
      error: err
    });
  });
}

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(findAll, "findAll", "E:\\scheduler_react\\server\\controllers\\service.controller.js");
  reactHotLoader.register(findById, "findById", "E:\\scheduler_react\\server\\controllers\\service.controller.js");
  reactHotLoader.register(store, "store", "E:\\scheduler_react\\server\\controllers\\service.controller.js");
  reactHotLoader.register(update, "update", "E:\\scheduler_react\\server\\controllers\\service.controller.js");
  reactHotLoader.register(destroy, "destroy", "E:\\scheduler_react\\server\\controllers\\service.controller.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();