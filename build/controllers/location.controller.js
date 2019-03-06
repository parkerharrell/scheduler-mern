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

var _location = _interopRequireDefault(require("../models/location.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Find all the locations
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
function findAll(req, res) {
  _location.default.forge().fetchAll().then(function (location) {
    return res.json({
      error: false,
      data: location.toJSON()
    });
  }).catch(function (err) {
    return res.status(_httpStatusCodes.default.INTERNAL_SERVER_ERROR).json({
      error: err
    });
  });
}
/**
 *  Find location by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */


function findById(req, res) {
  _location.default.forge({
    id: req.params.id
  }).fetch().then(function (location) {
    if (!location) {
      res.status(_httpStatusCodes.default.NOT_FOUND).json({
        error: true,
        data: {}
      });
    } else {
      res.json({
        error: false,
        data: location.toJSON()
      });
    }
  }).catch(function (err) {
    return res.status(_httpStatusCodes.default.INTERNAL_SERVER_ERROR).json({
      error: err
    });
  });
}
/**
 * store new location
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */


function store(req, res) {
  _location.default.forge(_objectSpread({}, req.body), {
    hasTimestamps: false
  }).save().then(function (location) {
    return res.json({
      success: true,
      data: location.toJSON()
    });
  }).catch(function (err) {
    return res.status(_httpStatusCodes.default.INTERNAL_SERVER_ERROR).json({
      error: err
    });
  });
}
/**
 * Update location by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */


function update(req, res) {
  _location.default.forge({
    id: req.params.id
  }).fetch({
    require: true
  }).then(function (location) {
    return location.save(_objectSpread({}, req.body)).then(function () {
      return res.json({
        error: false,
        data: location.toJSON()
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
 * Destroy location by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */


function destroy(req, res) {
  _location.default.forge({
    id: req.params.id
  }).fetch({
    require: true
  }).then(function (location) {
    return location.destroy().then(function () {
      return res.json({
        error: false,
        data: {
          message: 'location deleted successfully.'
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

  reactHotLoader.register(findAll, "findAll", "E:\\Scheduler_node_react\\server\\controllers\\location.controller.js");
  reactHotLoader.register(findById, "findById", "E:\\Scheduler_node_react\\server\\controllers\\location.controller.js");
  reactHotLoader.register(store, "store", "E:\\Scheduler_node_react\\server\\controllers\\location.controller.js");
  reactHotLoader.register(update, "update", "E:\\Scheduler_node_react\\server\\controllers\\location.controller.js");
  reactHotLoader.register(destroy, "destroy", "E:\\Scheduler_node_react\\server\\controllers\\location.controller.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();